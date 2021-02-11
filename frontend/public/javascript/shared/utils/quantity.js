const modifyQuantity = (elem, value) => {
  if (
    +elem.value < +elem.min ||
    (+elem.value === +elem.min && value === +elem.min)
  ) {
    elem.value = elem.min;
  } else if (
    +elem.value > +elem.max ||
    (+elem.value === +elem.max && value === +elem.max)
  ) {
    elem.value = elem.max;
  } else if (value === +elem.min) {
    +elem.value--;
  } else {
    +elem.value++;
  }
  elem.dispatchEvent(new Event("change"));
};

const modifyQuantityHandler = (btn, elem) => {
  const isBtnToRemove = btn.classList.contains("quantity-remove");
  const limitValue = isBtnToRemove ? "min" : "max";
  modifyQuantity(elem, +elem[limitValue]);
};

const fixQuantity = (elem) => {
  +elem.value < +elem.min && (elem.value = elem.min);
  +elem.value > +elem.max && (elem.value = elem.max);
};

export { modifyQuantityHandler, fixQuantity };
