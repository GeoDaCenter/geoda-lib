import {getBinaryGeometryTemplate} from '@loaders.gl/arrow';
import {BinaryFeatureCollection} from '@loaders.gl/schema';
import test from 'tape';

import {
  createPointCollectionFromBinaryFeatures,
  createLineCollectionFromBinaryFeatures,
  createPolygonCollectionFromBinaryFeatures
} from '../../src/geometry/binary-geometry';
import {initWASM} from '../../src/init';
import {reducePrecision} from '../utils';

/**
 * test createPointCollectionFromBinaryFeatures, simple points
 */
test('Test createPointCollectionFromBinaryFeatures(), simple points', async t => {
  const wasmInstance = await initWASM();

  // featureTypes: {polygon: false, point: true, line: false},
  const pointBinaryGeometry: Array<BinaryFeatureCollection> = [
    {
      shape: 'binary-feature-collection',
      points: {
        ...getBinaryGeometryTemplate(),
        type: 'Point',
        globalFeatureIds: {value: new Uint32Array([0, 1]), size: 1},
        positions: {value: new Float64Array([1, 1, 2, 2]), size: 2},
        properties: [{index: 0}, {index: 1}],
        featureIds: {value: new Uint32Array([0, 1]), size: 1}
      },
      lines: {
        ...getBinaryGeometryTemplate(),
        type: 'LineString',
        pathIndices: {value: new Uint16Array(0), size: 1}
      },
      polygons: {
        ...getBinaryGeometryTemplate(),
        type: 'Polygon',
        polygonIndices: {value: new Uint16Array(0), size: 1},
        primitivePolygonIndices: {value: new Uint16Array(0), size: 1}
      }
    }
  ];

  const pointsArray = pointBinaryGeometry.map(chunk => chunk.points);
  const points = await createPointCollectionFromBinaryFeatures(pointsArray, wasmInstance);

  // since we don't expose other function for PolygonCollection, we use getCentroids()
  // function to check if the returned value is correct
  const centroids = points.getCentroids();

  t.equal(centroids?.size(), 2, 'should return correct size of centroids');

  const expectedCentroids = [
    [1, 1],
    [2, 2]
  ];

  const actualCentroids = [
    [centroids.get(0).get(0), centroids.get(0).get(1)],
    [centroids.get(1).get(0), centroids.get(1).get(1)]
  ];

  t.deepEqual(actualCentroids, expectedCentroids, 'should return correct centroids');

  t.end();
});

/**
 * test createPointCollectionFromBinaryFeatures, multi-point features
 */
test('Test createPointCollectionFromBinaryFeatures(), multi-point features', async t => {
  const wasmInstance = await initWASM();

  const pointBinaryGeometry: Array<BinaryFeatureCollection> = [
    {
      shape: 'binary-feature-collection',
      points: {
        ...getBinaryGeometryTemplate(),
        type: 'Point',
        globalFeatureIds: {value: new Uint32Array([0, 0, 1, 1]), size: 1},
        positions: {value: new Float64Array([1, 1, 2, 2, 3, 3, 4, 4]), size: 1},
        properties: [{index: 0}, {index: 1}],
        featureIds: {value: new Uint32Array([0, 0, 1, 1]), size: 1}
      },
      lines: {
        ...getBinaryGeometryTemplate(),
        type: 'LineString',
        pathIndices: {value: new Uint16Array(0), size: 0}
      },
      polygons: {
        ...getBinaryGeometryTemplate(),
        type: 'Polygon',
        polygonIndices: {value: new Uint16Array(0), size: 0},
        primitivePolygonIndices: {value: new Uint16Array(0), size: 0}
      }
    }
  ];

  const pointsArray = pointBinaryGeometry.map(chunk => chunk.points);
  const points = await createPointCollectionFromBinaryFeatures(pointsArray, wasmInstance);

  // since we don't expose other function for PolygonCollection, we use getCentroids()
  // function to check if the returned value is correct
  const centroids = points.getCentroids();

  t.equal(centroids?.size(), 2, 'should return correct size of centroids');

  const expectedCentroids = [
    [1.5, 1.5],
    [3.5, 3.5]
  ];

  const actualCentroids = [
    [centroids.get(0).get(0), centroids.get(0).get(1)],
    [centroids.get(1).get(0), centroids.get(1).get(1)]
  ];

  t.deepEqual(actualCentroids, expectedCentroids, 'should return correct centroids');

  t.end();
});

/**
 * test createLineCollectionFromBinaryFeatures, simple lines
 */
test('Test createLineCollectionFromBinaryFeatures(), simple lines', async t => {
  const wasmInstance = await initWASM();

  // featureTypes: {polygon: false, point: true, line: false},
  const lineBinaryGeometry: Array<BinaryFeatureCollection> = [
    {
      shape: 'binary-feature-collection',
      points: {
        ...getBinaryGeometryTemplate(),
        type: 'Point'
      },
      lines: {
        ...getBinaryGeometryTemplate(),
        type: 'LineString',
        globalFeatureIds: {value: new Uint32Array([0, 0, 1, 1]), size: 1},
        positions: {value: new Float64Array([0, 0, 1, 1, 2, 2, 3, 3]), size: 2},
        properties: [{index: 0}, {index: 1}],
        featureIds: {value: new Uint32Array([0, 0, 1, 1]), size: 1},
        pathIndices: {value: new Int32Array([0, 2, 4]), size: 1}
      },
      polygons: {
        ...getBinaryGeometryTemplate(),
        type: 'Polygon',
        polygonIndices: {value: new Uint16Array(0), size: 0},
        primitivePolygonIndices: {value: new Uint16Array(0), size: 0}
      }
    }
  ];

  const linesArray = lineBinaryGeometry.map(chunk => chunk.lines);
  const lines = await createLineCollectionFromBinaryFeatures(linesArray, wasmInstance);

  // since we don't expose other function for PolygonCollection, we use getCentroids()
  // function to check if the returned value is correct
  const centroids = lines.getCentroids();

  t.equal(centroids?.size(), 2, 'should return correct size of centroids');

  const expectedCentroids = [
    [0.5, 0.5],
    [2.5, 2.5]
  ];

  const actualCentroids = [
    [centroids.get(0).get(0), centroids.get(0).get(1)],
    [centroids.get(1).get(0), centroids.get(1).get(1)]
  ];

  t.deepEqual(actualCentroids, expectedCentroids, 'should return correct centroids');

  t.end();
});

/**
 * test createLineCollectionFromBinaryFeatures, multilines
 */
test('Test createLineCollectionFromBinaryFeatures(), multilines', async t => {
  const wasmInstance = await initWASM();

  // featureTypes: {polygon: false, point: true, line: false},
  const lineBinaryGeometry: Array<BinaryFeatureCollection> = [
    {
      shape: 'binary-feature-collection',
      points: {
        ...getBinaryGeometryTemplate(),
        type: 'Point'
      },
      lines: {
        ...getBinaryGeometryTemplate(),
        type: 'LineString',
        globalFeatureIds: {value: new Uint32Array([0, 0, 0, 0, 1, 1, 1, 1]), size: 1},
        positions: {
          value: new Float64Array([1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8]),
          size: 2
        },
        properties: [{index: 0}, {index: 1}],
        featureIds: {value: new Uint32Array([0, 0, 0, 0, 1, 1, 1, 1]), size: 1},
        pathIndices: {value: new Int32Array([0, 2, 4, 6, 8]), size: 1}
      },
      polygons: {
        ...getBinaryGeometryTemplate(),
        type: 'Polygon',
        polygonIndices: {value: new Uint16Array(0), size: 1},
        primitivePolygonIndices: {value: new Uint16Array(0), size: 1}
      }
    }
  ];

  const linesArray = lineBinaryGeometry.map(chunk => chunk.lines);
  const lines = await createLineCollectionFromBinaryFeatures(linesArray, wasmInstance);

  // since we don't expose other function for PolygonCollection, we use getCentroids()
  // function to check if the returned value is correct
  const centroids = lines.getCentroids();

  t.equal(centroids?.size(), 2, 'should return correct size of centroids');

  const expectedCentroids = [
    [2.5, 2.5],
    [6.5, 6.5]
  ];

  const actualCentroids = reducePrecision([
    [centroids.get(0).get(0), centroids.get(0).get(1)],
    [centroids.get(1).get(0), centroids.get(1).get(1)]
  ]);

  t.deepEqual(actualCentroids, expectedCentroids, 'should return correct centroids');

  t.end();
});

/**
 * test createPolygonCollectionFromBinaryFeatures, simple polygons
 */
test('Test createPolygonCollectionFromBinaryFeatures(), simple polygons', async t => {
  const wasmInstance = await initWASM();

  // featureTypes: {polygon: false, point: true, line: false},
  const polygonBinaryGeometry: Array<BinaryFeatureCollection> = [
    {
      shape: 'binary-feature-collection',
      points: {
        ...getBinaryGeometryTemplate(),
        type: 'Point'
      },
      lines: {
        ...getBinaryGeometryTemplate(),
        type: 'LineString',
        pathIndices: {value: new Uint16Array(0), size: 1}
      },
      polygons: {
        ...getBinaryGeometryTemplate(),
        type: 'Polygon',
        globalFeatureIds: {
          value: new Uint32Array([0, 0, 0, 0, 0, 1, 1, 1, 1, 1]),
          size: 1
        },
        positions: {
          value: new Float64Array([
            0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 10, 10, 10, 11, 11, 11, 11, 10, 10, 10
          ]),
          size: 2
        },
        properties: [{index: 0}, {index: 1}],
        featureIds: {value: new Uint32Array([0, 0, 0, 0, 0, 1, 1, 1, 1, 1]), size: 1},
        polygonIndices: {value: new Int32Array([0, 5, 10]), size: 1},
        primitivePolygonIndices: {value: new Int32Array([0, 5, 10]), size: 1}
      }
    }
  ];

  const polygonsArray = polygonBinaryGeometry.map(chunk => chunk.polygons);
  const polygons = await createPolygonCollectionFromBinaryFeatures(polygonsArray, wasmInstance);

  // since we don't expose other function for PolygonCollection, we use getCentroids()
  // function to check if the returned value is correct
  const centroids = polygons.getCentroids();

  t.equal(centroids.size(), 2, 'should return correct size of centroids');

  const expectedCentroids = [
    [0.5, 0.5],
    [10.5, 10.5]
  ];

  const actualCentroids = [
    [centroids.get(0).get(0), centroids.get(0).get(1)],
    [centroids.get(1).get(0), centroids.get(1).get(1)]
  ];

  t.deepEqual(actualCentroids, expectedCentroids, 'should return correct centroids');

  t.end();
});

/**
 * test createPolygonCollectionFromBinaryFeatures, multi polygons
 */
test('Test createPolygonCollectionFromBinaryFeatures(), multi polygons', async t => {
  const wasmInstance = await initWASM();

  // featureTypes: {polygon: false, point: true, line: false},
  const polygonBinaryGeometry: Array<BinaryFeatureCollection> = [
    {
      shape: 'binary-feature-collection',
      points: {
        ...getBinaryGeometryTemplate(),
        type: 'Point'
      },
      lines: {
        ...getBinaryGeometryTemplate(),
        type: 'LineString',
        pathIndices: {value: new Uint16Array(0), size: 1}
      },
      polygons: {
        ...getBinaryGeometryTemplate(),
        type: 'Polygon',
        globalFeatureIds: {
          value: new Uint32Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
          size: 1
        },
        positions: {
          value: new Float64Array([0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 2, 2, 2, 3, 3, 3, 3, 2, 2, 2]),
          size: 2
        },
        properties: [{index: 0}],
        featureIds: {
          value: new Uint32Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
          size: 1
        },
        polygonIndices: {value: new Int32Array([0, 5, 10]), size: 1},
        primitivePolygonIndices: {value: new Int32Array([0, 5, 10]), size: 1}
      }
    }
  ];

  const polygonsArray = polygonBinaryGeometry.map(chunk => chunk.polygons);
  const polygons = await createPolygonCollectionFromBinaryFeatures(polygonsArray, wasmInstance);

  // since we don't expose other function for PolygonCollection, we use getCentroids()
  // function to check if the returned value is correct
  const centroids = polygons.getCentroids();

  t.equal(centroids?.size(), 1, 'should return correct size of centroids');

  const expectedCentroids = [[1.5, 1.5]];

  const actualCentroids = [[centroids.get(0).get(0), centroids.get(0).get(1)]];

  t.deepEqual(actualCentroids, expectedCentroids, 'should return correct centroids');

  t.end();
});

/**
 * test createPolygonCollectionFromBinaryFeatures, multi polygons with holes
 */
test('Test createPolygonCollectionFromBinaryFeatures(), multi polygons with holes', async t => {
  const wasmInstance = await initWASM();

  // featureTypes: {polygon: false, point: true, line: false},
  const polygonBinaryGeometry: Array<BinaryFeatureCollection> = [
    {
      shape: 'binary-feature-collection',
      points: {
        ...getBinaryGeometryTemplate(),
        type: 'Point'
      },
      lines: {
        ...getBinaryGeometryTemplate(),
        type: 'LineString',
        pathIndices: {value: new Uint16Array(0), size: 1}
      },
      polygons: {
        ...getBinaryGeometryTemplate(),
        type: 'Polygon',
        globalFeatureIds: {
          value: new Uint32Array([
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
          ]),
          size: 1
        },
        positions: {
          value: new Float64Array([
            0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0.25, 0.25, 0.25, 0.75, 0.75, 0.75, 0.75, 0.25, 0.25,
            0.25, 2, 2, 2, 3, 3, 3, 3, 2, 2, 2, 10, 10, 10, 11, 11, 11, 11, 10, 10, 10, 10.25,
            10.25, 10.25, 10.75, 10.75, 10.75, 10.75, 10.25, 10.25, 10.25, 12, 12, 12, 13, 13, 13,
            13, 12, 12, 12
          ]),
          size: 2
        },
        properties: [{index: 0}, {index: 1}],
        featureIds: {
          value: new Uint32Array([
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
          ]),
          size: 1
        },
        polygonIndices: {value: new Int32Array([0, 10, 15, 25, 30]), size: 1},
        primitivePolygonIndices: {value: new Int32Array([0, 5, 10, 15, 20, 25, 30]), size: 1}
      }
    }
  ];

  const polygonsArray = polygonBinaryGeometry.map(chunk => chunk.polygons);
  const polygons = await createPolygonCollectionFromBinaryFeatures(polygonsArray, wasmInstance);

  // since we don't expose other function for PolygonCollection, we use getCentroids()
  // function to check if the returned value is correct
  const centroids = polygons.getCentroids();

  t.equal(centroids?.size(), 2, 'should return correct size of centroids');

  const expectedCentroids = [
    [1.6428571428571428, 1.6428571428571428],
    [11.642857142857142, 11.642857142857142]
  ];

  const actualCentroids = [
    [centroids.get(0).get(0), centroids.get(0).get(1)],
    [centroids.get(1).get(0), centroids.get(1).get(1)]
  ];

  t.deepEqual(actualCentroids, expectedCentroids, 'should return correct centroids');

  t.end();
});