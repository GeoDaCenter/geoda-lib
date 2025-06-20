[geodalib](../../../modules.md) / [core/src](../index.md) / standardizeMAD

# Function: standardizeMAD()

> **standardizeMAD**(`data`): `Promise`\<`number`[]\>

Defined in: [core/src/data/mad.ts:19](https://github.com/GeoDaCenter/geoda-lib/blob/04471ecd75dbfe13a0a0fbff4b6e7d785ad0f8e7/js/packages/core/src/data/mad.ts#L19)

Standardizes data using Mean Absolute Deviation (MAD) normalization.

For each valid data point, applies the transformation: (x - mean) / mad

## Parameters

### data

The numeric values to be standardized

`number`[] | `Float32Array`\<`ArrayBufferLike`\>

## Returns

`Promise`\<`number`[]\>

The standardized data using MAD normalization

## Example

```ts
const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const standardized = await standardizeMAD(data);
console.log(standardized);
```
