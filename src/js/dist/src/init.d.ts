import type { GeoDaModule } from '../wasm';
/**
 * Set the delivery WASM URL, this can be used to initialize the WASM module by using the specified WASM url.
 * For example, https://unpkg.com/geoda-wasm@0.0.1/dist/geoda.wasm
 * @param wasmUrl - The URL of the WASM file
 */
export declare function setDeliveryWASM(wasmUrl: string): void;
/**
 * Get the delivery WASM URL, this can be used to initialize the WASM module by using the specified WASM url.
 * For example, https://unpkg.com/geoda-wasm@0.0.1/dist/geoda.wasm
 * @returns The URL of the WASM file
 */
export declare function getDeliveryWASM(): string | null;
/**
 * Initialize the GeoDa WASM module.
 *
 * @example You can configure to bundle the WASM file
 * ```ts
 * import {initWASM} from 'geoda-wasm';
 * const geoda = await initWASM();
 * ```
 *
 * @example Use the CDN delivery WASM file
 * ```ts
 * import {initWASM, getDeliveryWASM} from 'geoda-wasm';
 * const geoda = await initWASM(getDeliveryWASM());
 * ```
 *
 * @returns The GeoDa WASM module
 */
export declare function initWASM(publicWASMUrl?: string): Promise<GeoDaModule>;
/**
 * Reset the GeoDa WASM module.
 *
 * When you want to reset the GeoDa WASM module, e.g. an unknown error occurs, you can use this function.
 *
 * @example
 * ```ts
 * import {resetWASM} from 'geoda-wasm';
 * resetWASM();
 * ```
 */
export declare function resetWASM(): void;
export declare function setWASM(instance: GeoDaModule): void;
export declare function getWASM(): GeoDaModule | null;
