import { html } from "lit-html";
import { card } from "./components/card";
import { initFilters, setFilterItem, state, type State } from "./store";

export const app = (s: State & {
    steamMatched: Game[];
    filtered: Game[];
    isLoading: bol;
    categories: str[];
}) => html`
    <nav
        style="
            white-space: nowrap;
            overflow-x: auto;
            position: fixed;
            background: #13171f;
            width: 100%;
            top: 0;
            min-height: 2rem;
            box-shadow: 0 0.25rem rgba(136, 145, 164, 0.25);
        "
    >
        <div style="display: flex;">
            <button
                style="margin: 0.25rem; padding: 0.5rem 0.75rem;"
                class="${s.filters.favs ? '' : 'outline secondary'}"
                @click="${() => setFilterItem('favs', !s.filters.favs)}"
            >★</button>

            <select
                style="margin: 0.25rem; padding: 0.5rem; width: 5.5rem; ${s.filters.favs ? 'display: none;' : ''}"
                @change="${(e: any) => setFilterItem('playType', e.target.value)}"
            >
                <option
                    value=""
                    style="text-align: center;"
                    ?selected=${s.filters.playType === ''}
                >🎮📱🖥️</option>
                <option ?selected=${s.filters.playType === 'cl'} value="cl" style="text-align: center;">🎮</option>
                <option ?selected=${s.filters.playType === 'tc'} value="tc" style="text-align: center;">📱</option>
                <option ?selected=${s.filters.playType === 'pc'} value="pc" style="text-align: center;">🖥️</option>
            </select>

            <select
                @change="${(e: any) => setFilterItem('steam', e.target.value)}"
                style="margin: 0.25rem; padding: 0.5rem; min-width: 6rem; ${s.filters.favs ? 'display: none;' : ''}"
            >
                <option ?selected=${s.filters.steam === ''} value="">Steam?</option>
                <option ?selected=${s.filters.steam === 'yes-steam'} value="yes-steam">Yes Steam</option>
                <option ?selected=${s.filters.steam === 'no-steam'} value="no-steam">No Steam</option>
            </select>

            <select
                @change="${(e: any) => setFilterItem('category', e.target.value)}"
                style="margin: 0.25rem; padding: 0.5rem; min-width: 6rem; ${s.filters.favs ? 'display: none;' : ''}"
            >
                <option ?selected=${s.filters.category === ''} value="">Category?</option>
                ${s.categories.map(fl => html`<option ?selected=${s.filters.category === fl} value="${fl}">${fl}</option>`)}
            </select>

            <div style="margin: 0 0.25rem; border-right: solid 2px rgba(0, 0, 0, 0.5); ${s.filters.favs ? 'display: none;' : ''}"></div>

            <div style="margin-right: 0.5rem; ${s.filters.favs ? 'display: none;' : ''}">
                <input
                    style="margin: 0.25rem; padding: 0.5rem; width: 4.5rem;"
                    type="number"
                    placeholder="%"
                    min="0"
                    max="100"
                    step="5"
                    value="${s.filters.prc || ''}"
                    @change="${(e: any) => setFilterItem('prc', e.target.value === '0' ? null : Number(e.target.value))}"
                >

                <input
                    style="margin: 0.25rem; padding: 0.5rem; width: 4.5rem;"
                    type="number"
                    placeholder="Pop K"
                    min="0"
                    step="25"
                    value="${s.filters.pop || ''}"
                    @change="${(e: any) => setFilterItem('pop', e.target.value === '0' ? null : Number(e.target.value))}"
                >
            </div>

            <button
                class="${s.filters.popSort === null && 'outline contrast'}"
                style="margin: 0.25rem; padding: 0 0.65rem; ${s.filters.favs ? 'display: none;' : ''}"
                @click="${() => {
                    const x = s.filters.popSort;
                    setFilterItem('popSort', x === null ? true : x === true ? false : null)
                }}"
            >${s.filters.popSort === null ? '◄' : (s.filters.popSort ? '▼' : '▲')} pop</button>

            <button
                class="${s.filters.prcSort === null && 'outline contrast'}"
                style="margin: 0.25rem; padding: 0 0.65rem; ${s.filters.favs ? 'display: none;' : ''}"
                @click="${() => {
                    const x = s.filters.prcSort;
                    setFilterItem('prcSort', x === null ? true : x === true ? false : null)
                }}"
            >${s.filters.prcSort === null ? '◄' : (s.filters.prcSort ? '▼' : '▲')} -%-</button>
        </div>

        <div style="display: flex; padding: 0 0.5rem;">
            <img src="/steam.png" style="margin: auto 0; height: 30px; width: 30px; padding: 0.25rem; display: ${s.dataIsLoading ? 'none' : 'block'}">
            <span style="margin: auto; text-align: center; font-weight: 700; padding-top: 0.15rem" aria-busy="${s.dataIsLoading}">${`: ${s.steamMatched.length}/${s.filtered.length}`}</span>
        </div>
    </nav>
    ${
        s.isLoading
        ?
        html`<h3 aria-busy="true" style="position: fixed; top: 50%;">Loading...</h3>`
            :
        s.filtered.length
        ?
        s.filtered.map(x => card(x))
            :
        html`<button
            style="position: fixed; top: 50%;"
            @click="${() => state.upd(s => ({ ...s, filters: initFilters }))}"
        >Reset Filters</button>`
    }
`;