const firstName = document.querySelector("#firstname");
const lastName = document.querySelector("#lastname");
const email = document.querySelector("#email");
const errors = document.querySelectorAll("small");

const getError = (inputName) => {
  return [...errors].filter((err) =>
    err.classList.contains(`error-${inputName}`)
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

firstName.addEventListener("change", function () {
  verifyInput(this, /^[a-zÀ-ÿ ,.'-]+$/i);
});

lastName.addEventListener("change", function () {
  verifyInput(this, /^[a-zÀ-ÿ ,.'-]+$/i);
});

email.addEventListener("change", function () {
  verifyInput(this, /^[a-zA-z0-9-\.]+@([a-zA-z-]+\.)+[a-zA-z-]{2,4}$/g);
});
