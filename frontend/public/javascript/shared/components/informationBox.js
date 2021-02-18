// Appends an information box to the DOM and thus, displays within the navigator
const informationBox = (imgURL, title, msg, btnContent, toAppend) => {
  const informationBoxDOM = document.createElement("div");
  informationBoxDOM.classList.add("information-box");
  informationBoxDOM.innerHTML = `<img src="${imgURL}">
      <div class="group-text">
        <h2 class="title-accent">${title}</h2>
        <p>${msg}</p>
      </div>
      <a class="btn btn-primary" href="/">${btnContent}</a>`;
  toAppend.appendChild(informationBoxDOM);
};

export { informationBox };
