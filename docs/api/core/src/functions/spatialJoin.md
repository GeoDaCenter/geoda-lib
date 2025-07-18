[geodalib](../../../modules.md) / [core/src](../index.md) / spatialJoin

# Function: spatialJoin()

> **spatialJoin**(`__namedParameters`): `Promise`\<`number`[][]\>

Defined in: [core/src/geometry/spatial-join.ts:34](https://github.com/GeoDaCenter/geoda-lib/blob/04471ecd75dbfe13a0a0fbff4b6e7d785ad0f8e7/js/packages/core/src/geometry/spatial-join.ts#L34)

Spatial join two geometries. The result is an array of arrays, where each sub-array contains the indexes of the geometries (right) that intersect.

## Parameters

### \_\_namedParameters

[`SpatialJoinProps`](../type-aliases/SpatialJoinProps.md)

## Returns

`Promise`\<`number`[][]\>

## Example

```ts
const leftGeometries = [
  { type: 'Feature', geometry: { type: 'Polygon', coordinates: [[[0, 0], [1, 0], [1, 1], [0, 1], [0, 0]]] }, properties: { index: 0 } },
];
const rightGeometries = [
  { type: 'Feature', geometry: { type: 'Polygon', coordinates: [[[0, 0], [1, 0], [1, 1], [0, 1], [0, 0]]] }, properties: { index: 1 } },
];
const joinIndexes = await spatialJoin({ leftGeometries, rightGeometries });
```
