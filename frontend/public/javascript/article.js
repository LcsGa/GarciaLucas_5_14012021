const main = document.querySelector("main");
const articleId = new URL(location.href).searchParams.get("id");
let article;
let price;

const options = () => {
  const options = article.lenses;
  return options.map((lense) => {
    return `<option>${lense}</option>`;
  });
};

const displayArticle = () => {
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
          <label for="option">Option</label>
          <select id="option">
            ${options()}
          </select>
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
          <p class="article-price">${(article.price / 100).toFixed(2)} €</p>
        </div>
        <div class="btn-container">
          <button class="btn btn-primary"><i class="fas fa-cart-plus"></i> Ajouter</button>
          <button class="btn btn-danger" type="button">Annuler</button>
        </div>
      </form>
    </figcaption>`;
  main.innerHTML = "";
  main.appendChild(articleDOM);
};

const fetchArticle = async () => {
  try {
    const response = await fetch(`${location.origin}/api/cameras/${articleId}`);
    article = await response.json();
    price = article.price / 100;
    displayArticle();
    return new Promise((resolve) => {
      resolve();
    });
  } catch (e) {
    console.error(e);
    return new Promise((resolve, reject) => {
      reject(
        "Une erreur est survenue : L'article séléctionné n'a pas correctement été récupéré.\n\nVérifier l'état de la requête dans la partie 'Network' de l'outil de développeur."
      );
    });
  }
};

//_________________________________________________________________________________
fetchArticle()
  .then(() => {
    const quantityBtn = document.querySelectorAll(".btn-quantity");
    const quantity = document.querySelector("#quantity");
    const articlePrice = document.querySelector(".article-price");

    const fixQuantity = () => {
      if (+quantity.value < +quantity.min) {
        quantity.value = quantity.min;
      }
      if (+quantity.value > +quantity.max) {
        quantity.value = quantity.max;
      }
    };

    const updatePrice = () => {
      fixQuantity();
      articlePrice.innerHTML = (price * +quantity.value).toFixed(2) + " €";
    };

    const modifyValue = (value) => {
      if (
        +quantity.value < +quantity.min ||
        (quantity.value === quantity.min && value === quantity.min)
      ) {
        quantity.value = quantity.min;
      } else if (
        +quantity.value > +quantity.max ||
        (quantity.value === quantity.max && value === quantity.max)
      ) {
        quantity.value = quantity.max;
      } else if (value === quantity.min) {
        quantity.value--;
      } else {
        quantity.value++;
      }
      quantity.dispatchEvent(new Event("change"));
    };

    quantity.addEventListener("change", updatePrice);

    quantityBtn.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        if (btn.classList.contains("quantity-remove")) {
          modifyValue(quantity.min);
        } else {
          modifyValue(quantity.max);
        }
      });
    });
  })
  .catch((e) => console.error(e));
