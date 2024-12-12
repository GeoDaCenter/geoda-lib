#include <boost/random.hpp>

#include "lisa/UniLocalMoran.h"
#include "lisa/BiLocalMoran.h"
#include "sa/lisa-api.h"
#include "utils/data.h"
#include "weights/geoda-weight.h"
#include "weights/vector-weight.h"

geoda::LisaResult geoda::local_moran(const std::vector<double>& data,
                                     const std::vector<std::vector<unsigned int>>& neighbors,
                                     const std::vector<unsigned int>& undefs, double significance_cutoff,
                                     unsigned int perm, int last_seed) {
  LisaResult result;
  result.is_valid = false;

  size_t num_obs = neighbors.size();
  std::vector<bool> copy_undefs;
  copy_undefs.resize(num_obs, false);
  if (undefs.size() == num_obs) {
    for (size_t i = 0; i < num_obs; ++i) {
      if (undefs[i] == 1) {
        copy_undefs[i] = true;
      }
    }
  }
  int nCPUs = 1;
  std::string perm_method = "LookupTable";
  // create a GeoDaWeight object from neighbors vector
  GeoDaWeight* w = new VectorWeight(neighbors);

  UniLocalMoran* lisa =
      new UniLocalMoran(num_obs, w, data, copy_undefs, significance_cutoff, nCPUs, perm, perm_method, last_seed);

  if (lisa) {
    set_lisa_content(lisa, result);
    delete lisa;
  }

  if (w) {
    delete w;
  }

  return result;
}

geoda::LisaResult geoda::local_bivariate_moran(const std::vector<double>& data1, const std::vector<double>& data2,
                                               const std::vector<std::vector<unsigned int>>& neighbors,
                                               const std::vector<unsigned int>& undefs, double significance_cutoff,
                                               unsigned int perm, int last_seed) {
  LisaResult result;
  result.is_valid = false;

  size_t num_obs = neighbors.size();
  std::vector<bool> copy_undefs;
  copy_undefs.resize(num_obs, false);
  if (undefs.size() == num_obs) {
    for (size_t i = 0; i < num_obs; ++i) {
      if (undefs[i] == 1) {
        copy_undefs[i] = true;
      }
    }
  }
  int nCPUs = 1;
  std::string perm_method = "LookupTable";
  // create a GeoDaWeight object from neighbors vector
  GeoDaWeight* w = new VectorWeight(neighbors);

  BiLocalMoran* lisa =
      new BiLocalMoran(num_obs, w, data1, data2, copy_undefs, significance_cutoff, nCPUs, perm, perm_method, last_seed);

  if (lisa) {
    set_lisa_content(lisa, result);
    delete lisa;
  }

  if (w) {
    delete w;
  }

  return result;
}
