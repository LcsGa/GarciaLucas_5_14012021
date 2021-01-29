export const fetchArticles = async (callbackfn, articleId = "") => {
  try {
    const response = await fetch(`${location.origin}/api/cameras/${articleId}`);
    const articles = [await response.json()].flat(); // flattend for the situation when only one article is returned
    const prices = [];
    for (const article of articles) {
      prices.push({
        double: (article.price / 100).toFixed(2),
        get integer() {
          return Math.trunc(this.double);
        },
        get decimal() {
          const decimal = (this.double - this.integer) * 100;
          return decimal === 0 ? "00" : decimal;
        },
      });
    }
    callbackfn(articles, prices);
  } catch (e) {
    console.error(e);
  }
};
