---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "GeoDaLib"
  text: "A modern Javascript library for spatial data analysis for the AI era"
  tagline: '' 
  actions:
    - theme: brand
      text: Get Started
      link: /get-started
    - theme: alt
      text: 🚀 Why use GeoDaLib 
      link: /architecture
    - theme: alt
      text: API Overview
      link: /api-overview

features:
  - title: Mapping
    details: box map, natural breaks, percentile, quantile, standard-deviation, rates map, spatial rates map, cartogram
    link: /reference/mapping
  - title: Data Exploration
    details: MAD, PCA, t-SNE,Diff-in-Diff, spatial lag
    link: /reference/data-exploration
  - title: Spatial Weights
    details: contiguity weights (queen/rook), distance-based weights, kernel weights
    link: /reference/spatial-weights
  - title: Spatial Autocorrelation Analysis
    details: local Moran, local G/G*, local Geary, local Join Count, quantile lisa
    link: /reference/spatial-autocorrelation-analysis
  - title: Spatial Clustering 
    details: k Means/Medoids/Medians, hierarchical clustering, DBScan, HDBScan, spectral clustering,  
    link: /reference/spatial-clustering
  - title: Spatial Regression
    details: OLS with spatial diagnostics, spatial lag, spatial error
    link: /reference/spatial-regression
  - title: Spatial Operations
    details: buffer, centroid, spatial join, spatial dissolve
    link: /reference/spatial-operations

---

