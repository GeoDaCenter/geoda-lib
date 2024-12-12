#include <iostream>

#include "lisa/UniJoinCount.h"
#include "mapping/mapping.h"
#include "sa/lisa-api.h"
#include "weights/vector-weight.h"

geoda::LisaResult geoda::quantile_lisa(int k, int quantile, const std::vector<double>& data,
                                       const std::vector<std::vector<unsigned int>>& neighbors,
                                       const std::vector<unsigned int>& undefs, double significance_cutoff,
                                       unsigned int perm, int last_seed) {
  LisaResult result;
  result.is_valid = false;

  size_t num_obs = neighbors.size();

  if (k < 1 || k >= num_obs || quantile > k || quantile < 0) {
    return result;
  }

  std::vector<double> breaks = geoda::quantile_breaks(k, data, undefs);

  // get left and right bounds for quantile-th interval
  double left = quantile <= 1 ? -std::numeric_limits<double>::max() : breaks[quantile - 2];
  double right = quantile >= k ? std::numeric_limits<double>::max() : breaks[quantile - 1];

  // get binary data, 1 for data in the interval, 0 otherwise
  std::vector<double> binary_data(num_obs, 0.0);
  for (size_t i = 0; i < num_obs; ++i) {
    if (data[i] >= left && data[i] < right) {
      binary_data[i] = 1.0;
    }
  }

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
  // note: crash when using LookupTable for localG
  std::string perm_method = "LookupTable";
  // create a GeoDaWeight object from neighbors vector
  GeoDaWeight* w = new VectorWeight(neighbors);

  UniJoinCount* lisa =
      new UniJoinCount(num_obs, w, binary_data, copy_undefs, significance_cutoff, nCPUs, perm, perm_method, last_seed);
  if (lisa) {
    set_lisa_content(lisa, result);
    delete lisa;
  }

  if (w) {
    delete w;
  }

  return result;
}
