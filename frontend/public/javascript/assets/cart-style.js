const header = document.querySelector("header");
const main = document.querySelector("main");
const footer = document.querySelector("footer");

const setHeight = () => {
  main.style.height =
    window.innerHeight - header.clientHeight - footer.clientHeight + "px";
};

window.addEventListener("load", setHeight);
window.addEventListener("resize", setHeight);
