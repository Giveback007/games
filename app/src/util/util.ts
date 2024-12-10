type StorageType = 'localStorage' | 'sessionStorage';

export function debounceTimeOut() {
    let timeoutId: num | null = null;

    return (fct: AnyFnc | 'cancel', ms: num) => {
        if (timeoutId) clearTimeout(timeoutId);

        if (fct !== 'cancel')
            timeoutId = setTimeout(fct, ms || 0);
    }
}

export function getRatingColor(value: num) {
    const n = 120 + (value - 100) * 2.35;
    return `hsl(${n < 0 ? 0 : n}, 50%, 40%)`;
}

export const dataStore = <T = unknown>(key: string, type: StorageType) => {
    return {
        get: (): T | null => JSON.parse(globalThis[type].getItem(key) ?? 'null'),
        set: (data: T) => globalThis[type].setItem(key, JSON.stringify(data)),
    };
};

export async function fetchJson<T = unknown>(getUrl: string) {
    const res = await fetch(getUrl);
    return await res.json() as T;
}

export async function cachedData<T = unknown>(key: string, ensureFn: AnyFnc<Promise<T>> | AnyFnc<T>) {
    const store = dataStore<T>(key, 'localStorage');

    let data = store.get();
    if (data) return data;

    data = await ensureFn();

    store.set(data);
    return data;
}

export const wait = (ms: number) =>
    new Promise(res => setTimeout(res, ms));

export const dt = () => new Date().toISOString().split('T')[0];

