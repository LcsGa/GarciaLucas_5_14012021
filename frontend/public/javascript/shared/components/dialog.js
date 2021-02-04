const appendElement = (title, ...paragraphs) => {
  const textContainer = document.querySelector(".text-container");
  textContainer.append(titleElement(title), ...pElements(...paragraphs));
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

export { appendElement };
