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
    playType: 'cl',
    category: '',
    pop: 75,
    prc: null,
    popSort: null,
    prcSort: true,
}

export type State = {
    data: Game[];
    updated: Dict<Game>;
    filters: Filters;
    dataIsLoading: bol;
};

export const state = $obs<State>({
    data: [],
    updated: JSON.parse(localStorage.getItem(LS_UPDATED) || 'null') || {},
    filters: JSON.parse(localStorage.getItem(LS_FILTERS) || 'null') || initFilters,
    dataIsLoading: true,
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