import { fetchArticles, price } from "./fetchArticles.js";
import { itemVariants } from "./services.js";

const articleDOM = document.querySelector("article");
const totalPriceDOM = document.querySelector("#total-price");
const threeTimesPriceDOM = document.querySelector("#three-times-price");
const emptyCartDOM = document.querySelector("#empty-cart");
const cartContentDOM = document.querySelector("#cart-content");
const items = Object.values(localStorage).map((item) => JSON.parse(item));

const displayCartContent = () => {
  emptyCartDOM.classList.add("hidden");
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
      <button class="btn btn-delete" 
              data-name="${article.name}" 
              data-lense="${variant.lense}">
        <i class="fas fa-trash-alt"></i>
      </button>
      <figcaption>
        <header>
          <h2 class="article-name">${article.name}</h2>
          <p class="article-id">Réf. ${article._id}</p>
        </header>
        <form>
          <div class="group">
            <label>Option</label>
            <input type="text" value="${variant.lense}" readonly/>
          </div>
          <div class="group">
            <label for="quantity-${article._id}">Quantité</label>
            <div class="row">
              <button class="btn btn-quantity quantity-remove" type="button">
                <i class="fas fa-minus"></i>
              </button>
              <input id="quantity-${
                article._id
              }" class="quantity" type="number" min="1" max="10" value="${
      variant.quantity
    }"/>
              <button class="btn btn-quantity quantity-add" type="button">
                <i class="fas fa-plus"></i>
              </button>
            </div>
          </div>
          <div class="group">
            <p class="article-price">${
              price(variant.totalPrice).integer
            }€<sup>${price(variant.totalPrice).decimal}</sup></p>
          </div>
        </form>
      </figcaption>
    </figure>`;
    articleDOM.insertAdjacentElement("afterbegin", itemDOM);
  });
};

items.forEach(async (item, i) => {
  try {
    await fetchArticles(displayItems, item.id)
      .then(() => {
        // The if statement below is used to verify if all the articles are completely loaded
        if (i === items.length - 1) {
          const deleteBtns = document.querySelectorAll(".btn-delete");
          const itemsDOM = document.querySelectorAll(".cart-item");
          const totalPrice = itemVariants.reduce((acc, item) => {
            acc += item.totalPrice;
            return acc;
          }, 0);
          const threeTimesPrice = (1000 + totalPrice) / 3; // 1000 cents => 10 € administrative fees

          totalPriceDOM.innerHTML = `${price(totalPrice).integer}€<sup>${
            price(totalPrice).decimal
          }</sup>`;

          threeTimesPriceDOM.innerHTML = `${
            price(threeTimesPrice).integer
          }€<sup>${price(threeTimesPrice).decimal}</sup>`;

          const removeVariant = (articleName, variantToDelete) => {
            const item = JSON.parse(localStorage.getItem(articleName));
            localStorage.removeItem(articleName);
            const variants = item.variants;
            item.variants = [];
            variants.forEach((variant) => {
              if (variant.lense !== variantToDelete) {
                item.variants.push(variant);
              }
            });
            if (item.variants.length) {
              localStorage.setItem(articleName, JSON.stringify(item));
            }
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
            //TODO : REPETITION from article.js
            const itemQuantityDOM = itemDOM.querySelector(".quantity");
            const quantityBtn = itemDOM.querySelectorAll(".btn-quantity");

            const modifyValue = (value) => {
              if (
                +itemQuantityDOM.value < +itemQuantityDOM.min ||
                (+itemQuantityDOM.value === +itemQuantityDOM.min &&
                  value === +itemQuantityDOM.min)
              ) {
                itemQuantityDOM.value = itemQuantityDOM.min;
              } else if (
                +itemQuantityDOM.value > +itemQuantityDOM.max ||
                (+itemQuantityDOM.value === +itemQuantityDOM.max &&
                  value === +itemQuantityDOM.max)
              ) {
                itemQuantityDOM.value = itemQuantityDOM.max;
              } else if (value === +itemQuantityDOM.min) {
                +itemQuantityDOM.value--;
              } else {
                +itemQuantityDOM.value++;
              }
              itemQuantityDOM.dispatchEvent(new Event("change"));
            };

            const fixQuantity = () => {
              if (+itemQuantityDOM.value < +itemQuantityDOM.min) {
                itemQuantityDOM.value = itemQuantityDOM.min;
              }
              if (+itemQuantityDOM.value > +itemQuantityDOM.max) {
                itemQuantityDOM.value = itemQuantityDOM.max;
              }
            };

            const updatePrice = () => {
              fixQuantity();
              // price.double = (article.price / 100) * +itemQuantityDOM.value;
              // articlePriceDOM.innerHTML = `${price.integer}€<sup>${price.decimal}</sup>`;
            };

            itemQuantityDOM.addEventListener("change", updatePrice);

            quantityBtn.forEach((btn) => {
              btn.addEventListener("click", () => {
                if (btn.classList.contains("quantity-remove")) {
                  modifyValue(+itemQuantityDOM.min);
                } else {
                  modifyValue(+itemQuantityDOM.max);
                }
              });
            });
          });
        }
      })
      .catch((e) => console.error(e));
  } catch (e) {
    console.error(e);
  }
});
