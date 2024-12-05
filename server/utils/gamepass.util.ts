import { cachedData, fetchJson, dt } from "./util.ts";

export const getImgObj = (x: Image) => ({
    src: x.Uri.replace('//store-images', 'http://store-images'),
    width: x.Width,
    height: x.Height,
    type: x.ImagePurpose,
})

export const gamepassData = {
    onlineIds: () => cachedData(
        `${dt()}__games-pass-ids_v1`,
        async () => {
            const getUrl = (id: string) => `https://catalog.gamepass.com/sigls/v2?id=${id}&language=en-us&market=US`

            const [
                [,...allGames],
                [,...pcGames],
                [,...consoleGames],
                [,...touchGames],
            ] = await Promise.all([
                fetchJson<{id: string}[]>(getUrl("29a81209-df6f-41fd-a528-2ae6b91f719c")), // all
                fetchJson<{id: string}[]>(getUrl("fdd9e2a7-0fee-49f6-ad69-4354098401ff")), // pc
                fetchJson<{id: string}[]>(getUrl("f6f1f99f-9b49-4ccd-b3bf-4d9767a77f5e")), // console
                fetchJson<{id: string}[]>(getUrl("7d8e8d56-c02f-4711-afec-73a80d8e9261")), // touch
            ]);

            const data: Dict<{
                id:         str;
                pc?:        bol;
                console?:   bol;
                touch?:     bol;
            }> = {};
            allGames.forEach(x => data[x.id] = x);

            pcGames.forEach(({id}) => {
                if (!data[id]) data[id] = { id }
                data[id].pc = true;
            });

            consoleGames.forEach(({id}) => {
                if (!data[id]) data[id] = { id }
                data[id].console = true;
            });

            touchGames.forEach(({id}) => {
                if (!data[id]) data[id] = { id }
                data[id].touch = true;
            });

            return data;
    }),

    data: () => cachedData(
        `${dt()}__gamepass-data_v1`,
        async (): Promise<_Game[]> => {
            const idDict = await gamepassData.onlineIds();
            const ids = Object.keys(idDict).join(',');

            const data = await fetchJson<
                { Products: GamePassItem[] }
            >(`https://displaycatalog.mp.microsoft.com/v7.0/products?bigIds=${ids}&market=US&languages=en-us&MS-CV=DGU1mcuYo0WMMp+F.1`);

            return data.Products.map(({
                ProductId,
                DisplaySkuAvailabilities: [{Sku}],
                Properties,
                LocalizedProperties,
            }) => {
                const {
                    ProductDescription,
                    ProductTitle,
                    Images,
                    ShortDescription,
                } = LocalizedProperties[0];
                const o = idDict[ProductId];

                if (!o || !Sku || !Sku.LocalizedProperties.length) throw 'No data!';

                const imgLogo = Images.find(x => x.ImagePurpose === 'Logo');
                const imgVertArt = Images.find(x => x.ImagePurpose === 'BrandedKeyArt');

                return {
                    ...o,
                    title: ProductTitle,
                    xboxId: ProductId,
                    categories: Properties.Categories?.length ? Properties.Categories : [Properties.Category],
                    description: ProductDescription,
                    shortDescription: ShortDescription,
                    imgLogo: imgLogo ? getImgObj(imgLogo) : null,
                    imgVertArt: imgVertArt ? getImgObj(imgVertArt) : null,
                    images: Images.map(getImgObj),
                }
            });
    }),
}