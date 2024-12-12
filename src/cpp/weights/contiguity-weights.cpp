#include <algorithm>
#include <boost/geometry/geometries/box.hpp>
#include <boost/geometry/index/rtree.hpp>
#include <boost/unordered_map.hpp>
#include <iostream>
#include <set>
#include <stack>
#include <vector>

#include "geometry/geometry.h"
#include "weights/gal.h"
#include "weights/partition.h"
#include "weights/weights.h"

#define JC_VORONOI_IMPLEMENTATION
// If you wish to use doubles
// #define JCV_REAL_TYPE double
// #define JCV_ATAN2 atan2
// #define JCV_FLT_MAX 1.7976931348623157E+30
#include "utils/jc_voronoi.h"

struct Point2D {
  double x, y;
  bool operator==(const Point2D& other) const { return x == other.x && y == other.y; }
};

// Custom hash function for Point2D
struct Point2DHash {
  std::size_t operator()(const Point2D& p) const {
    // Combine hashes of x and y using bit operations
    std::size_t h1 = std::hash<double>{}(p.x);
    std::size_t h2 = std::hash<double>{}(p.y);
    return h1 ^ (h2 << 1);
  }
};

std::string jcv_point_str(const jcv_point& pt) {
  std::stringstream ss;
  ss << pt.x << "," << pt.y;
  return ss.str();
}

std::string jcv_edge_str(const jcv_graphedge* edge) {
  std::stringstream ss;
  jcv_real x0 = std::min(edge->pos[0].x, edge->pos[0].x);
  jcv_real x1 = std::max(edge->pos[1].x, edge->pos[1].x);
  jcv_real y0 = std::min(edge->pos[0].y, edge->pos[0].y);
  jcv_real y1 = std::max(edge->pos[1].y, edge->pos[1].y);
  ss << "[" << x0 << "," << y0 << "," << x1 << "," << y1 << "]";
  return ss.str();
}

bool geoda::points_equals(const point_type& p1, const point_type& p2, double precision_threshold) {
  return (fabs(p1.get<0>() - p2.get<0>()) <= precision_threshold) &&
         (fabs(p1.get<1>() - p2.get<1>()) <= precision_threshold);
}

bool geoda::bbox_intersects(const box_type& b1, const box_type& b2) {
  // check if min_corner and max_corner of b1 intersects with min_corner and max_corner of b2
  double x1_min = b1.min_corner().get<0>();
  double x1_max = b1.max_corner().get<0>();
  double y1_min = b1.min_corner().get<1>();
  double y1_max = b1.max_corner().get<1>();

  double x2_min = b2.min_corner().get<0>();
  double x2_max = b2.max_corner().get<0>();
  double y2_min = b2.min_corner().get<1>();
  double y2_max = b2.max_corner().get<1>();

  bool not_intersects = (x1_min > x2_max || x1_max < x2_min || y1_min > y2_max || y1_max < y2_min);
  return !not_intersects;
}

/** Add higher order neighbors up to (and including) distance.
 If cummulative true, then include lower orders as well.  Otherwise,
 only include elements on frontier. */
void make_higher_ord_contiguity(size_t distance, size_t obs, geoda::GalElement* weights, bool cummulative) {
  if (obs < 1 || distance <= 1) return;
  std::vector<std::vector<unsigned int>> X(obs);
  for (size_t i = 0; i < obs; ++i) {
    std::vector<std::set<unsigned int>> n_at_d(distance + 1);
    n_at_d[0].insert(i);
    for (size_t j = 0, sz = weights[i].Size(); j < sz; ++j) {
      n_at_d[1].insert(weights[i][j]);
    }
    for (size_t d = 2; d <= distance; ++d) {
      for (std::set<unsigned int>::const_iterator it = n_at_d[d - 1].begin(); it != n_at_d[d - 1].end(); ++it) {
        for (size_t j = 0, sz = weights[*it].Size(); j < sz; ++j) {
          unsigned int nbr = weights[*it][j];
          if (n_at_d[d - 1].find(nbr) == n_at_d[d - 1].end() && n_at_d[d - 2].find(nbr) == n_at_d[d - 2].end()) {
            n_at_d[d].insert(nbr);
          }
        }
      }
    }
    size_t sz_Xi = 0;
    for (size_t d = (cummulative ? 1 : distance); d <= distance; ++d) {
      sz_Xi += n_at_d[d].size();
    }
    X[i].resize(sz_Xi);
    size_t cnt = 0;
    for (size_t d = (cummulative ? 1 : distance); d <= distance; ++d) {
      for (std::set<unsigned int>::const_iterator it = n_at_d[d].begin(); it != n_at_d[d].end(); ++it) {
        X[i][cnt++] = *it;
      }
    }
    sort(X[i].begin(), X[i].end(), std::greater<unsigned int>());
  }
  for (size_t i = 0; i < obs; ++i) {
    weights[i].SetSizeNbrs(X[i].size());
    for (size_t j = 0, sz = X[i].size(); j < sz; ++j) {
      weights[i].SetNbr(j, X[i][j]);
    }
  }
}

geoda::GalElement* neighbors_to_gal(std::vector<std::set<int>>& nbr_map) {
  if (nbr_map.size() == 0) return 0;
  geoda::GalElement* gal = new geoda::GalElement[nbr_map.size()];
  if (!gal) return 0;
  for (int i = 0, iend = nbr_map.size(); i < iend; i++) {
    gal[i].SetSizeNbrs(nbr_map[i].size());
    int cnt = 0;
    for (std::set<int>::iterator it = nbr_map[i].begin(); it != nbr_map[i].end(); it++) {
      gal[i].SetNbr(cnt++, *it);
    }
  }
  return gal;
}

// New utility function
std::vector<std::vector<unsigned int>> convert_to_weights(const std::vector<std::set<int>>& nbr_map,
                                                          unsigned int order_contiguity = 1,
                                                          bool include_lower_order = false) {
  size_t num_obs = nbr_map.size();

  // Create GAL from neighbor map
  geoda::GalElement* gal = new geoda::GalElement[num_obs];
  for (size_t i = 0; i < num_obs; ++i) {
    gal[i].SetSizeNbrs(nbr_map[i].size());
    size_t cnt = 0;
    for (int nbr : nbr_map[i]) {
      gal[i].SetNbr(cnt++, nbr);
    }
  }

  // Handle higher order contiguity if needed
  if (order_contiguity > 1) {
    make_higher_ord_contiguity(order_contiguity, num_obs, gal, include_lower_order);
  }

  // Convert to result vector
  std::vector<std::vector<unsigned int>> result_vec(num_obs);
  for (size_t i = 0; i < num_obs; ++i) {
    result_vec[i].reserve(gal[i].Size());
    for (size_t j = 0; j < gal[i].Size(); ++j) {
      result_vec[i].push_back(gal[i][j]);
    }
  }

  delete[] gal;
  return result_vec;
}

std::vector<std::vector<unsigned int>> geoda::simple_polygon_queen_weights(const geoda::GeometryCollection& geoms,
                                                                           unsigned int order_contiguity,
                                                                           bool include_lower_order) {
  std::cout << "simple_polygon_queen_weights 1" << std::endl;

  // create a dictionary using the points of the polygon as keys and the polygon indexes as values
  boost::unordered_map<double, boost::unordered_map<double, std::set<int>>> point_to_polygon;
  const std::vector<unsigned int>& sizes = geoms.sizes;
  const std::vector<unsigned int>& parts = geoms.parts;
  int part_index = 0;
  int num_points = geoms.x.size();
  int num_all_parts = parts.size();
  size_t num_polys = geoms.size();

  for (int i = 0; i < num_polys; ++i) {
    int num_parts = sizes[i];
    int inner_parts = 0;
    for (int j = part_index; j < part_index + num_parts; ++j) {
      int start = parts[j];
      int end = j == num_all_parts - 1 ? num_points : parts[j + 1];
      for (int k = start; k < end; ++k) {
        double lat = geoms.y[k], lng = geoms.x[k];
        point_to_polygon[lng][lat].insert(i);
      }
    }
    // offset the index to visit parts[]: an empty polygon (num_parts==0) should offset 1
    int offset_part = num_parts == 0 ? 1 : num_parts;
    part_index += offset_part;
  }

  std::cout << "simple_polygon_queen_weights 2" << std::endl;

  // Create neighbor map
  std::vector<std::set<int>> nbr_map(geoms.size());

  // iterate through the point_to_polygon
  boost::unordered_map<double, boost::unordered_map<double, std::set<int>>>::iterator it;
  for (it = point_to_polygon.begin(); it != point_to_polygon.end(); ++it) {
    boost::unordered_map<double, std::set<int>>& lng_to_polys = it->second;
    boost::unordered_map<double, std::set<int>>::iterator jt;
    for (jt = lng_to_polys.begin(); jt != lng_to_polys.end(); ++jt) {
      const std::set<int>& polys = jt->second;
      // iterator through the polys from begin to end
      for (std::set<int>::iterator kt = polys.begin(); kt != polys.end(); ++kt) {
        // iterator through polys from kt+1 to end
        for (std::set<int>::iterator lt = std::next(kt); lt != polys.end(); ++lt) {
          if (*kt != *lt) {
            nbr_map[*kt].insert(*lt);
            nbr_map[*lt].insert(*kt);
          }
        }
      }
    }
  }

  std::cout << "simple_polygon_queen_weights 3" << std::endl;
  return convert_to_weights(nbr_map, order_contiguity, include_lower_order);
}

std::vector<std::vector<unsigned int>> geoda::simple_polygon_rook_weights(const geoda::GeometryCollection& geoms,
                                                                          unsigned int order_contiguity,
                                                                          bool include_lower_order) {
  // this implementation is for rook contiguity weights when precision_threshold is 0
  // which means the intersection between polygons is tested by two polygons sharing an edge
  // the algorithm should be simple by checking if any edge is shared by two polygons

  std::unordered_map<std::string, std::set<unsigned int>> edge_to_polygon;

  for (size_t i = 0; i < geoms.size(); ++i) {
    for (size_t j = 0; j < geoms.get_num_points(i); ++j) {
      const point_type& pt1 = geoms.get_point(i, j);
      size_t next_j = (j + 1) % geoms.get_num_points(i);
      const point_type& pt2 = geoms.get_point(i, next_j);
      std::stringstream ss;
      ss << pt1.get<0>() << "," << pt1.get<1>() << "," << pt2.get<0>() << "," << pt2.get<1>();
      edge_to_polygon[ss.str()].insert(i);
    }
  }

  // Create neighbor map
  std::vector<std::set<int>> nbr_map(geoms.size());

  // iterate through the edge_to_polygon, intersected polygons are neighbors
  for (const auto& edge_polys : edge_to_polygon) {
    const std::set<unsigned int>& polys = edge_polys.second;
  }

  return convert_to_weights(nbr_map, order_contiguity, include_lower_order);
}

std::vector<std::vector<unsigned int>> geoda::polygon_contiguity_weights(const geoda::GeometryCollection& geoms,
                                                                         bool is_queen, double precision_threshold,
                                                                         unsigned int order_contiguity,
                                                                         bool include_lower_order) {
  if (precision_threshold == 0.0) {
    return is_queen ? simple_polygon_queen_weights(geoms, order_contiguity, include_lower_order)
                    : simple_polygon_rook_weights(geoms, order_contiguity, include_lower_order);
  } else {
    return polygon_contiguity_weights_threshold(geoms, is_queen, precision_threshold, order_contiguity,
                                                include_lower_order);
  }
}

std::vector<std::vector<unsigned int>> geoda::polygon_contiguity_weights_threshold(
    const geoda::GeometryCollection& geoms, bool is_queen, double precision_threshold, unsigned int order_contiguity,
    bool include_lower_order) {
  // # of records of geometry
  unsigned int gRecords = geoms.size();

  // bounding box for the entire map
  // partition constructed on lower(x) and upper(x) for each polygon
  geoda::BasePartition gMinX, gMaxX;

  // partition constructed on y for each polygon
  geoda::PartitionM* gYPartition;

  // get bounding box of geoms
  double shp_min_x, shp_max_x, shp_min_y, shp_max_y;
  // get min and max value from geoms.x and geoms.y
  shp_min_x = *std::min_element(geoms.x.begin(), geoms.x.end());
  shp_max_x = *std::max_element(geoms.x.begin(), geoms.x.end());
  shp_min_y = *std::min_element(geoms.y.begin(), geoms.y.end());
  shp_max_y = *std::max_element(geoms.y.begin(), geoms.y.end());

  double shp_x_len = shp_max_x - shp_min_x;
  double shp_y_len = shp_max_y - shp_min_y;

  unsigned int gx, gy, cnt, total = 0;
  // default number of partitions is divided by 8 and add 2
  gx = gRecords / 8 + 2;

  gMinX.alloc(gRecords, gx, shp_x_len);
  gMaxX.alloc(gRecords, gx, shp_x_len);

  for (cnt = 0; cnt < gRecords; ++cnt) {
    box_type box;
    geoms.get_bbox(cnt, box);

    gMinX.include(cnt, box.min_corner().get<0>() - shp_min_x);
    gMaxX.include(cnt, box.max_corner().get<0>() - shp_min_x);
  }

  gy = static_cast<int>(sqrt(gRecords) + 2);

  do {
    gYPartition = new geoda::PartitionM(gRecords, gy, shp_y_len);
    for (cnt = 0; cnt < gRecords; ++cnt) {
      box_type box;
      geoms.get_bbox(cnt, box);
      double lwr = box.min_corner().get<1>() - shp_min_y;
      double upr = box.max_corner().get<1>() - shp_min_y;
      gYPartition->initIx(cnt, lwr, upr);
    }
    total = gYPartition->Sum();
    if (total > gRecords * 8) {
      delete gYPartition;
      gy = gy / 2 + 1;
      total = 0;
    }
  } while (total == 0);

  int curr;
  std::vector<std::set<int>> nbr_map(gRecords);
  std::stack<unsigned int> neighbors, related;

  for (int step = 0; step < gMinX.Cells(); ++step) {
    // include all elements from xmin[step]
    for (curr = gMinX.first(step); curr != geoda::EMPTY_COUNT; curr = gMinX.tail(curr)) {
      gYPartition->include(curr);
    }
    // test each element in xmax[step]
    for (curr = gMaxX.first(step); curr != geoda::EMPTY_COUNT; curr = gMaxX.tail(curr)) {
      geoda::PolygonPartition testPoly(geoms, curr);
      testPoly.MakePartition();

      // form a list of neighbors: TODO, find the potential nearest neighbors
      for (int cell = gYPartition->lowest(curr); cell <= gYPartition->upmost(curr); ++cell) {
        unsigned int potential = gYPartition->first(cell);
        while (potential != geoda::EMPTY_COUNT) {
          if (potential != curr) {
            neighbors.push(potential);
          }
          potential = gYPartition->tail(potential, cell);
        }
      }

      // test each potential neighbor
      while (!neighbors.empty()) {
        unsigned int nbr = neighbors.top();
        neighbors.pop();
        // check if the bbox of geoms[curr] and geoms[nbr] are intersect
        box_type curr_bbox, nbr_bbox;
        geoms.get_bbox(curr, curr_bbox);
        geoms.get_bbox(nbr, nbr_bbox);
        if (geoda::bbox_intersects(curr_bbox, nbr_bbox)) {
          geoda::PolygonPartition nbrPoly(geoms, nbr);
          // if (curr == 0 && nbr == 0) {}
          // run sweep with testPoly as a host and nbrPoly as a guest
          if (testPoly.sweep(nbrPoly, is_queen, precision_threshold)) {
            related.push(nbr);
          }
        }
      }

      while (!related.empty()) {
        unsigned int nbr = related.top();
        nbr_map[curr].insert(nbr);
        nbr_map[nbr].insert(curr);
        related.pop();
      }

      // remove from the partition
      gYPartition->remove(curr);
    }
  }  // end MakeContiguity(main, is_queen, precision_threshold);

  if (gYPartition) delete gYPartition;
  gYPartition = NULL;

  return convert_to_weights(nbr_map, order_contiguity, include_lower_order);
}

std::vector<std::vector<unsigned int>> geoda::point_contiguity_weights(const geoda::GeometryCollection& geoms,
                                                                       bool is_queen, double precision_threshold,
                                                                       unsigned int order_contiguity,
                                                                       bool include_lower_order) {
  // use centroids to calculate contiguity weights
  size_t num_obs = geoms.size();
  std::vector<double> x(num_obs);
  std::vector<double> y(num_obs);
  for (size_t i = 0; i < num_obs; ++i) {
    point_type pt = geoms.get_centroid(i);
    x[i] = bg::get<0>(pt);
    y[i] = bg::get<1>(pt);
  }

  std::vector<std::set<int>> nbr_map;

  double x_orig_min = std::numeric_limits<double>::max();
  double y_orig_min = std::numeric_limits<double>::max();
  double x_orig_max = -std::numeric_limits<double>::max();
  double y_orig_max = -std::numeric_limits<double>::max();

  for (size_t i = 0; i < num_obs; ++i) {
    if (x[i] < x_orig_min) x_orig_min = x[i];
    if (x[i] > x_orig_max) x_orig_max = x[i];
    if (y[i] < y_orig_min) y_orig_min = y[i];
    if (y[i] > y_orig_max) y_orig_max = y[i];
  }

  double x_range = x_orig_max - x_orig_min;
  double y_range = y_orig_max - y_orig_min;

  // Add 2% offset to the bounding rectangle
  const double bb_pad = 0.02;
  // note data has been translated to origin and scaled
  double bb_xmin = x_orig_min - x_range * bb_pad;
  double bb_xmax = x_orig_max + x_range * bb_pad;
  double bb_ymin = y_orig_min - y_range * bb_pad;
  double bb_ymax = y_orig_max + y_range * bb_pad;

  // seed sites
  jcv_point* points = new jcv_point[num_obs];
  for (size_t i = 0; i < num_obs; ++i) {
    points[i].x = static_cast<float>(x[i]);
    points[i].y = static_cast<float>(y[i]);
  }

  nbr_map.clear();
  nbr_map.resize(num_obs);

  jcv_diagram diagram;
  memset(&diagram, 0, sizeof(jcv_diagram));

  jcv_rect bounding_box;
  bounding_box.min.x = bb_xmin;
  bounding_box.min.y = bb_ymin;
  bounding_box.max.x = bb_xmax;
  bounding_box.max.y = bb_ymax;

  // create a voronoi graph
  jcv_diagram_generate(num_obs, (const jcv_point*)points, &bounding_box, &diagram);

  std::map<std::string, std::set<int>> edge_to_site;
  std::map<std::string, std::set<int>> jcvpoint_to_site;

  // edges
  const jcv_site* sites = jcv_diagram_get_sites(&diagram);

  for (size_t i = 0; i < diagram.numsites; i++) {
    const jcv_site* site = &sites[i];
    const jcv_graphedge* e = sites[i].edges;

    while (e) {
      // shared edges will be visited by neighbor sites
      if (is_queen) {
        jcvpoint_to_site[jcv_point_str(e->pos[0])].insert(site->index);
        jcvpoint_to_site[jcv_point_str(e->pos[1])].insert(site->index);
      } else {
        edge_to_site[jcv_edge_str(e)].insert(site->index);
      }

      e = e->next;
    }
  }

  std::map<std::string, std::set<int>>::iterator it;
  if (is_queen) {
    for (it = jcvpoint_to_site.begin(); it != jcvpoint_to_site.end(); ++it) {
      // it->second are neighbors
      std::set<int>& nbrs = it->second;
      // the ids in nbrs are neighbors of each other
      std::set<int>::iterator nbr1_it;
      for (nbr1_it = nbrs.begin(); nbr1_it != nbrs.end(); ++nbr1_it) {
        int ii = *nbr1_it;
        std::set<int>::iterator nbr2_it;
        for (nbr2_it = nbrs.begin(); nbr2_it != nbrs.end(); ++nbr2_it) {
          int jj = *nbr2_it;
          if (ii != jj) {
            nbr_map[ii].insert(jj);
          }
        }
      }
    }
  } else {
    for (it = edge_to_site.begin(); it != edge_to_site.end(); ++it) {
      // it->second are neighbors
      std::set<int>& nbrs = it->second;
      std::set<int>::iterator nbr1_it;
      for (nbr1_it = nbrs.begin(); nbr1_it != nbrs.end(); ++nbr1_it) {
        int ii = *nbr1_it;
        std::set<int>::iterator nbr2_it;
        for (nbr2_it = nbrs.begin(); nbr2_it != nbrs.end(); ++nbr2_it) {
          int jj = *nbr2_it;
          if (ii != jj) {
            nbr_map[ii].insert(jj);
          }
        }
      }
    }
  }
  delete[] points;
  jcv_diagram_free(&diagram);

  std::vector<std::vector<unsigned int>> result_vec(num_obs);

  if (order_contiguity > 1) {
    geoda::GalElement* gal = neighbors_to_gal(nbr_map);
    make_higher_ord_contiguity(order_contiguity, num_obs, gal, include_lower_order);
    // convert GalElement to std::vector<std::vector<unsigned int>>
    for (size_t i = 0; i < num_obs; ++i) {
      for (size_t j = 0; j < gal[i].Size(); ++j) {
        result_vec[i].push_back(gal[i][j]);
      }
    }
    delete gal;
  } else {
    // convert nbr_map to std::vector<std::vector<unsigned int>>
    for (size_t i = 0; i < num_obs; ++i) {
      for (std::set<int>::iterator it = nbr_map[i].begin(); it != nbr_map[i].end(); ++it) {
        result_vec[i].push_back(*it);
      }
    }
  }
  return result_vec;
}
