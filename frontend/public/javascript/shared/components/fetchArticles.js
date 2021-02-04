import { price } from "../utils/price.js";

export const fetchArticles = async (callbackfn, articleId = "") => {
  try {
    const response = await fetch(`${location.origin}/api/cameras/${articleId}`);
    const articles = [await response.json()].flat(); // flattend for the situation when only one article is returned
    const prices = [];
    for (const article of articles) {
      prices.push(price(article.price));
    }
    callbackfn(articles, prices);
  } catch (e) {
    console.error(e);
  }
};
