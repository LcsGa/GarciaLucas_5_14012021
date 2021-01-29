import { fetchArticles } from "./fetchArticles.js";

const main = document.querySelector("main");
let quantityBtn, quantityDOM, lenseDOM, articlePriceDOM, formBtns;
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
        <h2 class="article-name">${article.name}</h2>
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
            <input id="quantity" type="number" min="1" max="10" value="1">
            <button class="btn btn-quantity quantity-add" type="button">
              <i class="fas fa-plus"></i>
            </button>
          </div>
        </div>
        <div class="group">
          <p class="article-price">${price.integer}€<sup>${
    price.decimal
  }</sup></p>
        </div>
        <div class="btn-container">
          <button class="btn btn-primary" type="button"><i class="fas fa-cart-plus"></i> Ajouter</button>
          <button class="btn btn-danger" type="button">Annuler</button>
        </div>
      </form>
    </figcaption>`;
  main.innerHTML = "";
  main.appendChild(articleDOM);
};

//_________________________________________________________________________________
fetchArticles(displayArticle, articleId)
  .then(() => {
    quantityBtn = document.querySelectorAll(".btn-quantity");
    quantityDOM = document.querySelector("#quantity");
    lenseDOM = document.querySelector("#lense");
    articlePriceDOM = document.querySelector(".article-price");
    formBtns = document.querySelectorAll(".btn-container button");
    const [addToCartBtn, cancelBtn] = formBtns;

    const modifyValue = (value) => {
      if (
        +quantityDOM.value < +quantityDOM.min ||
        (+quantityDOM.value === +quantityDOM.min && value === +quantityDOM.min)
      ) {
        quantityDOM.value = quantityDOM.min;
      } else if (
        +quantityDOM.value > +quantityDOM.max ||
        (+quantityDOM.value === +quantityDOM.max && value === +quantityDOM.max)
      ) {
        quantityDOM.value = quantityDOM.max;
      } else if (value === +quantityDOM.min) {
        +quantityDOM.value--;
      } else {
        +quantityDOM.value++;
      }
      quantityDOM.dispatchEvent(new Event("change"));
    };

    const fixQuantity = () => {
      if (+quantityDOM.value < +quantityDOM.min) {
        quantityDOM.value = quantityDOM.min;
      }
      if (+quantityDOM.value > +quantityDOM.max) {
        quantityDOM.value = quantityDOM.max;
      }
    };

    const updatePrice = () => {
      fixQuantity();
      price.double = (article.price / 100) * +quantityDOM.value;
      articlePriceDOM.innerHTML = `${price.integer}€<sup>${price.decimal}</sup>`;
    };

    quantityDOM.addEventListener("change", updatePrice);

    quantityBtn.forEach((btn) => {
      btn.addEventListener("click", () => {
        if (btn.classList.contains("quantity-remove")) {
          modifyValue(+quantityDOM.min);
        } else {
          modifyValue(+quantityDOM.max);
        }
      });
    });

    addToCartBtn.addEventListener("click", () => {
      let item;
      // const itemName = `${article.name}-${lenseDOM.value}`;
      if (localStorage[article.name]) {
        item = JSON.parse(localStorage[article.name]);
        // TODO Ajouter nouvel item si lense différente ?
        if (item.lense !== lenseDOM.value) item.lense = lenseDOM.value;
        const newQuantity = item.quantity + +quantityDOM.value;
        item.quantity =
          newQuantity <= +quantityDOM.max ? newQuantity : +quantityDOM.max;
      } else {
        item = {
          id: article._id,
          lense: lenseDOM.value,
          quantity: +quantityDOM.value,
        };
      }
      item.price = item.quantity * article.price;
      localStorage.setItem(article.name, JSON.stringify(item));
      location.reload();
      //TODO popup
      const limitExceeded =
        +quantityDOM.value + item.quantity > 10 ? true : false;
      alert(
        `Vous avez ajouté ${+quantityDOM.value} ${
          +quantityDOM.value > 1 ? "articles" : "articles"
        } avec l'option <${item.lense}>
        
          Vous en avez désormais ${item.quantity} dans votre panier !`
      );
    });

    cancelBtn.addEventListener("click", () => history.back());
  })
  .catch((e) => {
    console.error(e);
  });
