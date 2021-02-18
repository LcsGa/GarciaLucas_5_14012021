// Gets the index of the variant given as an argument of the function
const getVariantIndex = (item, optionChosen) => {
  return item.variants.findIndex((variant) => variant.lense === optionChosen);
};

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

// Removes the variant of the article (or directly the article if only one variant) from the localStorage
const removeVariant = (articleName, variantToDelete) => {
  const item = JSON.parse(localStorage.getItem(articleName));
  localStorage.removeItem(articleName);
  const variants = item.variants;
  item.variants = [];
  variants.forEach((variant) => {
    variant.lense !== variantToDelete && item.variants.push(variant);
  });
  item.variants.length &&
    localStorage.setItem(articleName, JSON.stringify(item));
};

export { getVariantIndex, getItemVariants, removeVariant };
