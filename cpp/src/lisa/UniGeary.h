// SPDX-License-Identifier: MIT
// Copyright contributors to the geodalib project

//
// Created by Xun Li on 9/27/19.
//

#ifndef GEODA_UNIGEARY_H
#define GEODA_UNIGEARY_H

#include <vector>
#include <string>

#include "LISA.h"

class UniGeary : public LISA {
  const unsigned int CLUSTER_NOT_SIG;
  const unsigned int CLUSTER_HIGHHIGH;
  const unsigned int CLUSTER_LOWLOW;
  const unsigned int CLUSTER_OTHERPOS;
  const unsigned int CLUSTER_NEGATIVE;
  const unsigned int CLUSTER_UNDEFINED;
  const unsigned int CLUSTER_NEIGHBORLESS;

 public:
  UniGeary(int num_obs, GeoDaWeight* w, const std::vector<double>& data, const std::vector<bool>& undefs,
           double significance_cutoff, int nCPUs, int permutations, const std::string& _permutation_method,
           uint64_t last_seed_used);

  virtual ~UniGeary();

  virtual void ComputeLoalSA();

  virtual void PermLocalSA(int cnt, int perm, const std::vector<int>& permNeighbors, std::vector<double>& permutedSA);

  virtual void PermLocalSA(int cnt, int perm, int numNeighbors, const int* permNeighbors,
                           std::vector<double>& permutedSA);

  virtual uint64_t CountLargerSA(int cnt, const std::vector<double>& permutedSA);

  virtual std::vector<int> GetClusterIndicators();

 protected:
  std::vector<double> data;
  std::vector<double> data_square;
};

#endif  // GEODA_UNIGEARY_H
