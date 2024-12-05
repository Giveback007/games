export function $obs<T extends obj>(initialValue: T) {
    const subscribers = new Set<(val: T) => any>();
    const prevVal = {...initialValue};

    return {
        upd(fn: (val: T) => T) {
            const newVal = fn({...prevVal});
            let didChange = false;
            for (const k in newVal) {
                if (prevVal[k] !== newVal[k]) {
                    prevVal[k] = newVal[k];
                    didChange = true
                }
            }

            if (
                !didChange
                &&
                Object.keys(newVal).length === Object.keys(prevVal).length
            ) return;

            for (const fn of subscribers) fn(newVal)
        },

        set(newVal: T) {
            let didChange = false;
            for (const k in newVal) {
                if (prevVal[k] !== newVal[k]) {
                    prevVal[k] = newVal[k];
                    didChange = true;
                }
            }

            if (
                !didChange
                &&
                Object.keys(newVal).length === Object.keys(prevVal).length
            ) return;

            for (const fn of subscribers) fn(newVal)
        },

        sub(fn: (val: T) => any) {
            fn(prevVal);
            subscribers.add(fn);

            return () => subscribers.delete(fn);
        },

        get() {
            return prevVal;
        },
    }
}