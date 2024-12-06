import { html } from "lit-html";
import { state } from "../store";
import { toGameData } from "../util/app.util";
import { getRatingColor } from "../util/util";

// ★
const cardDetails = (steamSearch: Steam[], game: Game) => html`${steamSearch.map(x => {
    return html`<hr/><details>
        <summary style="display: flex; flex-direction: column; align-items: center;">
            <img loading="lazy" src="${x.img}">
            <span style="flex: 1;">${x.title}</span>
        </summary>

        <div style="display: flex;">
            <a
                href="https://store.steampowered.com/app/${x.id}"
                style="display: flex; cursor: pointer;"
                target="_blank"
            >
                <button
                    class="secondary"
                    style="padding: 0 0.5rem; margin-right: 0.1rem;"
                >
                    <img src="/steam.png" style="margin: auto; height: 20px; width: 20px;">
                </button>
            </a>

            <button
                style="flex: 1; padding: 0.25rem;"
                @click="${() => state.upd(s => {
                    const updated = {...s.updated}
                    updated[game.id] = toGameData(game, x);

                    return { ...s, updated };
                })}"
            >Select</button>
        </div>
    </details>`
})}`;

export const card = (game: Game) => {
    const color = game.prcPos ? `background: ${getRatingColor(game.prcPos)};` : '';
    const { steam } = game;

    return html`<article
        class="game-card"
        style="display: flex; padding: 0; margin: 0.275rem; box-shadow: 0 0.3rem rgba(0, 0, 0, 0.25);"
    >
        <div style="display: flex; margin: 0 auto; padding-bottom: 0.75rem;">
            <div style="display: flex; flex-direction: column;">
                <a
                    href="https://www.microsoft.com/store/productId/${game.xboxId}"
                    title="https://www.microsoft.com/store/productId/${game.xboxId}"
                    style="display: flex; cursor: pointer;"
                    target="_blank"
                >
                    <img
                        loading="lazy"
                        style="object-fit: cover; aspect-ratio: 1 / 1; margin: 0.1rem;"
                        src="${game.imgVertArt?.src || game.imgLogo?.src || game.images[0]?.src}"
                    >
                </a>
                <div style="display: flex; flex-direction: row; justify-content: space-between; margin: 0.275rem 0;">
                    <div style="font-size: ${game.prcPos ? '1.25rem' : '1.125rem'}; font-weight: 700; display: flex; flex: 1; background: rgb(82, 95, 122); margin-right:  ${game.prcPos ? '0.275rem' : '0'};"><span style="margin: auto;">${game.popularityK ? game.popularityK + 'K' : '-'}</span></div>
                    <div style="font-size: 1.25rem; font-weight: 700; display: ${game.prcPos ? 'flex' : 'none'}; width: 3.25rem; ${color}"><span style="margin: auto;">${game.prcPos ? game.prcPos + '%' : ''}</span></div>
                </div>

                <div style="display: flex; justify-content: space-evenly; font-size: 1.35rem;">
                    <span>${game.console ? '🎮' : ''}</span>
                    <span>${game.touch ? '📱' : ''}</span>
                    <span>${game.pc ? '🖥️' : ''}</span>
                </div>

                <hr style="margin: 0.5rem 0; margin-bottom: 0.35rem;">
                <div style="display: ${steam?.href ? 'flex' : 'none'}; margin: 0 auto;">
                    <a
                        href="${steam?.href}"
                        title="${steam?.href}"
                        style="cursor: pointer;"
                        target="_blank"
                    >
                        <div style="text-align: center; margin-bottom: 0.05rem;">
                            <img src="/steam.png" style="margin: auto 0; height: 20px; width: 20px; margin-right: 0.35rem;">
                            Steam
                        </div>
                        <img src="${game.steam?.img}" loading="lazy">
                    </a>
                </div>
                <hr style="margin: 0.5rem 0;"/>

                <div>
                    <a
                        href="https://www.microsoft.com/store/productId/${game.xboxId}"
                        style="display: flex; cursor: pointer;"
                        title="https://www.microsoft.com/store/productId/${game.xboxId}"
                        target="_blank"
                    >
                        <h6 style="margin: auto 0; flex: 1; text-align: center; padding: 0 0.25rem;">
                            ${game.title}
                        </h6>
                    </a>
                </div>

                <div style="flex: 1;">
                    <div>${steam?.href ? null : cardDetails(game.steamSearch.slice(0, 2), game)}</div>
                </div>
            </div>
        </div>
    </article>`
}