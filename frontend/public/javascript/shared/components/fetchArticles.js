import { price } from "../utils/price.js";

// Gets the list of articles (or only one specific article) from the database and invokes callback function passed as an argument
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

// Postq the list of articles bought with the customer informations and return the response (containing the order number)
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
