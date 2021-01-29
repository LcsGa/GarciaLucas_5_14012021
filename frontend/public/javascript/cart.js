import { fetchArticles } from "./fetchArticles.js";

const articleDOM = document.querySelector("article");
const items = Object.values(localStorage).map((item) => JSON.parse(item));

const displayItems = (articles, prices) => {
  const [article, price] = [...articles, ...prices];
  const item = JSON.parse(localStorage.getItem(article.name));
  const itemDOM = document.createElement("div");
  itemDOM.classList.add("cart-item");
  itemDOM.innerHTML = `<figure>
    <div class="article-img">
      <img src="${article.imageUrl}" alt="Appareil photo">
    </div>
    <button class="btn btn-delete">
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
            <input id="quantity" type="number" min="1" max="10" value="${item.quantity}">
            <button class="btn btn-quantity quantity-add" type="button">
              <i class="fas fa-plus"></i>
            </button>
          </div>
        </div>
        <div class="group">
          <p class="article-price">${price.integer}€<sup>${price.decimal}</sup></p>
        </div>
      </form>
    </figcaption>
  </figure>`;
  articleDOM.appendChild(itemDOM);
};

items.forEach((item) => {
  fetchArticles(displayItems, item.id);
});
