[**geoda-wasm**](../README.md)

***

[geoda-wasm](../globals.md) / getGeometryCollectionFromBinaryGeometries

# Function: getGeometryCollectionFromBinaryGeometries()

> **getGeometryCollectionFromBinaryGeometries**(`geometryType`, `binaryFeaturesChunks`, `wasm`): `Promise`\<`GeometryCollection`\>

Defined in: [src/geometry/binary-geometry.ts:25](https://github.com/GeoDaCenter/geoda-lib/blob/0ad3977fd23db605b1dc766f99d329a28ef59f68/src/js/src/geometry/binary-geometry.ts#L25)

create geoda.GeometryCollection from dataToFeatures[] in GeojsonLayer

## Parameters

### geometryType

[`BinaryGeometryType`](../type-aliases/BinaryGeometryType.md)

### binaryFeaturesChunks

`BinaryFeatureCollection`[]

### wasm

[`GeoDaInterface`](../interfaces/GeoDaInterface.md)

## Returns

`Promise`\<`GeometryCollection`\>
