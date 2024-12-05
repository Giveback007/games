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
}