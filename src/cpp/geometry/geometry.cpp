#include <sstream>
#include <vector>
#include <algorithm>

#include <boost/geometry/algorithms/buffer.hpp>
#include <boost/geometry/io/wkt/write.hpp>

#include "utils/UTM.h"
#include "geometry/geometry.h"

using namespace geoda;

void Polygon::add(const std::vector<double>& in_x, const std::vector<double>& in_y, bool is_hole) {
  if (in_x.size() == in_y.size()) {
    parts.push_back(parts.empty() ? 0 : x.size());
    std::copy(in_x.begin(), in_x.end(), std::back_inserter(x));
    std::copy(in_y.begin(), in_y.end(), std::back_inserter(y));
    holes.push_back(is_hole);
  }
}

void Line::add(const std::vector<double>& in_x, const std::vector<double>& in_y) {
  if (in_x.size() == in_y.size()) {
    parts.push_back(parts.empty() ? 0 : x.size());
    std::copy(in_x.begin(), in_x.end(), std::back_inserter(x));
    std::copy(in_y.begin(), in_y.end(), std::back_inserter(y));
  }
}

void Point::add(double in_x, double in_y) {
  x.push_back(in_x);
  y.push_back(in_y);
}

GeometryCollection::GeometryCollection(const std::vector<double>& in_x, const std::vector<double>& in_y,
                                       const std::vector<unsigned int>& parts, const std::vector<unsigned int>& sizes,
                                       bool convert_to_UTM)
    : x(in_x), y(in_y), parts(parts), sizes(sizes), convert_to_UTM(convert_to_UTM) {}

void GeometryCollection::ConvertToUTM(int index, double lat, double lng, double& north, double& east) {
  if (utm_zones[index].empty()) {
    char zone[4] = {'\0'};
    UTM::LLtoUTM(lat, lng, north, east, zone);
    utm_zones[index] = zone;
  } else {
    char* zone = const_cast<char*>(utm_zones[index].c_str());
    UTM::LLtoUTM(lat, lng, north, east, zone);
  }
}

PolygonCollection::PolygonCollection(const std::vector<double>& in_x, const std::vector<double>& in_y,
                                     const std::vector<unsigned int>& parts, const std::vector<unsigned int>& holes,
                                     const std::vector<unsigned int>& sizes, bool fix_polygon, bool convert_to_UTM)
    : GeometryCollection(in_x, in_y, parts, sizes, convert_to_UTM), holes(holes) {
  int num_points = x.size();
  int num_polys = sizes.size();
  int num_all_parts = parts.size();
  int part_index = 0;

  double north, east;
  utm_zones.resize(num_polys);

  for (int i = 0; i < num_polys; ++i) {
    multipolygon_type boost_mp;
    int num_parts = sizes[i];
    int inner_parts = 0;
    for (int j = part_index; j < part_index + num_parts; ++j) {
      int start = parts[j];
      int end = j == num_all_parts - 1 ? num_points : parts[j + 1];
      bool is_hole = holes[j];
      if (!is_hole) {
        polygon_type boost_p;
        for (int k = start; k < end; ++k) {
          double lat = y[k], lng = x[k];
          if (convert_to_UTM) {
            ConvertToUTM(i, lat, lng, north, east);
            lat = north;
            lng = east;
          }
          bg::append(boost_p.outer(), point_type(lng, lat));
        }
        boost_mp.push_back(boost_p);
        inner_parts = 0;
      } else {
        inner_parts += 1;
        polygon_type& tmp_poly = boost_mp.back();
        tmp_poly.inners().resize(inner_parts);
        for (int k = start; k < end; ++k) {
          double lat = y[k], lng = x[k];
          if (convert_to_UTM) {
            ConvertToUTM(i, lat, lng, north, east);
            lat = north;
            lng = east;
          }
          bg::append(tmp_poly.inners().back(), point_type(lng, lat));
        }
      }
    }
    // offset the index to visit parts[]: an empty polygon (num_parts==0) should offset 1
    int offset_part = num_parts == 0 ? 1 : num_parts;
    part_index += offset_part;
    if (fix_polygon) {
      bg::correct(boost_mp);
    }
    polygons.push_back(boost_mp);
  }
}

void PolygonCollection::get_polygon(size_t polygon_index, Polygon& poly) {
  int num_parts = sizes[polygon_index];

  // get offset_part for the i-th polygon
  int part_index = 0;
  for (int i = 0; i < polygon_index; ++i) {
    int offset_part = num_parts == 0 ? 1 : sizes[i];
    part_index += offset_part;
  }

  double north, east;

  for (int j = part_index; j < part_index + num_parts; ++j) {
    int start = parts[j];
    int end = j == parts.size() - 1 ? x.size() : parts[j + 1];
    for (int k = start; k < end; ++k) {
      double lat = y[k], lng = x[k];
      if (convert_to_UTM) {
        ConvertToUTM(polygon_index, lat, lng, north, east);
        lat = north;
        lng = east;
      }
      poly.x.push_back(lng);
      poly.y.push_back(lat);
    }
    poly.parts.push_back(poly.parts.empty() ? 0 : poly.x.size());
    poly.holes.push_back(holes[j]);
  }
}

int PolygonCollection::get_part(size_t polygon_index, size_t part_index) const {
  int part_offset = 0;
  for (int i = 0; i < polygon_index; ++i) {
    // an empty polygon (num_parts==0) should offset 1
    int number_parts = sizes[i] == 0 ? 1 : sizes[i];
    part_offset += number_parts;
  }
  return parts[part_offset + part_index] - parts[part_offset];
}

// size_t PolygonCollection::get_point_pos(size_t polygon_index, size_t point_index) const {
//   int num_parts = sizes[polygon_index];
//   int part_offset = 0;
//   for (int i = 0; i < polygon_index; ++i) {
//     // an empty polygon (num_parts==0) should offset 1
//     int offset_part = sizes[i] == 0 ? 1 : sizes[i];
//     part_offset += offset_part;
//   }
//   int start = parts[part_offset];
//   int k = point_index + start;
//   return k;
// }

point_type PolygonCollection::get_point(size_t polygon_index, size_t point_index) const {
  point_type pt;
  int num_parts = sizes[polygon_index];
  int part_offset = 0;
  for (int i = 0; i < polygon_index; ++i) {
    // an empty polygon (num_parts==0) should offset 1
    int offset_part = sizes[i] == 0 ? 1 : sizes[i];
    part_offset += offset_part;
  }
  int start = parts[part_offset];
  int k = point_index + start;
  double lat = y[k], lng = x[k];
  pt.set<0>(lng);
  pt.set<1>(lat);
  return pt;
}

size_t PolygonCollection::get_num_parts(size_t polygon_index) const { return sizes[polygon_index]; }

size_t PolygonCollection::get_num_points(size_t polygon_index) const {
  int num_parts = sizes[polygon_index];
  int part_offset = 0;
  for (int i = 0; i < polygon_index; ++i) {
    // an empty polygon (num_parts==0) should offset 1
    int offset_part = sizes[i] == 0 ? 1 : sizes[i];
    part_offset += offset_part;
  }
  int start = parts[part_offset];
  int end = part_offset + num_parts >= parts.size() ? x.size() : parts[part_offset + num_parts];
  return end - start;
}

std::vector<std::vector<double>> PolygonCollection::get_centroids() const {
  std::vector<std::vector<double>> centroids(polygons.size());
  for (size_t i = 0; i < polygons.size(); ++i) {
    point_type pt;
    if (polygons[i].size() > 0) {
      bg::centroid(polygons[i], pt);
    }
    centroids[i].push_back(bg::get<0>(pt));
    centroids[i].push_back(bg::get<1>(pt));
  }
  return centroids;
}

LineCollection::LineCollection(const std::vector<double>& in_x, const std::vector<double>& in_y,
                               const std::vector<unsigned int>& parts, const std::vector<unsigned int>& sizes,
                               bool convert_to_UTM)
    : GeometryCollection(in_x, in_y, parts, sizes, convert_to_UTM) {
  int num_points = x.size();
  int num_lines = sizes.size();
  int num_all_parts = parts.size();
  int part_index = 0;

  double north, east;
  utm_zones.resize(num_lines);

  for (int i = 0; i < num_lines; ++i) {
    // extract and create multiline_type
    multiline_type boost_line;
    int num_parts = sizes[i];
    for (int j = part_index; j < part_index + num_parts; ++j) {
      int start = parts[j];
      int end = j == num_all_parts - 1 ? num_points : parts[j + 1];
      line_type boost_l;
      for (int k = start; k < end; ++k) {
        double lat = y[k], lng = x[k];
        if (convert_to_UTM) {
          ConvertToUTM(i, lat, lng, north, east);
          lat = north;
          lng = east;
        }
        bg::append(boost_l, point_type(lng, lat));
      }
      boost_line.push_back(boost_l);
    }
    // offset the index to visit parts[]: an empty polygon (num_parts==0) should offset 1
    int offset_part = num_parts == 0 ? 1 : num_parts;
    part_index += offset_part;
    lines.push_back(boost_line);
  }
}

std::vector<std::vector<double>> LineCollection::get_centroids() const {
  std::vector<std::vector<double>> centroids(lines.size());
  for (size_t i = 0; i < lines.size(); ++i) {
    point_type pt;
    bg::centroid(lines[i], pt);
    centroids[i].push_back(bg::get<0>(pt));
    centroids[i].push_back(bg::get<1>(pt));
  }
  return centroids;
}

PointCollection::PointCollection(const std::vector<double>& in_x, const std::vector<double>& in_y,
                                 const std::vector<unsigned int>& parts, const std::vector<unsigned int>& sizes,
                                 bool convert_to_UTM)
    : GeometryCollection(in_x, in_y, parts, sizes, convert_to_UTM) {
  int num_points = x.size();
  int num_parts = parts.size();

  double north, east;
  utm_zones.resize(num_parts);

  for (int i = 0; i < num_parts; ++i) {
    // extract and create multipoint_type
    multipoint_type boost_point;
    int start = parts[i];
    int end = i == num_parts - 1 ? num_points : parts[i + 1];
    for (int k = start; k < end; ++k) {
      double lat = y[k], lng = x[k];
      if (convert_to_UTM) {
        ConvertToUTM(i, lat, lng, north, east);
        lat = north;
        lng = east;
      }
      point_type boost_p(lng, lat);
      boost_point.push_back(boost_p);
    }
    points.push_back(boost_point);
  }
}

std::vector<std::vector<double>> PointCollection::get_centroids() const {
  std::vector<std::vector<double>> centroids(points.size());
  for (size_t i = 0; i < points.size(); ++i) {
    point_type pt;
    bg::centroid(points[i], pt);
    centroids[i].push_back(bg::get<0>(pt));
    centroids[i].push_back(bg::get<1>(pt));
  }
  return centroids;
}
