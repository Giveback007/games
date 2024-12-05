type Game = {
    nOfReviews?: number;
    nOfPosRevs?: number;
    prcPos?: number;
    popularityK?: number;
} & _Game;

type ImgObj = {
    src: string;
    width: number;
    height: number;
    type: string;
}

type _Game = {
    title: string;
    xboxId: string;
    categories: string[];
    description: string;
    shortDescription: string;
    id: str;
    pc?: bol;
    console?: bol;
    touch?: bol;
    imgLogo: ImgObj | null;
    imgVertArt: ImgObj | null;
    images: ImgObj[];
    steamId:          number | null;
    steam:            Steam | null;
    steamSearch:      Steam[];
}

interface Steam {
    img:     string;
    title:   string;
    href:    string;
    reviews: null | string;
    id:      number | null;
}