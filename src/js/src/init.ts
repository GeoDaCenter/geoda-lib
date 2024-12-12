import type {GeoDaModule} from '../wasm';
// @ts-expect-error - geodaAny is not used
import geodaModule from '../wasm/index.cjs';

let customWASMUrl: string | null = null;

/**
 * Set the delivery WASM URL, this can be used to initialize the WASM module by using the specified WASM url.
 * For example, https://unpkg.com/geoda-wasm@0.0.1/dist/geoda.wasm
 * @param wasmUrl - The URL of the WASM file
 */
export function setDeliveryWASM(wasmUrl: string): void {
  customWASMUrl = wasmUrl;
}

/**
 * Get the delivery WASM URL, this can be used to initialize the WASM module by using the specified WASM url.
 * For example, https://unpkg.com/geoda-wasm@0.0.1/dist/geoda.wasm
 * @returns The URL of the WASM file
 */
export function getDeliveryWASM(): string | null {
  return 'https://unpkg.com/geoda-wasm@latest/dist/geoda.wasm';
}

// Singlton wasmInstance promise
let wasmInstancePromise: Promise<GeoDaModule> | null = null;

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
export async function initWASM(publicWASMUrl?: string): Promise<GeoDaModule> {
  if (publicWASMUrl) {
    setDeliveryWASM(publicWASMUrl);
  }
  if (wasmInstancePromise === null) {
    wasmInstancePromise = (
      geodaModule as (options: Record<string, unknown>) => Promise<GeoDaModule>
    )(customWASMUrl ? {locateFile: () => customWASMUrl} : {});
  }
  return wasmInstancePromise;
}

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
export function resetWASM(): void {
  wasmInstancePromise = null;
  wasmInstance = null;
  (geodaModule as (options: Record<string, unknown>) => Promise<GeoDaModule>)(
    customWASMUrl ? {locateFile: () => customWASMUrl} : {}
  ).then(instance => {
    wasmInstance = instance;
  });
}

// Global nonPromise instance of GeoDa WASM module
let wasmInstance: GeoDaModule | null = null;

// Set the global instance of GeoDa WASM module
export function setWASM(instance: GeoDaModule): void {
  wasmInstance = instance;
}

// Get the global instance of GeoDa WASM module
export function getWASM(): GeoDaModule | null {
  return wasmInstance;
}
