const quantityBtn = document.querySelectorAll(".btn-quantity");
const quantity = document.querySelector("#quantity");

quantityBtn.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    if (btn.classList.contains("quantity-remove")) {
      modifyValue(quantity.min);
    } else {
      modifyValue(quantity.max);
    }
  });
});

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
};
