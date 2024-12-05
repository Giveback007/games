export function toGameData(g: _Game, steam?: Steam | null): Game {
    let { steam: _steam } = g;
    steam = steam || _steam;

    const review = (steam?.reviews || '').split(' user reviews for ')[0]!;
    const [_, nOfReviewsStr] = review.split(' of the ')//
    const prcPos = _ ? Number(_.split('\n\n')[1]?.replace('%', '')) : undefined;
    const nOfPosRevs = nOfReviewsStr ? Number(nOfReviewsStr.replaceAll(',', '') ): undefined;
    const nOfReviews = nOfPosRevs ? Math.floor(nOfPosRevs / (prcPos as num) * 100) : undefined

    const popularity = nOfReviews ? Number((nOfReviews / 1000).toFixed(1)) : undefined;
    return { ...g, prcPos, nOfReviews, nOfPosRevs, popularityK: popularity, steam, steamId: steam?.id || null };
}