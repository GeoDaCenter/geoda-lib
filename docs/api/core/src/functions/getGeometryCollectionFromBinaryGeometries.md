[geodalib](../../../modules.md) / [core/src](../index.md) / getGeometryCollectionFromBinaryGeometries

# Function: getGeometryCollectionFromBinaryGeometries()

> **getGeometryCollectionFromBinaryGeometries**(`geometryType`, `binaryFeaturesChunks`, `wasm`): `Promise`\<`GeometryCollection`\>

Defined in: [core/src/geometry/binary-geometry.ts:32](https://github.com/GeoDaCenter/geoda-lib/blob/246bf05338fdf79294f778f8829940c18b17a0f8/js/packages/core/src/geometry/binary-geometry.ts#L32)

Creates a GeoDa GeometryCollection from binary geometry features

## Parameters

### geometryType

[`BinaryGeometryType`](../type-aliases/BinaryGeometryType.md)

The type of geometry to create

### binaryFeaturesChunks

`BinaryFeatureCollection`[]

Array of binary feature collections. See BinaryFeatureCollection in `@loaders.gl/schema`

### wasm

[`GeoDaInterface`](../interfaces/GeoDaInterface.md)

The initialized GeoDa WASM module

## Returns

`Promise`\<`GeometryCollection`\>

A GeoDa geometry collection

## Throws

If WASM module is not initialized or geometry type is unknown
