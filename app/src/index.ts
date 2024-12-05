import './style/index.css'
import { render } from 'lit-html';
import { fetchJson, wait } from './util/util';
import { toGameData } from './util/app.util';
import { state } from './store';
import { app } from './app';

const isDev: bol = (process.env as any).IS_DEV
const API_URL: str = (process.env as any).API_URL || (process.env as any).DEV_API_URL;

console.log({isDev, API_URL}, (process.env as any).API_URL,
process.env.VITE_API_URL, process.env.VITE_IS_DEV)

const api = {
    data: async () => {
        const data: _Game[] = await fetchJson(`${API_URL}/api/data`) || [];
        return data.map(g => toGameData(g));
    },
    isLoading: async () => !(await fetchJson<bol>(`${API_URL}/api/is-set`)),
}

const loadData = async () => {
    const isLoading = await api.isLoading();
    if (isLoading) {
        wait(1500).then(loadData);
    } else {
        state.upd(s => ({...s, dataIsLoading: isLoading }));

        const data = await api.data();
        state.upd((s) => ({ ...s, data }));
    }
}
setTimeout(loadData);

state.sub(o => {
    const data = o.data.map(x => o.updated[x.id] || x);

    const categoriesSet = new Set<str>();
    data.forEach(x => x.categories.forEach(y => categoriesSet.add(y)))
    const categories = [...categoriesSet.values()];

    let filtered = data.filter(x => {
        if (o.filters.steam === 'yes-steam' && !x.steam ) return false;
        if (o.filters.steam === 'no-steam'  && x.steam  ) return false;

        if (o.filters.playType === 'cl' && !x.console ) return false;
        if (o.filters.playType === 'pc' && !x.pc      ) return false;
        if (o.filters.playType === 'tc' && !x.touch   ) return false;

        if (o.filters.pop && o.filters.pop > (x.popularityK || 0)   ) return false;
        if (o.filters.prc && o.filters.prc > (x.prcPos || 0)        ) return false;

        return true;
    })

    filtered = o.filters.category ? filtered.filter(x => o.filters.category && x.categories.find(c => c === o.filters.category)) : filtered;
    filtered = o.filters.popSort === null ? filtered : o.filters.popSort ? filtered.sort((a, b) => (b.popularityK || 0) - (a.popularityK || 0)) : filtered.sort((a, b) => (a.popularityK || 0) - (b.popularityK || 0));
    filtered = o.filters.prcSort === null ? filtered : o.filters.prcSort ? filtered.sort((a, b) => (b.prcPos || 0) - (a.prcPos || 0)) : filtered.sort((a, b) => (a.prcPos || 0) - (b.prcPos || 0));
    const steamMatched = filtered.filter(x => x.steam);

    render(app({
        ...o,
        data,
        filtered,
        categories,
        steamMatched,
        isLoading: !data.length,
    }), document.getElementById('app')!);
})