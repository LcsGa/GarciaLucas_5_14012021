import { fetchArticles } from "./shared/components/fetchArticles.js";

const galleryContainer = document.querySelector(".gallery-container");

const displayArticles = (articles, prices) => {
  const articlesDOM = articles.map((article, i) => {
    const articleDOM = document.createElement("div");
    articleDOM.classList.add("gallery-item");
    articleDOM.innerHTML = `<a href="/article?id=${article._id}">
          <figure>
            <div class="article-img">
              <img src="${article.imageUrl}" alt="Appareil photo" />
            </div>
            <figcaption>
              <header>
                <h3 class="name">${article.name}</h3>
                <p>${prices[i].integer}€<sup>${prices[i].decimal}</sup></p>
              </header>
              <p class="article-id"> Réf. ${article._id}</p>
            </figcaption>
          </figure>
        </a>`;
    return articleDOM;
  });
  galleryContainer.innerHTML = "";
  galleryContainer.append(...articlesDOM);
};

fetchArticles(displayArticles);
