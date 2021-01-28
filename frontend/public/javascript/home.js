const galleryContainer = document.querySelector(".gallery-container");
let articles;

const displayArticles = () => {
  const articlesDOM = articles.map((article, index) => {
    const price = {
      integer: (article.price / 100).toFixed(0),
      decimal: function () {
        const decimal = article.price - this.integer * 100;
        return decimal === 0 ? "00" : decimal;
      },
    };
    const articleDOM = document.createElement("section");
    articleDOM.setAttribute("data-scroll-section", "");
    articleDOM.innerHTML = `
      <div class="gallery-item${
        index === 0
          ? " first-item"
          : index === articles.length - 1
          ? " last-item"
          : ""
      }">
        <a href="/article?id=${article._id}">
          <figure>
            <div class="article-img">
              <img src="${article.imageUrl}" alt="Appareil photo" />
            </div>
            <figcaption>
              <header>
                <h3 class="name">${article.name}</h3>
                <p>${price.integer}€<sup>${price.decimal()}</sup></p>
              </header>
              <p class="article-id"> Réf. ${article._id}</p>
            </figcaption>
          </figure>
        </a>
      </div>`;
    return articleDOM;
  });
  galleryContainer.innerHTML = "";
  galleryContainer.append(...articlesDOM);
};

const fetchArticles = async () => {
  try {
    const response = await fetch(`${location.origin}/api/cameras`);
    articles = await response.json();
    displayArticles();
  } catch (e) {
    console.error(e);
  }
};

fetchArticles();
