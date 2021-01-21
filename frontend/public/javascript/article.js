const quantityBtn = document.querySelectorAll(".btn-quantity");
const quantity = document.querySelector("#quantity");
const articlePrice = document.querySelector(".article-price");

const price = 35.99; // TODO : Must receive this price with a query mongoDb

const fixQuantity = () => {
  if (+quantity.value < +quantity.min) {
    quantity.value = quantity.min;
  }
  if (+quantity.value > +quantity.max) {
    quantity.value = quantity.max;
  }
};

const updatePrice = () => {
  fixQuantity();
  articlePrice.innerHTML = (price * +quantity.value).toFixed(2) + " €";
};

const modifyValue = (value) => {
  if (
    +quantity.value < +quantity.min ||
    (quantity.value === quantity.min && value === quantity.min)
  ) {
    quantity.value = quantity.min;
  } else if (
    +quantity.value > +quantity.max ||
    (quantity.value === quantity.max && value === quantity.max)
  ) {
    quantity.value = quantity.max;
  } else if (value === quantity.min) {
    quantity.value--;
  } else {
    quantity.value++;
  }
  quantity.dispatchEvent(new Event("change"));
};

quantity.addEventListener("change", updatePrice);

quantityBtn.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    if (btn.classList.contains("quantity-remove")) {
      modifyValue(quantity.min);
    } else {
      modifyValue(quantity.max);
    }
  });
});
