import { fixQuantity } from "./quantity.js";
import { getItemVariants } from "./itemVariants.js";

// Returns on object containing three differents values when invoked :
// price: {
//    double: number;
//    readonly integer: number;
//    readonly decimal: number;
// }
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

// Returns the total price of the cart
const totalPrice = () => {
  return getItemVariants().reduce((acc, item) => {
    acc += item.totalPrice;
    return acc;
  }, 0);
};

// Returns price formated with the integer part displayed normally and the decimal part displayed like an upper index
const formatPrice = (toFormat) => {
  return `${price(toFormat).integer}€<sup>${price(toFormat).decimal}</sup>`;
};

// Updates the price displayed within the item element
const updatePrice = (quantityElem, priceElem, articlePrice) => {
  fixQuantity(quantityElem);
  price.double = (articlePrice / 100) * +quantityElem.value;
  priceElem.innerHTML = formatPrice(price.double * 100);
};

// Updates the total price and the 3x price within the cart
const actualizeTotalPrices = (totalPriceDOM, threeTimesPriceDOM) => {
  totalPriceDOM.innerHTML = formatPrice(totalPrice());
  threeTimesPriceDOM.innerHTML = formatPrice((1000 + totalPrice()) / 3); // 1000 cents => 10 € administrative fees
};

export { price, totalPrice, formatPrice, updatePrice, actualizeTotalPrices };
