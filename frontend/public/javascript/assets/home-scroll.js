const main = document.querySelector("main");
const gallery = document.querySelector(".gallery-container");
let offset;

const initScroll = () => {
  offset = 0;
  gallery.style.left = "0px";
};

const setOffset = (e) => {
  offset -= (e.deltaY / Math.abs(e.deltaY)) * 80;
  const maxOffset = gallery.clientWidth - window.innerWidth;

  if (offset > 0) {
    offset = 0;
  } else if (offset < -maxOffset) {
    offset = -maxOffset;
  }
};

const scroll = (e) => {
  setOffset(e);
  gallery.style.left = offset + "px";
};

window.addEventListener("load", initScroll);

main.addEventListener("wheel", scroll);

window.addEventListener("resize", () => {
  initScroll();
  window.innerWidth <= 767
    ? main.removeEventListener("wheel", scroll)
    : main.addEventListener("wheel", scroll);
});
