const informationBox = (imgURL, title, msg, btnContent, toAppend) => {
  const pageNotFoundDOM = document.createElement("div");
  pageNotFoundDOM.classList.add("information-box");
  pageNotFoundDOM.id = "page-not-found";
  pageNotFoundDOM.innerHTML = `<img src="${imgURL}">
      <div class="group-text">
        <h2 class="title-accent">${title}</h2>
        <p>${msg}</p>
      </div>
      <a class="btn btn-primary" href="/">${btnContent}</a>`;
  toAppend.appendChild(pageNotFoundDOM);
};

export { informationBox };
