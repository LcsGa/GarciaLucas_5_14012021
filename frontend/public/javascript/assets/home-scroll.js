import "../lib/locomotive.min.js";

setTimeout(() => {
  const scroll = new LocomotiveScroll({
    el: document.querySelector("[data-scroll-container]"),
    smooth: true,
    direction: "horizontal",
  });

  document.querySelector(".c-scrollbar").remove();
}, 100);
