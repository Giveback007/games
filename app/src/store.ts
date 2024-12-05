import { $obs } from "./util/sub.util";

const LS_UPDATED = 'updated';
const LS_FILTERS = 'filters';

type Filters = {
    steam: '' | 'yes-steam' | 'no-steam'
    playType: '' | 'cl' | 'tc' | 'pc';
    category: str;
    pop: null | num;
    prc: null | num;
    popSort: null | bol;
    prcSort: null | bol;
};

export const initFilters: Filters = {
    steam: 'yes-steam',
    playType: '',
    category: '',
    pop: null,
    prc: null,
    popSort: null,
    prcSort: null,
}

export type State = {
    data: Game[];
    updated: Dict<Game>;
    // categories: str[];
    filters: Filters;
};

export const state = $obs<State>({
    data: [],
    updated: JSON.parse(localStorage.getItem(LS_UPDATED) || 'null') || {},
    filters: JSON.parse(localStorage.getItem(LS_FILTERS) || 'null') || initFilters,
});

state.sub(({ updated, filters }) => {
    localStorage.setItem(LS_UPDATED, JSON.stringify(updated))
    localStorage.setItem(LS_FILTERS, JSON.stringify(filters))
});

export const setFilterItem = <K extends keyof Filters>(
    key: K,
    value: Filters[K]
) => state.upd(s => {
    s.filters = {...s.filters, [key]: value }
    return s;
})