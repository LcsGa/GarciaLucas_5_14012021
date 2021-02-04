import { getItemVariants } from "../utils/price.js";
const body = document.querySelector("body");
const articleNbDOM = document.querySelector(".article-nb ");

document.addEventListener("DOMContentLoaded", body.classList.remove("preload"));

export const updateArticleNb = () => {
  const itemVariants = getItemVariants();
  const articleNB = itemVariants.reduce((acc, variant) => {
    acc += variant.quantity;
    return acc;
  }, 0);

  articleNbDOM.innerHTML = articleNB;
};
updateArticleNb();
