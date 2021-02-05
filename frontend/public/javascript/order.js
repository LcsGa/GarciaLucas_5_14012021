import { totalPrice, formatPrice } from "./shared/utils/price.js";
import { order } from "./shared/components/fetchArticles.js";
import { appendDialogBox } from "./shared/components/dialog.js";

const container = document.querySelector("#container");
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

const loadFields = () => {
  if (sessionStorage.length) {
    Object.entries(sessionStorage).forEach((storedField) => {
      const field = document.querySelector(`#${storedField[0]}`);
      field.value = storedField[1];
    });
  }
};
loadFields();

window.addEventListener("load", () => {
  if (!localStorage.length) location.replace("/");
});

window.addEventListener("DOMContentLoaded", () => {
  fields.forEach((field) => field.dispatchEvent(new Event("change")));
});

const verifyInput = (elem, regex) => {
  const error = getError(elem.id);

  if (!regex.test(elem.value)) {
    error.classList.remove("hidden");
    error.classList.add("error");
    elem.classList.add("error-input");
  } else {
    error.classList.remove("error");
    error.classList.add("hidden");
    elem.classList.remove("error-input");
  }

  sessionStorage.setItem(elem.id, elem.value);
};

[lastName, firstName].forEach((elem) =>
  elem.addEventListener("change", function () {
    verifyInput(this, /^\S[a-zÀ-ÿ ,.'-]+$/i);
  })
);

// General Email Regex (RFC 5322 Official Standard)
email.addEventListener("change", function () {
  verifyInput(
    this,
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i
  );
});

address.addEventListener("change", function () {
  verifyInput(this, /^\S\d{1,4}((\s[a-z]+,?)|,)?((\s)([a-zÀ-ÿ'\s-]+)){2,}$/i);
});

city.addEventListener("change", function () {
  verifyInput(this, /^\S[a-zÀ-ÿ'-\s]+$/i);
});

btns[0].addEventListener("click", async () => {
  try {
    const response = await order(
      {
        lastName: lastName.value,
        firstName: firstName.value,
        email: email.value,
        address: address.value,
        city: city.value,
      },
      Object.values(localStorage).map((item) => JSON.parse(item).id)
    );
    const orderResponse = await response.json();
    if (response.status < 300) {
      appendDialogBox(
        container,
        {
          type: "h2",
          content: `Merci pour votre commande !`,
        },
        {
          primary: {
            link: "/",
            content: "Retourner à l'acceuil",
          },
        },
        `Numéro de commande : <br/><strong>${orderResponse.orderId.toUpperCase()}</strong>`,
        `Total HT : <br/><strong>${formatPrice(totalPrice())}</strong>`,
        `<br/>Vous recevrez prochainement un récapitulatif détaillé de votre commande à l'adresse mail suivante :
        <br/><strong>${orderResponse.contact.email}</strong>`
      );
      localStorage.clear();
    } else {
      appendDialogBox(
        container,
        {
          type: "h2",
          content: `Une erreur est survenue...`,
        },
        {
          danger: {
            link: "",
            content: "Réessayer",
          },
        },
        `<strong>Erreur ${response.status}</strong> : Quelque chose s'est mal passé lors de la validation de votre commande !`,
        `Veuillez vérifier que vous avez correctement rempli le formulaire de validation !`
      );
    }
  } catch (e) {
    console.error(e);
  }
});

btns[1].addEventListener("click", () => history.back());
