import "../lib/locomotive.min.js";

export const initLocomotiveScroll = () => {
  const scroll = new LocomotiveScroll({
    el: document.querySelector("[data-scroll-container]"),
    smooth: true,
    direction: "horizontal",
  });

  document.querySelector(".c-scrollbar").remove();
};
