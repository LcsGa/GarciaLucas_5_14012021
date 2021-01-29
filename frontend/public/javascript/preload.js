const body = document.querySelector("body");
const articleNbDOM = document.querySelector(".article-nb ");

document.addEventListener("DOMContentLoaded", body.classList.remove("preload"));

const articleNB = Object.values(localStorage).reduce((acc, item) => {
  acc += JSON.parse(item).quantity;
  return acc;
}, 0);

articleNbDOM.innerHTML = articleNB;
