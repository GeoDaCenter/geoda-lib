/**
 * Result object containing Local Moran's I statistics and cluster information
 *
 * @typedef {Object} LocalMoranResult
 * @property {boolean} isValid - Indicates if the analysis was successful
 * @property {number[]} clusters - Cluster assignments for each observation
 * @property {number[]} lagValues - Spatially lagged values
 * @property {number[]} pValues - Statistical significance values
 * @property {number[]} lisaValues - Local Moran's I statistics
 * @property {number[]} sigCategories - Significance categories (e.g., high-high, low-low)
 * @property {number[]} nn - Number of neighbors for each observation
 * @property {string[]} labels - Descriptive labels for clusters
 * @property {string[]} colors - Color codes for visualization
 */
export type LocalMoranResult = {
    isValid: boolean;
    clusters: number[];
    lagValues: number[];
    pValues: number[];
    lisaValues: number[];
    sigCategories: number[];
    nn: number[];
    labels: string[];
    colors: string[];
};
/**
 * Configuration properties for univariate Local Moran's I calculation
 * @typedef {Object} LocalMoranProps
 * @property {number[] | Float32Array} data - Input data array
 * @property {number[][]} neighbors - Spatial weights matrix as adjacency list
 * @property {number} permutation - Number of permutations for significance testing
 * @property {number} [significanceCutoff=0.05] - Statistical significance threshold
 * @property {number} [seed=1234567890] - Random seed for reproducibility
 */
export type LocalMoranProps = {
    data: number[] | Float32Array;
    neighbors: number[][];
    permutation: number;
    significanceCutoff?: number;
    seed?: number;
};
/**
 * Calculates univariate Local Moran's I statistics for spatial autocorrelation
 * @param {LocalMoranProps} props - Configuration object for Local Moran's I calculation
 * @returns {Promise<LocalMoranResult>} Promise resolving to Local Moran statistics and cluster assignments
 */
export declare function localMoran({ data, neighbors, permutation, significanceCutoff, seed }: LocalMoranProps): Promise<LocalMoranResult>;
/**
 * Configuration properties for bivariate Local Moran's I calculation
 * @typedef {Object} BivariateLocalMoranProps
 * @property {number[] | Float32Array} data1 - First variable's observations
 * @property {number[] | Float32Array} data2 - Second variable's observations
 * @property {number[][]} neighbors - Spatial weights matrix as adjacency list
 * @property {number} permutation - Number of permutations for significance testing
 * @property {number} [significanceCutoff=0.05] - Statistical significance threshold
 * @property {number} [seed=1234567890] - Random seed for reproducibility
 */
export type BivariateLocalMoranProps = {
    data1: number[] | Float32Array;
    data2: number[] | Float32Array;
    neighbors: number[][];
    permutation: number;
    significanceCutoff?: number;
    seed?: number;
};
/**
 * Calculates bivariate Local Moran's I statistics to measure spatial correlation
 * between two variables
 * @param {BivariateLocalMoranProps} props - Configuration object for bivariate Local Moran's I
 * @returns {Promise<LocalMoranResult>} Promise resolving to Local Moran statistics and cluster assignments
 */
export declare function bivariateLocalMoran({ data1, data2, neighbors, permutation, significanceCutoff, seed }: BivariateLocalMoranProps): Promise<LocalMoranResult>;
