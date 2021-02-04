import { fixQuantity } from "./quantity.js";

// Get a list of every variants within each item
const getItemVariants = () => {
  return Object.values(localStorage)
    .reduce((acc, item) => {
      item = JSON.parse(item);
      acc.push(item.variants);
      return acc;
    }, [])
    .flat();
};

const price = (price) => {
  return {
    double: (price / 100).toFixed(2),
    get integer() {
      return Math.trunc(this.double);
    },
    get decimal() {
      const decimal = Math.ceil((this.double - this.integer) * 100);
      return decimal === 0 ? "00" : decimal;
    },
  };
};

const totalPrice = () => {
  return getItemVariants().reduce((acc, item) => {
    acc += item.totalPrice;
    return acc;
  }, 0);
};

const formatPrice = (toFormat) => {
  return `${price(toFormat).integer}€<sup>${price(toFormat).decimal}</sup>`;
};

const updatePrice = (quantityElem, priceElem, articlePrice) => {
  fixQuantity(quantityElem);
  price.double = (articlePrice / 100) * +quantityElem.value;
  priceElem.innerHTML = formatPrice(price.double * 100);
};

const actualizeTotalPrices = (totalPriceDOM, threeTimesPriceDOM) => {
  totalPriceDOM.innerHTML = formatPrice(totalPrice());
  threeTimesPriceDOM.innerHTML = formatPrice((1000 + totalPrice()) / 3); // 1000 cents => 10 € administrative fees
};

export {
  getItemVariants,
  price,
  totalPrice,
  formatPrice,
  updatePrice,
  actualizeTotalPrices,
};
