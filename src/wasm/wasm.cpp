
#ifdef __EMCC__
#include <emscripten/bind.h>

#include <iostream>

#include "geometry/geometry.h"
#include "sa/lisa.h"
#include "weights/weights.h"
#include "mapping/mapping.h"
#include "regression/diagnostic-report.h"
#include "regression/regression.h"

template <typename T>
emscripten::class_<std::vector<T>> register_vector_with_smart_ptrs(const char* name) {
  typedef std::vector<T> VecType;
  void (VecType::*push_back)(const T&) = &VecType::push_back;
  void (VecType::*resize)(const size_t, const T&) = &VecType::resize;
  return emscripten::class_<VecType>(name)
      .template constructor<>()
      .template smart_ptr<std::shared_ptr<VecType>>(name)
      .function("push_back", push_back)
      .function("resize", resize)
      .function("size", &VecType::size)
      .function("get", &emscripten::internal::VectorAccess<VecType>::get)
      .function("set", &emscripten::internal::VectorAccess<VecType>::set);
}

EMSCRIPTEN_BINDINGS(wasmgeoda) {
  emscripten::register_vector<unsigned int>("VectorUInt");
  emscripten::register_vector<std::vector<unsigned int>>("VecVecUInt");
  emscripten::register_vector<int>("VectorInt");
  emscripten::register_vector<std::vector<int>>("VecVecInt");
  emscripten::register_vector<double>("VectorDouble");
  emscripten::register_vector<std::vector<double>>("VecVecDouble");
  emscripten::register_vector<std::string>("VectorString");

  emscripten::class_<geoda::GeometryCollection>("GeometryCollection");
  emscripten::class_<geoda::PolygonCollection, emscripten::base<geoda::GeometryCollection>>("PolygonCollection")
      .constructor<std::vector<double>, std::vector<double>, std::vector<unsigned int>, std::vector<unsigned int>,
                   std::vector<unsigned int>, bool, bool>()
      .function("getCentroids", &geoda::PolygonCollection::get_centroids);
  emscripten::class_<geoda::LineCollection, emscripten::base<geoda::GeometryCollection>>("LineCollection")
      .constructor<std::vector<double>, std::vector<double>, std::vector<unsigned int>, std::vector<unsigned int>,
                   bool>()
      .function("getCentroids", &geoda::LineCollection::get_centroids);
  emscripten::class_<geoda::PointCollection, emscripten::base<geoda::GeometryCollection>>("PointCollection")
      .constructor<std::vector<double>, std::vector<double>, std::vector<unsigned int>, std::vector<unsigned int>,
                   bool>()
      .function("getCentroids", &geoda::PointCollection::get_centroids);

  emscripten::class_<geoda::Point>("Point")
      .constructor()
      .function("getX", &geoda::Polygon::get_x)
      .function("getY", &geoda::Polygon::get_y);

  emscripten::class_<geoda::Polygon>("Polygon")
      .constructor()
      .function("getX", &geoda::Polygon::get_x)
      .function("getY", &geoda::Polygon::get_y)
      .function("getHoles", &geoda::Polygon::get_holes)
      .function("getParts", &geoda::Polygon::get_parts)
      .function("addPart", &geoda::Polygon::add);

  emscripten::register_vector<geoda::Polygon>("VectorPolygon");

  emscripten::class_<geoda::LisaResult>("LisaResult")
      .function("isValid", &geoda::LisaResult::get_is_valid)
      .function("getPValues", &geoda::LisaResult::get_pvalues)
      .function("getClusters", &geoda::LisaResult::get_clusters)
      .function("getLagValues", &geoda::LisaResult::get_lags)
      .function("getLisaValues", &geoda::LisaResult::get_lisas);

  emscripten::function("getNearestNeighbors", &geoda::knearest_neighbors);
  emscripten::function("getDistanceWeights", &geoda::distance_weights);
  emscripten::function("getDistanceThresholds", &geoda::get_distance_thresholds);
  emscripten::function("getPolygonContiguityWeights", &geoda::polygon_contiguity_weights);
  emscripten::function("getPointContiguityWeights", &geoda::point_contiguity_weights);

  emscripten::function("localMoran", &geoda::local_moran);

  emscripten::function("quantileBreaks", &geoda::quantile_breaks);
  emscripten::function("naturalBreaks", &geoda::natural_breaks);
  emscripten::function("equalIntervalBreaks", &geoda::equal_interval_breaks);
  emscripten::function("percentileBreaks", &geoda::percentile_breaks);
  emscripten::function("boxBreaks", &geoda::box_breaks);

  emscripten::class_<DiagnosticReport>("DiagnosticReport")
      .function("GetNoObservation", &DiagnosticReport::GetNoObservation)
      .function("GetNoVariable", &DiagnosticReport::GetNoVariable)
      .function("IncludeConstant", &DiagnosticReport::IncludeConstant)
      .function("GetXVarName", &DiagnosticReport::GetXVarName)
      .function("GetCoefficient", &DiagnosticReport::GetCoefficient)
      .function("GetStdError", &DiagnosticReport::GetStdError)
      .function("GetZValue", &DiagnosticReport::GetZValue)
      .function("GetProbability", &DiagnosticReport::GetProbability)
      .function("GetR2", &DiagnosticReport::GetR2)
      .function("GetR2_adjust", &DiagnosticReport::GetR2_adjust)
      .function("GetR2_buse", &DiagnosticReport::GetR2_buse)
      .function("GetLIK", &DiagnosticReport::GetLIK)
      .function("GetAIC", &DiagnosticReport::GetAIC)
      .function("GetOLS_SC", &DiagnosticReport::GetOLS_SC)
      .function("GetRSS", &DiagnosticReport::GetRSS)
      .function("GetFtest", &DiagnosticReport::GetFtest)
      .function("GetFtestProb", &DiagnosticReport::GetFtestProb)
      .function("GetSIQ_SQ", &DiagnosticReport::GetSIQ_SQ)
      .function("GetSIQ_SQLM", &DiagnosticReport::GetSIQ_SQLM)
      .function("GetConditionNumber", &DiagnosticReport::GetConditionNumber)
      .function("GetJBtest", &DiagnosticReport::GetJBtestValue)
      .function("GetBPtest", &DiagnosticReport::GetBPtestValue)
      .function("GetSpatialBPtest", &DiagnosticReport::GetSpatialBPtestValue)
      .function("GetKBtest", &DiagnosticReport::GetKBtestValue)
      .function("GetMoranI", &DiagnosticReport::GetMoranIValue)
      .function("GetLMLAG", &DiagnosticReport::GetLMLAGValue)
      .function("GetLMLAGRob", &DiagnosticReport::GetLMLAGRobValue)
      .function("GetLMERR", &DiagnosticReport::GetLMERRValue)
      .function("GetLMERRRob", &DiagnosticReport::GetLMERRRobValue)
      .function("GetLMSarma", &DiagnosticReport::GetLMSarmaValue)
      .function("GetKelRobin", &DiagnosticReport::GetKelRobinValue)
      .function("GetMeanY", &DiagnosticReport::GetMeanY)
      .function("GetSDevY", &DiagnosticReport::GetSDevY);

  emscripten::function("dotProduct", &geoda::dot_product);
  emscripten::function("linearRegression", &geoda::linear_regression);
}
#endif
