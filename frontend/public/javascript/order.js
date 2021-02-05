import { totalPrice, formatPrice } from "./shared/utils/price.js";

const fields = document.querySelectorAll(".field");
const [lastName, firstName, email, address, city] = fields;
const errors = document.querySelectorAll("small");
const btns = document.querySelectorAll("button");
const totalPriceDOM = document.querySelector("#total-price");

totalPriceDOM.innerHTML = formatPrice(totalPrice());

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
  elem.addEventListener("keydown", function () {
    verifyInput(this, /^\S[a-zÀ-ÿ ,.'-]+$/);
  })
);

// General Email Regex (RFC 5322 Official Standard)
email.addEventListener("keydown", function () {
  verifyInput(
    this,
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i
  );
});

address.addEventListener("keydown", function () {
  verifyInput(this, /^\S\d{1,4}((\s[a-z]+,?)|,)?((\s)([a-zÀ-ÿ'\s-]+)){2,}$/i);
});

city.addEventListener("keydown", function () {
  verifyInput(this, /^\S[a-zÀ-ÿ'-\s]+$/i);
});

btns[1].addEventListener("click", () => history.back());
