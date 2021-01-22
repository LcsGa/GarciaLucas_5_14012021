const fields = document.querySelectorAll(".field");
const [firstName, lastName, email, message] = fields;
const errors = document.querySelectorAll("small");
const sendBtn = document.querySelector("button");

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

[firstName, lastName].forEach((elem) =>
  elem.addEventListener("change", function () {
    verifyInput(this, /^\S[a-zÀ-ÿ ,.'-]+$/i);
  })
);

email.addEventListener("change", function () {
  verifyInput(this, /^\S[a-zA-z0-9-\.]+@([a-zA-z-]+\.)+[a-zA-z-]{2,4}$/g);
});

message.addEventListener("change", function () {
  verifyInput(this, /^\S.+/);
});

// Cancel button
sendBtn.addEventListener("click", (e) => {
  [...fields].forEach((field) => field.dispatchEvent(new Event("change")));

  if ([...errors].filter((error) => !error.classList.contains("hidden"))) {
    e.preventDefault();
  }
});
