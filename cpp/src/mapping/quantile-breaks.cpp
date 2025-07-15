// SPDX-License-Identifier: MIT
// Copyright contributors to the geodalib project

#include <algorithm>

#include "mapping/mapping.h"

/** Use with std::sort for sorting in ascending order */
bool geoda::dbl_int_pair_cmp_less(const dbl_int_pair_type& ind1, const dbl_int_pair_type& ind2) {
  return ind1.first < ind2.first;
}

// Same assumptions as above
double geoda::percentile(double x, const dbl_int_pair_vec_type& v) {
  int N = v.size();
  double Nd = static_cast<double>(N);
  double p_0 = (100.0 / Nd) * (1.0 - 0.5);
  double p_Nm1 = (100.0 / Nd) * (Nd - 0.5);

  if (x <= p_0) return v[0].first;

  if (x >= p_Nm1) return v[N - 1].first;

  for (int i = 1; i < N; i++) {
    double p_i = (100.0 / Nd) * ((i + 1.0) - 0.5);
    if (x == p_i) return v[i].first;
    if (x < p_i) {
      double p_im1 = (100.0 / Nd) * (i - 0.5);
      return v[i - 1].first + Nd * ((x - p_im1) / 100.0) * (v[i].first - v[i - 1].first);
    }
  }
  return v[N - 1].first;  // execution should never get here
}

// implmentation of quantile breaks
std::vector<double> geoda::quantile_breaks(int num_cats, const std::vector<double>& data,
                                          const std::vector<unsigned int>& _undef) {
  int num_obs = data.size();
  std::vector<bool> undef(num_obs, 0);

  if (_undef.size() > 0) {
    for (int i = 0; i < _undef.size(); ++i) {
      undef[i] = _undef[i] == 1;
    }
  }

  std::vector<std::pair<double, int> > var;
  for (int i = 0; i < num_obs; ++i) {
    var.push_back(std::make_pair(data[i], i));
  }
  std::sort(var.begin(), var.end(), geoda::dbl_int_pair_cmp_less);

  std::vector<double> breaks(num_cats - 1);
  for (int i = 0, iend = breaks.size(); i < iend; i++) {
    breaks[i] = geoda::percentile(((i + 1.0) * 100.0) / static_cast<double>(num_cats), var);
  }
  return breaks;
}
