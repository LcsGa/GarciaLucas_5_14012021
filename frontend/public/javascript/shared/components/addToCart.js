const addToCart = (article, optionChosen, quantityToAdd, quantityElem) => {
  let item;
  let variantIndex = 0;

  if (localStorage[article.name]) {
    item = JSON.parse(localStorage[article.name]);
    variantIndex = item.variants.findIndex(
      (variant) => variant.lense === optionChosen
    );

    if (variantIndex === -1) {
      item.variants.push({
        lense: optionChosen,
        quantity: +quantityElem.value,
      });
    } else {
      const newQuantity = item.variants[variantIndex].quantity + quantityToAdd;
      if (newQuantity > 10) {
        item.variants[variantIndex].quantity = +quantityElem.max;
      } else if (newQuantity < 1) {
        item.variants[variantIndex].quantity = +quantityElem.min;
      } else {
        item.variants[variantIndex].quantity = newQuantity;
      }
    }
  } else {
    item = {
      id: article._id,
      price: article.price,
      variants: [{ lense: optionChosen, quantity: +quantityElem.value }],
    };
  }
  if (variantIndex === -1) variantIndex = item.variants.length - 1;

  item.variants[variantIndex].totalPrice =
    item.variants[variantIndex].quantity * article.price;
  localStorage.setItem(article.name, JSON.stringify(item));

  return item;
};

export { addToCart };
