import {LocalMoranResult} from './local-moran';
import {initWASM} from '../init';
import {vecDoubleToNumber, vecIntToNumber, vecStringToArray} from '../utils';

export type LocalGProps = {
  data: number[] | Float32Array;
  neighbors: number[][];
  permutation: number;
  significanceCutoff?: number;
  seed?: number;
  isGStar?: boolean;
};
// Get local Getis-Ord statistics
export async function localG({
  data,
  neighbors,
  permutation,
  significanceCutoff = 0.05,
  seed = 1234567890,
  isGStar = false
}: LocalGProps): Promise<LocalMoranResult> {
  const wasm = await initWASM();

  const n = data.length;
  const wasmData = new wasm.VectorDouble();
  wasmData.resize(n, 0);
  for (let i = 0; i < n; ++i) {
    wasmData.set(i, data[i]);
  }

  const wasmUndefs = new wasm.VectorUInt();
  const wasmNeighbors = new wasm.VecVecUInt();
  for (let i = 0; i < n; ++i) {
    const nbrs = neighbors[i];
    const wasmNeighborIndices = new wasm.VectorUInt();
    for (let j = 0, numNbrs = nbrs.length; j < numNbrs; ++j) {
      wasmNeighborIndices.push_back(nbrs[j]);
    }
    wasmNeighbors.push_back(wasmNeighborIndices);
  }

  const result = wasm.localG(
    wasmData,
    wasmNeighbors,
    wasmUndefs,
    significanceCutoff,
    permutation,
    seed,
    isGStar ? 1 : 0
  );

  return {
    isValid: result.isValid(),
    clusters: vecDoubleToNumber(result.getClusters()),
    lagValues: vecDoubleToNumber(result.getLagValues()),
    lisaValues: vecDoubleToNumber(result.getLisaValues()),
    pValues: vecDoubleToNumber(result.getPValues()),
    sigCategories: vecIntToNumber(result.getSignificanceCategories()),
    nn: vecIntToNumber(result.getNN()),
    labels: vecStringToArray(result.getLabels()),
    colors: vecStringToArray(result.getColors())
  };
}