export class DialogBox {
  constructor(toAppend, title, btns, ...paragraphs) {
    this.appendDialogBox(toAppend, title, btns, ...paragraphs);
  }

  // Appends the dialog Box to the DOM and thus, displays it within the navigator
  appendDialogBox(toAppend, title, btns, ...paragraphs) {
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
    textContainer.append(
      this.titleElement(title),
      ...this.pElements(...paragraphs)
    );

    btnContainer.append(...this.btnElements(btns));

    toAppend.appendChild(dialogContainerDOM);
  }

  // Returns the title element as an HTML element
  titleElement(title) {
    const titleDOM = document.createElement(title.type);
    titleDOM.classList.add("title-primary");
    titleDOM.innerHTML = title.content;
    return titleDOM;
  }

  // Returns a list of all the paragraphs (as HTML elements) given as an argument of the function
  pElements(...paragraphs) {
    return paragraphs.map((p) => {
      const elemDOM = document.createElement("p");
      elemDOM.innerHTML = p;
      return elemDOM;
    });
  }

  btnElements(btns) {
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
  }
}
