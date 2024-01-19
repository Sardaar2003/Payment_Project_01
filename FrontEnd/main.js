const cleaveCC = new Cleave("#cardNumber", {
  creditCard: true,
  delimiter: "-",
  onCreditCardTypeChanged: function (type) {
    const cardBrand = document.getElementById("card__brand"),
      visa = "fab fa-cc-visa",
      mastercard = "fab fa-cc-mastercard",
      amex = "fab fa-cc-amex",
      diners = "fab fa-cc-diners-club",
      jcb = "fab fa-cc-jcb",
      discover = "fab fa-cc-discover";

    switch (type) {
      case "visa":
        cardBrand.setAttribute("class", visa);
        break;
      case "mastercard":
        cardBrand.setAttribute("class", mastercard);
        break;
      case "amex":
        cardBrand.setAttribute("class", amex);
        break;
      case "diners":
        cardBrand.setAttribute("class", diners);
        break;
      case "jcb":
        cardBrand.setAttribute("class", jcb);
        break;
      case "discover":
        cardBrand.setAttribute("class", discover);
        break;
      default:
        cardBrand.setAttribute("class", "");
        break;
    }
  },
});

const cleaveDate = new Cleave("#cardExpiry", {
  date: true,
  datePattern: ["m", "y"],
});

const cleaveCCV = new Cleave("#cardCcv", {
  blocks: [4],
});

let btn = document.getElementById("SubmitInfo");
let selectedCheckbox = null;
let stor;
const dazzleRadio = document.getElementById("dazzle");
const calladocRadio = document.getElementById("calladoc");
if (!dazzleRadio.checked) {
  stor = dazzleRadio.value;
} else {
  stor = calladocRadio.value;
}
console.log(stor);
btn.addEventListener("click", () => {
  // console.log("Button was clicked");
  btn.disabled = true;
  btn.innerHTML = "PROCESSING...";
  const cardN = document.getElementById("cardNumber").value;
  const cardEx = document.getElementById("cardExpiry").value;
  const cardCCV = document.getElementById("cardCcv").value;
  // console.log(
  //   ` Card Number : ${cardN} \n Card Exp : ${cardEx} \n Card CCV : ${cardCCV}`
  // );
  const cardBrand = document.getElementById("card__brand").className;
  var cardbrand;
  if (cardBrand == "fab fa-cc-visa") {
    cardbrand = "VS";
  } else if (cardBrand == "fab fa-cc-mastercard") {
    cardbrand = "MC";
  } else if (cardBrand == "fab fa-cc-amex") {
    cardbrand = "AX";
  } else if (cardBrand == "fab fa-cc-diners-club") {
    cardbrand = "DC";
  } else if (cardBrand == "fab fa-cc-jcb") {
    cardbrand = "JCB";
  } else {
    cardbrand = "DS";
  }
  const cardInfo = {
    cardNumber: cardN,
    cardExpiry: cardEx,
    cardCcv: cardCCV,
    cardBrand: cardbrand,
    promo_id: stor,
  };
  const cardInfoJson = JSON.stringify(cardInfo, null, 2);
  console.log(cardInfoJson);
  fetch("/CardDetails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: cardInfoJson,
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.message == "Data Recieved Successfully") {
        btn.disabled = false;
        btn.innerHTML = "SUBMIT";
        window.location.href = "./final.html";
      } else {
        btn.disabled = false;
        btn.innerHTML = "SUBMIT";
        console.log(data.Error);
        const queryParams = new URLSearchParams({
          errors: JSON.stringify(data.Error),
        });
        window.location.href = `./failure.html?${queryParams.toString()}`;
        // window.location.href = "./failure.html";
      }
    })
    .catch((err) => {
      console.log("There is an error sending the Information to the backend");
    });
});
