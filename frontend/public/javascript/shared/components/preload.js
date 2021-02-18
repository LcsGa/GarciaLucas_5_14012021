import { getItemVariants } from "../utils/itemVariants.js";
const body = document.querySelector("body");
const articleNbDOM = document.querySelector(".article-nb ");

// Prevent the element from transitioning on the page loading.
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
