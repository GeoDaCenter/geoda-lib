#include <gmock/gmock.h>
#include <gtest/gtest.h>

#include "weights/weights.h"
#include "test/data.h"

using namespace testing;

TEST(WEIGHTS, POLYGON_CONTIGUITY_WEIGHTS) {
    bool is_queen = true;
    double precision_threshold = 0.0;
    std::vector<std::vector<unsigned int>> nbrs =
        geoda::polygon_contiguity_weights(TEST_POLYGON_COLLECTION, is_queen, precision_threshold);
    EXPECT_EQ(nbrs.size(), 2);

    EXPECT_THAT(nbrs[0], ElementsAre(1));
    EXPECT_THAT(nbrs[1], ElementsAre(0));
}

TEST(WEIGHTS, POINT_CONTIGUITY_WEIGHTS) {
    bool is_queen = true;
    double precision_threshold = 0.0;
    std::vector<std::vector<unsigned int>> nbrs =
        geoda::point_contiguity_weights(TEST_POINT_COLLECTION, is_queen, precision_threshold);

    EXPECT_EQ(nbrs.size(), 3);
    EXPECT_THAT(nbrs[0], ElementsAre(1));
    EXPECT_THAT(nbrs[1], ElementsAre(0, 2));
    EXPECT_THAT(nbrs[2], ElementsAre(1));
}