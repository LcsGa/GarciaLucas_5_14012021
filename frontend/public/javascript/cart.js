import { fetchArticles, price } from "./fetchArticles.js";

const articleDOM = document.querySelector("article");
const totalPriceDOM = document.querySelector("#total-price");
const threeTimesPriceDOM = document.querySelector("#three-times-price");
let deleteBtns, totalPrice, threeTimesPrice;
const items = Object.values(localStorage).map((item) => JSON.parse(item));

const displayItems = (articles) => {
  const article = articles[0];
  const item = JSON.parse(localStorage.getItem(article.name));
  const itemDOM = document.createElement("div");
  itemDOM.classList.add("cart-item");
  itemDOM.innerHTML = `<figure data-name="${article.name}">
    <div class="article-img">
      <img src="${article.imageUrl}" alt="Appareil photo">
    </div>
    <button class="btn btn-delete" data-name="${article.name}">
      <i class="fas fa-trash-alt"></i>
    </button>
    <figcaption>
      <header>
        <h2 class="article-name">${article.name}</h2>
        <p class="article-id">Réf. ${article._id}</p>
      </header>
      <form>
        <div class="group">
          <label for="option">Option</label>
          <select type="text">
            <option>${item.lense}</option>
          </select>
        </div>
        <div class="group">
          <label for="quantity">Quantité</label>
          <div class="row">
            <button class="btn btn-quantity quantity-remove" type="button">
              <i class="fas fa-minus"></i>
            </button>
            <input id="quantity" type="number" min="1" max="10" value="${
              item.quantity
            }">
            <button class="btn btn-quantity quantity-add" type="button">
              <i class="fas fa-plus"></i>
            </button>
          </div>
        </div>
        <div class="group">
          <p class="article-price">${price(item.price).integer}€<sup>${
    price(item.price).decimal
  }</sup></p>
        </div>
      </form>
    </figcaption>
  </figure>`;
  articleDOM.insertAdjacentElement("afterbegin", itemDOM);
};

items.forEach(async (item, i) => {
  try {
    await fetchArticles(displayItems, item.id)
      .then(() => {
        // The if statement below is used to verify if all the articles are completely loaded
        if (i === items.length - 1) {
          deleteBtns = document.querySelectorAll(".btn-delete");
          totalPrice = items.reduce((acc, item) => {
            acc += item.price;
            return acc;
          }, 0);
          threeTimesPrice = (1000 + totalPrice) / 3; // 1000 cents => 10 € administrative fees
          console.log(threeTimesPrice);

          totalPriceDOM.innerHTML = `${price(totalPrice).integer}€<sup>${
            price(totalPrice).decimal
          }</sup>`;

          threeTimesPriceDOM.innerHTML = `${
            price(threeTimesPrice).integer
          }€<sup>${price(threeTimesPrice).decimal}</sup>`;

          deleteBtns.forEach((btn) => {
            btn.addEventListener("click", () => {
              const confirmDeletion = confirm(
                "Etes vous sûr de vouloir supprimer cet article ?"
              );
              if (confirmDeletion) {
                localStorage.removeItem(btn.dataset.name);
                location.reload();
              }
            });
          });
        }
      })
      .catch((e) => console.error(e));
  } catch (e) {
    console.error(e);
  }
});
