import { fetchArticles } from "./shared/components/fetchArticles.js";
import {
  formatPrice,
  updatePrice,
  actualizeTotalPrices,
} from "./shared/utils/price.js";
import { modifyQuantityHandler } from "./shared/utils/quantity.js";
import { addToCart } from "./shared/components/addToCart.js";
import { updateArticleNb } from "./shared/components/preload.js";
import { informationBox } from "./shared/components/informationBox.js";

const articleDOM = document.querySelector("article");
const totalPriceDOM = document.querySelector("#total-price");
const threeTimesPriceDOM = document.querySelector("#three-times-price");
const emptyCartDOM = document.querySelector("#empty-cart");
const cartContentDOM = document.querySelector("#cart-content");
const items = Object.values(localStorage).map((item) => JSON.parse(item));

const displayCartContent = () => {
  cartContentDOM.classList.remove("hidden");
};

const displayItems = (articles) => {
  displayCartContent();
  const article = articles[0];
  const item = JSON.parse(localStorage.getItem(article.name));
  item.variants.forEach((variant) => {
    const itemDOM = document.createElement("div");
    itemDOM.classList.add("cart-item");
    itemDOM.innerHTML = `<figure  data-name="${article.name}" 
                                  data-lense="${variant.lense}">
      <div class="article-img">
        <img src="${article.imageUrl}" alt="Appareil photo">
      </div>
      <figcaption>
        <button class="btn btn-delete" 
              data-name="${article.name}" 
              data-lense="${variant.lense}">
          <i class="fas fa-trash-alt"></i>
        </button>
        <header>
          <h2 class="article-name">${article.name}</h2>
          <p class="article-id">Réf. ${article._id}</p>
        </header>
        <form>
          <div class="group">
            <label>Option</label>
            <input  class="chosen-lense" 
                    type="text" 
                    value="${variant.lense}" 
                    readonly/>
          </div>
          <div class="group">
            <label for="quantity-${article._id}">Quantité</label>
            <div class="row">
              <button class="btn btn-quantity quantity-remove" type="button">
                <i class="fas fa-minus"></i>
              </button>
              <input  id="quantity-${article._id}" 
                      class="quantity" 
                      type="number" 
                      min="1" 
                      max="10" 
                      value="${variant.quantity}" 
                      readonly/>
              <button class="btn btn-quantity quantity-add" type="button">
                <i class="fas fa-plus"></i>
              </button>
            </div>
          </div>
          <div class="group">
            <p class="article-price">${formatPrice(variant.totalPrice)}</p>
          </div>
        </form>
      </figcaption>
    </figure>`;
    articleDOM.insertAdjacentElement("afterbegin", itemDOM);
  });
};

items.forEach(async (item, i) => {
  try {
    await fetchArticles(displayItems, item.id);

    // The if statement below is used to verify if all the articles are completely loaded
    if (i === items.length - 1) {
      const deleteBtns = document.querySelectorAll(".btn-delete");
      const itemsDOM = document.querySelectorAll(".cart-item");

      actualizeTotalPrices(totalPriceDOM, threeTimesPriceDOM);

      const removeVariant = (articleName, variantToDelete) => {
        const item = JSON.parse(localStorage.getItem(articleName));
        localStorage.removeItem(articleName);
        const variants = item.variants;
        item.variants = [];
        variants.forEach((variant) => {
          variant.lense !== variantToDelete && item.variants.push(variant);
        });
        item.variants.length &&
          localStorage.setItem(articleName, JSON.stringify(item));
      };

      deleteBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
          const confirmDeletion = confirm(
            "Etes vous sûr de vouloir supprimer cet article ?"
          );
          if (confirmDeletion) {
            removeVariant(btn.dataset.name, btn.dataset.lense);
            location.reload();
          }
        });
      });

      itemsDOM.forEach((itemDOM) => {
        const itemQuantityDOM = itemDOM.querySelector(".quantity");
        const quantityBtn = itemDOM.querySelectorAll(".btn-quantity");
        let quantity;
        const articlePriceDOM = itemDOM.querySelector(".article-price");
        const chosenLense = itemDOM.querySelector(".chosen-lense");
        const article = { name: itemDOM.firstChild.dataset.name };
        const localStorageItem = localStorage.getItem(article.name);
        const item = JSON.parse(localStorageItem);

        article._id = item.id;
        article.price = item.price;

        itemQuantityDOM.addEventListener("change", () => {
          addToCart(article, chosenLense.value, quantity, itemQuantityDOM);
          updatePrice(itemQuantityDOM, articlePriceDOM, article.price);
          updateArticleNb();
          actualizeTotalPrices(totalPriceDOM, threeTimesPriceDOM);
        });

        quantityBtn.forEach((btn) => {
          btn.addEventListener("click", () => {
            quantity = btn.classList.contains("quantity-remove") ? -1 : 1;
            modifyQuantityHandler(btn, itemQuantityDOM);
          });
        });
      });
    }
  } catch (e) {
    console.error(e);
  }
});

if (!localStorage.length) {
  informationBox(
    "images/undraw_empty_xct9.svg",
    "Votre panier est vide",
    "Il semblerait que vous n'ayez pas encore fait votre choix...",
    "Poursuivre vos achats",
    main
  );
}
