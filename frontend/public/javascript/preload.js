import { itemVariants } from "./services.js";

const body = document.querySelector("body");
const articleNbDOM = document.querySelector(".article-nb ");

document.addEventListener("DOMContentLoaded", body.classList.remove("preload"));

const articleNB = itemVariants.reduce((acc, variant) => {
  acc += variant.quantity;
  return acc;
}, 0);

articleNbDOM.innerHTML = articleNB;
