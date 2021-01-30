// Get a list of every variants within each item ____________________________________
export const itemVariants = Object.values(localStorage)
  .reduce((acc, item) => {
    item = JSON.parse(item);
    acc.push(item.variants);
    return acc;
  }, [])
  .flat();

// Quantities modification___________________________________________________________
export const modifyValue = (quantityDOM, value) => {
  if (
    +quantityDOM.value < +quantityDOM.min ||
    (+quantityDOM.value === +quantityDOM.min && value === +quantityDOM.min)
  ) {
    quantityDOM.value = quantityDOM.min;
  } else if (
    +quantityDOM.value > +quantityDOM.max ||
    (+quantityDOM.value === +quantityDOM.max && value === +quantityDOM.max)
  ) {
    quantityDOM.value = quantityDOM.max;
  } else if (value === +quantityDOM.min) {
    +quantityDOM.value--;
  } else {
    +quantityDOM.value++;
  }
  quantityDOM.dispatchEvent(new Event("change"));
};

const fixQuantity = (quantityDOM) => {
  if (+quantityDOM.value < +quantityDOM.min) {
    quantityDOM.value = quantityDOM.min;
  }
  if (+quantityDOM.value > +quantityDOM.max) {
    quantityDOM.value = quantityDOM.max;
  }
};

//TODO
export const updatePrice = (quantityDOM) => {
  fixQuantity(quantityDOM);
  price.double = (article.price / 100) * +quantityDOM.value;
  articlePriceDOM.innerHTML = `${price.integer}€<sup>${price.decimal}</sup>`;
};
