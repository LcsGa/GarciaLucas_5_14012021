import { fetchArticles } from "./shared/components/fetchArticles.js";
import { formatPrice, updatePrice } from "./shared/utils/price.js";
import { modifyQuantityHandler } from "./shared/utils/quantity.js";
import { getVariantIndex, addToCart } from "./shared/components/addToCart.js";
import { DialogBox } from "./shared/components/Dialog.js";
import { updateArticleNb } from "./shared/components/preload.js";
import { informationBox } from "./shared/components/informationBox.js";

const container = document.querySelector("#container");
const main = document.querySelector("main");
const dialogContainer = document.querySelector(".dialog-container");
const articleId = new URL(location.href).searchParams.get("id");
let article, price;

const options = (article) => {
  const options = article.lenses;
  return options.map((lense) => {
    return `<option>${lense}</option>`;
  });
};

const displayArticle = (articles, prices) => {
  [article, price] = [...articles, ...prices];
  const articleDOM = document.createElement("figure");
  articleDOM.classList.add("article");
  articleDOM.innerHTML = `
    <div class="article-img">
      <img src="${article.imageUrl}" alt="Appareil photo">
    </div>
    <figcaption>
      <header>
        <h2 class="article-name title-accent">${article.name}</h2>
        <p class="article-id">Réf. ${article._id}</p>
      </header>
      <form>
        <div class="group">
          <p class="label">Description du produit</p>
          <p class="article-description">${article.description}</p>
        </div>
        <div class="group">
          <label>Option</label>
          <select id="lense">${options(article)}</select>
        </div>
        <div class="group">
          <label for="quantity">Quantité</label>
          <div class="row">
            <button class="btn btn-quantity quantity-remove" type="button">
              <i class="fas fa-minus"></i>
            </button>
            <input id="quantity" type="number" min="1" max="10" value="1" readonly>
            <button class="btn btn-quantity quantity-add" type="button">
              <i class="fas fa-plus"></i>
            </button>
          </div>
        </div>
        <div class="group">
          <p class="article-price">${formatPrice(price.double * 100)}</p>
        </div>
        <div class="btn-container">
          <button class="btn btn-primary" type="button"><i class="fas fa-cart-plus"></i> Ajouter</button>
          <button class="btn btn-danger" type="button">Quitter</button>
        </div>
      </form>
    </figcaption>`;
  main.innerHTML = "";
  main.appendChild(articleDOM);
};

//_________________________________________________________________________________
fetchArticles(displayArticle, articleId)
  .then(() => {
    const quantityBtn = document.querySelectorAll(".btn-quantity");
    const quantityDOM = document.querySelector("#quantity");
    const lenseDOM = document.querySelector("#lense");
    const articlePriceDOM = document.querySelector(".article-price");
    const formBtns = document.querySelectorAll(".btn-container button");
    const [addToCartBtn, cancelBtn] = formBtns;

    quantityDOM.addEventListener("change", () =>
      updatePrice(quantityDOM, articlePriceDOM, article.price)
    );

    quantityBtn.forEach((btn) => {
      btn.addEventListener("click", () => {
        modifyQuantityHandler(btn, quantityDOM);
      });
    });

    addToCartBtn.addEventListener("click", () => {
      const quantity = +quantityDOM.value;
      const item = addToCart(article, lenseDOM.value, quantity, quantityDOM);
      updateArticleNb();

      const isQuantityExceeded =
        +quantityDOM.value +
          item.variants[getVariantIndex(item, lenseDOM.value)].quantity >
        +quantityDOM.max;

      new DialogBox(
        container,
        {
          type: "h2",
          content: isQuantityExceeded
            ? "Ajout effectué mais..."
            : "Ajout effectué",
        },
        {
          primary: {
            link: "/cart",
            content: "Voir le panier",
          },
          danger: {
            link: "",
            content: "Retour",
          },
        },
        `Vous avez ajouté <strong>${+quantityDOM.value} ${
          +quantityDOM.value > 1 ? "articles" : "article"
        }</strong> avec l'option "<strong>${lenseDOM.value}</strong>"`,
        `Vous en avez désormais <strong>${
          item.variants[getVariantIndex(item, lenseDOM.value)].quantity
        }</strong> dans votre panier ${
          isQuantityExceeded ? "(car il s'agit de la quantité maximum) " : ""
        }!`
      );
    });

    cancelBtn.addEventListener("click", () => history.back());
  })
  .catch((e) => {
    console.error(e);
    informationBox(
      "images/undraw_page_not_found_su7k.svg",
      "Oups !",
      "Nous n'avons trouvé aucun article à afficher...",
      "Retourner à l'accueil",
      main
    );
  });
