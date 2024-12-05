import { join } from "@std/path";
import { ensureDirSync } from "@std/fs"

export const joinToRoot = (...path: str[]) => join(import.meta.dirname || '/', '..', ...path);

export const dataStore = <T = unknown>(key: string) => {
    ensureDirSync(joinToRoot('tmp'));
    const file = joinToRoot('tmp') + `/${key}.json`;

    return {
        get(): T | null {
            try {
                return JSON.parse(Deno.readTextFileSync(file));
            } catch {
                return null;
            }
        },

        set(data: T) {
            Deno.writeTextFileSync(file, JSON.stringify(data));
        },
    }
};

export async function fetchJson<T = unknown>(getUrl: str) {
    const res = await fetch(getUrl);
    return await res.json() as T;
}

export async function cachedData<T>(
    key: string,
    ensureFn: AnyFnc<Promise<T>> | AnyFnc<T>,
    useCache = true,
) {
    const store = dataStore<T>(key);

    let data: T | null
    if (useCache) {
        data = store.get();
        if (data) return data;
    }

    data = await ensureFn();

    store.set(data);
    return data;
}

export const dt = () => new Date().toISOString().split('T')[0];

export const wait = (ms: number) =>
    new Promise(res => setTimeout(res, ms));

export const clone = <T>(val: T): T => JSON.parse(JSON.stringify(val))