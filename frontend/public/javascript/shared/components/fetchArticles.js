import { price } from "../utils/price.js";

const fetchArticles = async (callbackfn, articleId = "") => {
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

const order = async (contact, products) => {
  try {
    const response = await fetch(`${location.origin}/api/cameras/order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contact,
        products,
      }),
    });
    return response;
  } catch (e) {
    console.error(e);
  }
};

export { fetchArticles, order };
