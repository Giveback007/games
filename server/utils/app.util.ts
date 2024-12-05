import { gamepassData } from "./gamepass.util.ts";
import { rand } from "./num.util.ts";
import { steamData } from "./steamgames.util.ts";
import { wait } from "./util.ts";

const log = console.log;

const nm = (n: str) => {
    let x = n.toLocaleLowerCase();
    [
        'for xbox one',
        'for xbox series x|s',
        'xbox one edition',
        'xbox one',
        'xbox series x|s',
        'xbox',
        ' for windows 10',
        ' for windows',
        '(windows)',
    ].forEach(r => x = x.replace(r, ''));

    return x.replace(/\W/g, ' ').trim();
};

export const getSteamAndPassData = () => Promise.all([
    gamepassData.data(),
    steamData.fullList(),
]);

export async function getAllGameData(useCache = true) {
    const [ _pass, _steam ] = await getSteamAndPassData();
    const steamSet = new Map(_steam.map(x => [nm(x.name), x]));

    let n = 0;
    let nOfSteam = 0;
    let toLoad = 0;
    const data = await Promise.all(_pass.map(async (g) => {
        const searchName = nm(g.title);

        let steamId = steamSet.get(searchName)?.appid || null;

        let steamSearch: {
            img: string | null;
            title: string | null;
            href: string | null;
            reviews: string | null;
            id: number | null;
        }[] | null = null

        if (useCache && steamData.isCachedSearch(searchName)) {
            steamSearch = await steamData.getSearch(searchName, true);
        } else {
            await wait(rand(1500, 2500) * ++toLoad);

            let tries = 0;
            while (!steamSearch) {
                try {
                    steamSearch = await steamData.getSearch(searchName, false);
                } catch(err) {
                    const waitTime = ++tries * 30_000;
                    log('Wait:', waitTime, err, g.title)
                    await wait(waitTime)
                }
            }
        }

        let steam = steamId && steamSearch ? steamSearch.find(y => y.id && y.id === steamId) || null : null;
        if (!steam && steamSearch) steam = steamSearch.find(x =>
            x.title && (x.title.replaceAll('®', '') === g.title.replaceAll('®', ''))) || null;

        if (steam) nOfSteam++;
        else steamId = null;

        log(`${(++n + '').padStart(3, '0')}/${_pass.length}: ${steamId ? '✅' : '❌'} ${g.title}`);
        return { ...g, steamId, steam: steam, steamSearch };
    }));

    log(`Steam Games Matched: ${nOfSteam}/${data.length}`);
    return data;
}