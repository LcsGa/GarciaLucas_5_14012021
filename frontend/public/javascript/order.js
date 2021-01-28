const fields = document.querySelectorAll(".field");
const [lastName, firstName, email, address, city] = fields;
const errors = document.querySelectorAll("small");

const getError = (fieldName) => {
  return [...errors].filter((err) =>
    err.classList.contains(`error-${fieldName}`)
  )[0];
};

const verifyInput = (element, regex) => {
  const error = getError(element.id);

  if (!regex.test(element.value)) {
    error.classList.remove("hidden");
    error.classList.add("error");
    element.classList.add("error-input");
  } else {
    error.classList.remove("error");
    error.classList.add("hidden");
    element.classList.remove("error-input");
  }
};

[lastName, firstName].forEach((elem) =>
  elem.addEventListener("change", function () {
    verifyInput(this, /^\S+[a-zÀ-ÿ ,.'-]+$/);
  })
);

email.addEventListener("change", function () {
  verifyInput(this, /^\S+[a-z\d-\.]+@([a-z-]+\.)+[a-z-]{2,4}$/i);
});

address.addEventListener("change", function () {
  verifyInput(this, /^\S+\d{1,4}((\s[a-z]+,?)|,)?((\s)([a-zÀ-ÿ'\s-]+)){2,}$/i);
});

city.addEventListener("change", function () {
  verifyInput(this, /^\S+[a-zÀ-ÿ'-\s]+$/i);
});
