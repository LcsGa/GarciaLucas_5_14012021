const isLimitExceeded = (quantity, itemQuantity, maxQuantity) => {
  return quantity + itemQuantity > maxQuantity;
};

const appendDialogBox = (toAppend, title, btns, ...paragraphs) => {
  const dialogContainerDOM = document.createElement("div");
  dialogContainerDOM.classList.add("dialog-container");

  const dialogBoxDOM = document.createElement("div");
  dialogBoxDOM.classList.add("dialog-box");

  dialogContainerDOM.appendChild(dialogBoxDOM);

  const textContainer = document.createElement("div");
  textContainer.classList.add("text-container");

  const btnContainer = document.createElement("div");
  btnContainer.classList.add("btn-container");

  dialogBoxDOM.append(textContainer, btnContainer);

  textContainer.insertAdjacentHTML("afterend", "<div class='divider'></div>");
  textContainer.append(titleElement(title), ...pElements(...paragraphs));

  btnContainer.append(...btnElements(btns));

  toAppend.appendChild(dialogContainerDOM);
};

const titleElement = (title) => {
  const titleDOM = document.createElement(title.type);
  titleDOM.classList.add("title-primary");
  titleDOM.innerHTML = title.content;
  return titleDOM;
};

const pElements = (...paragraphs) => {
  return paragraphs.map((p) => {
    const elemDOM = document.createElement("p");
    elemDOM.innerHTML = p;
    return elemDOM;
  });
};

const btnElements = (btns) => {
  const btnsElem = [];
  let btnPrimaryDOM;
  let btnDangerDOM;

  if (btns.hasOwnProperty("primary")) {
    btnPrimaryDOM = document.createElement("a");
    btnPrimaryDOM.classList.add("btn", "btn-primary");
    btnPrimaryDOM.href = btns.primary.link;
    btnPrimaryDOM.innerHTML = btns.primary.content;
    btnsElem.push(btnPrimaryDOM);
  }

  if (btns.hasOwnProperty("danger")) {
    btnDangerDOM = document.createElement("a");
    btnDangerDOM.classList.add("btn", "btn-danger");
    btnDangerDOM.href = btns.danger.link;
    btnDangerDOM.innerHTML = btns.danger.content;
    btnsElem.push(btnDangerDOM);
  }

  return btnsElem;
};

export { isLimitExceeded, appendDialogBox };
