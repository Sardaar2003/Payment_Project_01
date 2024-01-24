let checkbx = document.getElementById("BillingDiff");
let shipContainer = document.getElementsByClassName("shipContainer")[0];
let button = document.querySelector("button");
let nameError = document.getElementById("name-error");
let nameError1 = document.getElementById("name-error-1");
let nameError2 = document.getElementById("name-error-2");
let nameError3 = document.getElementById("name-error-3");
let nameError4 = document.getElementById("name-error-4");
let nameError5 = document.getElementById("name-error-5");
let nameError6 = document.getElementById("name-error-6");
let nameError7 = document.getElementById("name-error-7");
let nameError8 = document.getElementById("name-error-8");
let nameError9 = document.getElementById("name-error-9");
let nameError10 = document.getElementById("name-error-10");
let nameError11 = document.getElementById("name-error-11");
let submitError = document.getElementById("submit-Error");
let shipError = document.getElementById("ship-name-error");
let shipError1 = document.getElementById("ship-name-error-1");
let shipError2 = document.getElementById("ship-name-error-2");
let shipError3 = document.getElementById("ship-name-error-3");
let shipError4 = document.getElementById("ship-name-error-4");
let shipError5 = document.getElementById("ship-name-error-5");
let shipError6 = document.getElementById("ship-name-error-6");
let shipError7 = document.getElementById("ship-name-error-7");
let shipError8 = document.getElementById("ship-name-error-8");
let shipError9 = document.getElementById("ship-name-error-9");
let shipError10 = document.getElementById("ship-name-error-10");
shipContainer.classList.add("hide");
function validateName() {
  const fnameInp = document.getElementById("fnameInput").value;
  const data = document.getElementById("fnameInput");
  if (fnameInp == "") {
    nameError.innerHTML = "NAME IS REQUIRED";
    data.style.border = "2px solid red";
    return false;
  }
  if (!fnameInp.match(/^[A-Za-z0-9]{1,35}$/)) {
    nameError.innerHTML = "Length range is 1 to 35";
    data.style.border = "2px solid red";
    return false;
  }
  // nameError.innerHTML = '<i class="fa-solid fa-circle-check"></i>'
  // data.style.borderBottomColor = "green";
  // data.style.color = "green";
  nameError.innerHTML = "";
  data.style.border = "2px solid green";
  // data.style.fontSize = "0rem";
  return true;
}
function validateShipName() {
  const shipFnameInp = document.getElementById("ship-fnameInput").value;
  const data = document.getElementById("ship-fnameInput");
  if (shipFnameInp == "") {
    shipError.innerHTML = "NAME IS REQUIRED";
    data.style.border = "2px solid red";
    return false;
  }
  if (!shipFnameInp.match(/^[A-Za-z0-9]{1,35}$/)) {
    shipError.innerHTML = "Length range is 1 to 35";
    data.style.border = "2px solid red";
    return false;
  }
  shipError.innerHTML = "";
  data.style.border = "2px solid green";
  // data.style.fontSize = "0rem";
  return true;
}
function validateLName() {
  const lnameInp = document.getElementById("lnameInput").value;
  const data = document.getElementById("lnameInput");
  if (lnameInp == "") {
    nameError1.innerHTML = "NAME IS REQUIRED";
    data.style.border = "2px solid red";
    return false;
  }
  if (!lnameInp.match(/^[A-Za-z0-9]{1,35}$/)) {
    nameError1.innerHTML = "Length range is 1 to 35";
    data.style.border = "2px solid red";
    return false;
  }
  // nameError.innerHTML = '<i class="fa-solid fa-circle-check"></i>'
  // data.style.borderBottomColor = "green";
  // data.style.color = "green";
  nameError1.innerHTML = "";
  data.style.border = "2px solid green";
  // data.style.fontSize = "0rem";
  return true;
}
function validateShipLName() {
  const shipLnameInp = document.getElementById("ship-lnameInput").value;
  const data = document.getElementById("ship-lnameInput");
  if (shipLnameInp == "") {
    shipError1.innerHTML = "NAME IS REQUIRED";
    data.style.border = "2px solid red";
    return false;
  }
  if (!shipLnameInp.match(/^[A-Za-z0-9]{1,35}$/)) {
    shipError1.innerHTML = "Length range is 1 to 35";
    data.style.border = "2px solid red";
    return false;
  }
  // nameError.innerHTML = '<i class="fa-solid fa-circle-check"></i>'
  // data.style.borderBottomColor = "green";
  // data.style.color = "green";
  shipError1.innerHTML = "";
  data.style.border = "2px solid green";
  // data.style.fontSize = "0rem";
  return true;
}
function validateDName() {
  const dob = document.getElementById("DOBInput").value;
  const data = document.getElementById("DOBInput");
  if (dob == "") {
    nameError2.innerHTML = "DOB IS REQUIRED";
    data.style.border = "2px solid red";
    return false;
  }
  nameError2.innerHTML = "";
  data.style.border = "2px solid green";
  return true;
}
function validateShipDName() {
  const shipDOB = document.getElementById("ship-DOBInput").value;
  const data = document.getElementById("ship-DOBInput");
  if (shipDOB == "") {
    shipError2.innerHTML = "DOB IS REQUIRED";
    data.style.border = "2px solid red";
    return false;
  }
  shipError2.innerHTML = "";
  data.style.border = "2px solid green";
  return true;
}
function validateAdName() {
  const add1Inp = document.getElementById("add1Input").value;
  const data = document.getElementById("add1Input");
  if (add1Inp == "") {
    nameError3.innerHTML = "ADDRESS IS REQUIRED";
    data.style.border = "2px solid red";
    return false;
  }
  if (!add1Inp.match(/^[0-9a-zA-Z\s,]{1,50}$/)) {
    nameError3.innerHTML = "Length range is 1 to 50";
    data.style.border = "2px solid red";
    return false;
  }
  nameError3.innerHTML = "";
  data.style.border = "2px solid green";
  // data.style.fontSize = "0rem";
  return true;
}
function validateShipAdName() {
  const shipAdd1Inp = document.getElementById("ship-add1Input").value;
  const data = document.getElementById("ship-add1Input");
  if (shipAdd1Inp == "") {
    shipError3.innerHTML = "ADDRESS IS REQUIRED";
    data.style.border = "2px solid red";
    return false;
  }
  if (!shipAdd1Inp.match(/^[0-9a-zA-Z\s,]{1,50}$/)) {
    shipError3.innerHTML = "Length range is 1 to 50";
    data.style.border = "2px solid red";
    return false;
  }
  shipError3.innerHTML = "";
  data.style.border = "2px solid green";
  // data.style.fontSize = "0rem";
  return true;
}
function validateAddName() {
  const add2Inp = document.getElementById("add2Input").value;
  const data = document.getElementById("add2Input");
  if (add2Inp === "") return true;
  if (!add2Inp.match(/^[0-9a-zA-Z\s,]{1,50}$/)) {
    nameError4.innerHTML = "Length range is 1 to 50";
    data.style.border = "2px solid red";
    return false;
  }
  nameError4.innerHTML = "";
  data.style.border = "2px solid green";
  // data.style.fontSize = "0rem";
  return true;
}
function validateShipAddName() {
  const shipAdd2Inp = document.getElementById("ship-add2Input").value;
  const data = document.getElementById("ship-add2Input");
  if (shipAdd2Inp == "") {
    shipError4.innerHTML = "ADDRESS IS REQUIRED";
    data.style.border = "2px solid red";
    return false;
  }
  if (!shipAdd2Inp.match(/^[0-9a-zA-Z\s,]{1,50}$/)) {
    shipError4.innerHTML = "Length range is 1 to 50";
    data.style.border = "2px solid red";
    return false;
  }
  shipError4.innerHTML = "";
  data.style.border = "2px solid green";
  // data.style.fontSize = "0rem";
  return true;
}
function validateCity() {
  const cityInp = document.getElementById("cityInput").value;
  const data = document.getElementById("cityInput");
  if (cityInp == "") {
    nameError5.innerHTML = "CITY IS REQUIRED";
    data.style.border = "2px solid red";
    return false;
  }
  if (!cityInp.match(/^[A-Za-z0-9]{1,35}$/)) {
    nameError5.innerHTML = "Length range is 1 to 35";
    data.style.border = "2px solid red";
    return false;
  }
  nameError5.innerHTML = "";
  data.style.border = "2px solid green";
  return true;
}
function validateShipCity() {
  const shipCityInp = document.getElementById("ship-cityInput").value;
  const data = document.getElementById("ship-cityInput");
  if (shipCityInp == "") {
    shipError5.innerHTML = "CITY IS REQUIRED";
    data.style.border = "2px solid red";
    return false;
  }
  if (!shipCityInp.match(/^[A-Za-z0-9]{1,35}$/)) {
    shipError5.innerHTML = "Length range is 1 to 35";
    data.style.border = "2px solid red";
    return false;
  }
  shipError5.innerHTML = "";
  data.style.border = "2px solid green";
  return true;
}
function validateState() {
  const stateInp = document.getElementById("stateInput").value;
  const data = document.getElementById("stateInput");
  if (stateInp == "") {
    nameError6.innerHTML = "STATE IS REQUIRED";
    data.style.border = "2px solid red";
    return false;
  }
  if (!stateInp.match(/^[A-Za-z0-9]{1,2}$/)) {
    nameError6.innerHTML = "Length range is 1 to 2";
    data.style.border = "2px solid red";
    return false;
  }
  nameError6.innerHTML = "";
  data.style.border = "2px solid green";
  return true;
}
function validateShipState() {
  const shipStateInp = document.getElementById("ship-stateInput").value;
  const data = document.getElementById("ship-stateInput");
  if (shipStateInp == "") {
    shipError6.innerHTML = "STATE IS REQUIRED";
    data.style.border = "2px solid red";
    return false;
  }
  if (!shipStateInp.match(/^[A-Za-z0-9]{1,2}$/)) {
    shipError6.innerHTML = "Length range is 1 to 2";
    data.style.border = "2px solid red";
    return false;
  }
  shipError6.innerHTML = "";
  data.style.border = "2px solid green";
  return true;
}
function validateCountry() {
  let countryInp = document.getElementById("countryInput").value;
  const data = document.getElementById("countryInput");
  if (countryInp === "") {
    countryInp = "US";
    nameError8.innerHTML = "";
    data.style.border = "2px solid green";
    return true;
  } else if (!countryInp.match(/^[A-Za-z0-9]{1,3}$/)) {
    nameError8.innerHTML = "Length range is 1 to 3";
    data.style.border = "2px solid red";
    return false;
  }
  nameError8.innerHTML = "";
  data.style.border = "2px solid green";
  return true;
}
function validateShipCountry() {
  const shipCountryInp = document.getElementById("ship-countryInput").value;
  const data = document.getElementById("ship-countryInput");
  if (shipCountryInp == "") {
    shipError7.innerHTML = "COUNTRY REQUIRED";
    data.style.border = "2px solid red";
    return false;
  }
  if (!shipCountryInp.match(/^[A-Za-z0-9]{1,3}$/)) {
    shipError7.innerHTML = "Length range is 1 to 3";
    data.style.border = "2px solid red";
    return false;
  }
  shipError7.innerHTML = "";
  data.style.border = "2px solid green";
  return true;
}
function validatePincode() {
  const pinCodeInp = document.getElementById("pinCodeInput").value;
  const data = document.getElementById("pinCodeInput");
  if (pinCodeInp == "") {
    nameError9.innerHTML = "PINCODE IS REQUIRED";
    data.style.border = "2px solid red";
    return false;
  }
  if (!pinCodeInp.match(/^[A-Za-z0-9]{1,15}$/)) {
    nameError9.innerHTML = "Length range is 1 to 15";
    data.style.border = "2px solid red";
    return false;
  }
  nameError9.innerHTML = "";
  data.style.border = "2px solid green";
  return true;
}
function validateShipPincode() {
  const shipPinCodeInp = document.getElementById("ship-pinCodeInput").value;
  const data = document.getElementById("ship-pinCodeInput");
  if (shipPinCodeInp == "") {
    shipError8.innerHTML = "PINCODE IS REQUIRED";
    data.style.border = "2px solid red";
    return false;
  }
  if (!shipPinCodeInp.match(/^[A-Za-z0-9]{1,15}$/)) {
    shipError8.innerHTML = "Length range is 1 to 15";
    data.style.border = "2px solid red";
    return false;
  }
  shipError8.innerHTML = "";
  data.style.border = "2px solid green";
  return true;
}
function validateMobile() {
  const mobileInp = document.getElementById("mobileInput").value;
  const data = document.getElementById("mobileInput");
  if (mobileInp == "") {
    nameError10.innerHTML = "MOBILE NUMBER IS REQUIRED";
    data.style.border = "2px solid red";
    return false;
  }
  if (!mobileInp.match(/^\d{10}$/)) {
    nameError10.innerHTML = "Length range is 1 to 10";
    data.style.border = "2px solid red";
    return false;
  }
  nameError10.innerHTML = "";
  data.style.border = "2px solid green";
  return true;
}
function validateShipMobile() {
  const shipMobileInp = document.getElementById("ship-mobileInput").value;
  const data = document.getElementById("ship-mobileInput");
  if (shipMobileInp == "") {
    shipError9.innerHTML = "MOBILE NUMBER IS REQUIRED";
    data.style.border = "2px solid red";
    return false;
  }
  if (!shipMobileInp.match(/^\d{10}$/)) {
    shipError9.innerHTML = "Length range is 1 to 10";
    data.style.border = "2px solid red";
    return false;
  }
  shipError9.innerHTML = "";
  data.style.border = "2px solid green";
  return true;
}
function validateEmail() {
  const emailInp = document.getElementById("emailInput").value;
  const data = document.getElementById("emailInput");
  if (emailInp === "") {
    nameError11.innerHTML = "";
    data.style.border = "2px solid green";
    return true;
  }
  if (!emailInp.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
    nameError11.innerHTML = "INVALID EMAIL";
    data.style.border = "2px solid red";
    return false;
  }
  nameError11.innerHTML = "";
  data.style.border = "2px solid green";
  return true;
}
function validateShipEmail() {
  const shipEmailInp = document.getElementById("ship-emailInput").value;
  const data = document.getElementById("ship-emailInput");
  if (shipEmailInp == "") {
    shipError10.innerHTML = "EMAIL ID IS REQUIRED";
    data.style.border = "2px solid red";
    return false;
  }
  if (!shipEmailInp.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
    shipError10.innerHTML = "INVALID EMAIL";
    data.style.border = "2px solid red";
    return false;
  }
  shipError10.innerHTML = "";
  data.style.border = "2px solid green";
  return true;
}
function submitForm() {
  if (
    !validateAdName() ||
    !validateAddName() ||
    !validateCity() ||
    !validateCountry() ||
    !validateDName() ||
    !validateEmail() ||
    !validateLName() ||
    !validateMobile() ||
    !validateName() ||
    !validatePincode() ||
    !validateState()
  ) {
    submitError.innerHTML = "Fix the necessary Errors";
    return false;
  }
  return true;
}
function submitShipForm() {
  if (
    !validateShipAdName() ||
    !validateShipAddName() ||
    !validateShipCity() ||
    !validateShipCountry() ||
    !validateShipDName() ||
    !validateShipEmail() ||
    !validateShipLName() ||
    !validateShipMobile() ||
    !validateShipName() ||
    !validateShipPincode() ||
    !validateShipState()
  ) {
    submitError.innerHTML = "Fix the necessary Errors";
    return false;
  }
  return true;
}
checkbx.addEventListener("click", () => {
  if (checkbx.checked == false) {
    console.log("Successfull Added");
    shipContainer.classList.add("hide");
  } else {
    console.log("Successfully Removed");
    shipContainer.classList.remove("hide");
  }
});
function convertDateFormat(inputDate) {
  // Split the input date into day, month, and year
  const dateParts = inputDate.split("-");
  console.log(dateParts);
  // Rearrange the date parts to the desired format "mm-dd-yyyy"
  const formattedDate = `${dateParts[1]}/${dateParts[0]}/${dateParts[2]}`;
  console.log(formattedDate);

  return formattedDate;
}

button.addEventListener("click", () => {
  const fnameInp = document.getElementById("fnameInput");
  const lnameInp = document.getElementById("lnameInput");
  const gender = document.getElementById("sexInput");
  const dob = document.getElementById("DOBInput");
  const add1Inp = document.getElementById("add1Input");
  const add2Inp = document.getElementById("add2Input");
  const cityInp = document.getElementById("cityInput");
  const stateInp = document.getElementById("stateInput");
  const countryInp = document.getElementById("countryInput");
  const pinCodeInp = document.getElementById("pinCodeInput");
  const mobileInp = document.getElementById("mobileInput");
  const emailInp = document.getElementById("emailInput");
  console.log(dob.value);
  if (
    (checkbx.checked == false && submitForm()) ||
    (checkbx.checked == true && submitShipForm() && submitForm())
  ) {
    const formData = {
      FirstName: fnameInp.value,
      LastName: lnameInp.value,
      Gender: gender.value,
      DOB: dob.value,
      Address1: add1Inp.value,
      Address2: add2Inp.value,
      City: cityInp.value,
      State: stateInp.value,
      Country: countryInp.value,
      Pincode: pinCodeInp.value,
      MobileNumber: mobileInp.value,
      EmailId: emailInp.value,
    };
    // console.log(`Data : ${formData}`);
    // var shippingData;
    let shippingData, formData2;
    const BillingData = JSON.stringify(formData, null, 2);
    if (checkbx.checked == false) {
      formData2 = {
        ShipFirstName: fnameInp.value,
        ShipLastName: lnameInp.value,
        ShipGender: gender.value,
        ShipDOB: dob.value,
        ShipAddress1: add1Inp.value,
        ShipAddress2: add2Inp.value,
        ShipCity: cityInp.value,
        ShipState: stateInp.value,
        ShipCountry: countryInp.value,
        ShipPincode: pinCodeInp.value,
        ShipMobileNumber: mobileInp.value,
        ShipEmailId: emailInp.value,
      };
    } else {
      const shipFnameInp = document.getElementById("ship-fnameInput");

      const shipLnameInp = document.getElementById("ship-lnameInput");
      const shipGender = document.getElementById("ship-sexInput");
      const shipDOB = document.getElementById("ship-DOBInput");
      const shipAdd1Inp = document.getElementById("ship-add1Input");
      const shipAdd2Inp = document.getElementById("ship-add2Input");
      const shipCityInp = document.getElementById("ship-cityInput");
      const shipStateInp = document.getElementById("ship-stateInput");
      const shipCountryInp = document.getElementById("ship-countryInput");
      const shipPinCodeInp = document.getElementById("ship-pinCodeInput");
      const shipMobileInp = document.getElementById("ship-mobileInput");
      const shipEmailInp = document.getElementById("ship-emailInput");
      formData2 = {
        ShipFirstName: shipFnameInp.value,
        ShipLastName: shipLnameInp.value,
        ShipGender: shipGender.value,
        ShipDOB: convertDateFormat(shipDOB.value),
        ShipAddress1: shipAdd1Inp.value,
        ShipAddress2: shipAdd2Inp.value,
        ShipCity: shipCityInp.value,
        ShipState: shipStateInp.value,
        ShipCountry: shipCountryInp.value,
        ShipPincode: shipPinCodeInp.value,
        ShipMobileNumber: shipMobileInp.value,
        ShipEmailId: shipEmailInp.value,
      };
      // console.log(typeof shipDOB.value);
    }
    shippingData = JSON.stringify(formData2, null, 2);
    // console.log(`Billing Data : ${BillingData}`);
    // console.log(`Shipping Data : ${shippingData}`);
    const combinedFormData = { data1: BillingData, data2: shippingData };
    fetch("/OrderInfo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(combinedFormData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message == "Data Recieved Successfully") {
          window.location.href = "./header2.html";
        } else {
          console.error("Error from the Backend");
        }
      })
      .catch((err) => {
        console.log("There is an error sending the Information to the backend");
      });
  }
});
