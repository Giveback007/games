import { cachedData, dt, fetchJson } from "./util.ts";
import { DOMParser } from "jsr:@b-fuze/deno-dom";

export const steamData = {
    // http://api.steampowered.com/ISteamApps/GetAppList/v0002/?format=json
    // https://api.steampowered.com/ISteamApps/GetAppList/v2
    fullList: () => cachedData(
        `${dt()}__steam-list_v2`,
        async () => {
            const data = await fetchJson<
                { applist: { apps: {appid: num; name: str;}[] } }
            >(`http://api.steampowered.com/ISteamApps/GetAppList/v0002/?format=json`);

            return data.applist.apps;
    }),

    // https://store.steampowered.com/api/appdetails?appids=10
    getDetails: (id: str | num) => cachedData(
        `${dt()}__steam-details__ID-${id}_v1`,
        () => fetchJson(`https://store.steampowered.com/api/appdetails?appids=${id}`)
    ),

    // https://store.steampowered.com/appreviews/10?json=1
    getReviews: (id: str | num) => cachedData(
        `${dt()}__steam-reviews__ID-${id}_v1`,
        () => fetchJson(`https://store.steampowered.com/api/appdetails?appids=${id}`)
    ),

    // https://store.steampowered.com/app/10
    getLink: (id: str | num) => `https://store.steampowered.com/app/${id}`,

    getSearch: (term: str) => cachedData(`steam-reviews__(${term.replace(/\W/g, '-').trim()})_v1`, async () => {
        const res = await fetch(`https://store.steampowered.com/search/?term=${term}`);
        const htmlText = await res.text();

        const html = new DOMParser().parseFromString(htmlText, 'text/html');
        const searchRows = html.getElementById('search_resultsRows');
        if (!searchRows) throw 'Failed to load html: ( #search_resultsRows )';

        const elms = [...searchRows.querySelectorAll('a')];
        return elms.map(a => {
            const href = a.getAttribute('href');
            const id = Number(href?.split('/app/')[1]?.split('/')[0]) || null;
            const img = a.querySelector('img')?.getAttribute('src') || null;
            const title = a.querySelector('.title')?.innerText || null;
            let reviews = a.querySelector('.search_review_summary')?.getAttribute('data-tooltip-html') || null;
            if (reviews) reviews = reviews.replace('<br>', '\n\n');

            return { img, title, href, reviews, id };
        });
    }),
}