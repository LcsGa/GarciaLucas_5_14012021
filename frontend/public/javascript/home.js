import { fetchArticles } from "./shared/components/fetchArticles.js";
import { initLocomotiveScroll } from "./assets/home-scroll.js";

const galleryContainer = document.querySelector(".gallery-container");

const displayArticles = (articles, prices) => {
  const articlesDOM = articles.map((article, i) => {
    const articleDOM = document.createElement("section");
    articleDOM.setAttribute("data-scroll-section", "");
    articleDOM.innerHTML = `<div class="gallery-item${
      i === 0 ? " first-item" : i === articles.length - 1 ? " last-item" : ""
    }">
        <a href="/article?id=${article._id}">
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
        </a>
      </div>`;
    return articleDOM;
  });
  galleryContainer.innerHTML = "";
  galleryContainer.append(...articlesDOM);
  initLocomotiveScroll();
};

fetchArticles(displayArticles);
