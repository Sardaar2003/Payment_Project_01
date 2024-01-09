const button = document.querySelectorAll("button")[0];
const button1 = document.querySelectorAll("button")[1];
let nameError = document.getElementById("submit-Error");
let nameError1 = document.getElementById("submit-Error-email");
let nameError2 = document.getElementById("submit-Error-password");
let nameError3 = document.getElementById("submit-Error-referalCode");
let nameError4 = document.getElementById("submit-Error-signUp");
button1.addEventListener("click", () => {
  window.location.href = "/home";
});
const preDefinedReferalCode = [
  "diVySKAz0mO97MTwxZQ7",
  "0arKZcVV6b7s3AzI8HFj",
  "IqmaUX1vLtdAUgu3jP95",
  "yIilbsfQQVTYAZCxBehP",
  "cnWqB3cCrsW6CIpNQbIA",
  "rvOebZY2stSUa6Vwoo98",
  "SHrz88YXvsIL4hGkE8Fz",
  "ZpeYUyCLfGVn0q1xjQ3M",
  "JUsBHKQsvSKhN69ujyWq",
  "dGmgmAo75tBux8l94EpG",
];
const checkReferralCode = (codeToCheck) => {
  return preDefinedReferalCode.includes(codeToCheck);
};
function validateReferralCode() {
  const referalCode = document.getElementById("referalcd").value;
  const data = document.getElementById("referalcd");
  if (referalCode == "") {
    nameError3.innerHTML = "REFERAL CODE IS REQUIRED";
    data.style.border = "2px solid red";
    return false;
  }
  if (!checkReferralCode(referalCode)) {
    nameError3.innerHTML = "INVALID CODE";
    data.style.border = "2px solid red";
    return false;
  }
  nameError3.innerHTML = "";
  data.style.border = "2px solid green";
  return true;
}
function validateuserName() {
  const userName = document.getElementById("username").value;
  const data = document.getElementById("username");
  if (userName == "") {
    nameError.innerHTML = "\nUSERNAME IS REQUIRED";
    data.style.border = "2px solid red";
    return false;
  }
  nameError.innerHTML = "";
  data.style.border = "2px solid green";
  // data.style.fontSize = "0rem";
  return true;
}
function validateEmailId() {
  const emailID = document.getElementById("emailid").value;
  const data = document.getElementById("emailid");
  if (emailID == "") {
    nameError1.innerHTML = "EMAIL ID IS REQUIRED";
    data.style.border = "2px solid red";
    return false;
  }
  if (!emailID.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
    nameError1.innerHTML = "INVALID EMAIL";
    data.style.border = "2px solid red";
    return false;
  }
  nameError1.innerHTML = "";
  data.style.border = "2px solid green";
  return true;
}
function validatePassword() {
  const passWord = document.getElementById("password").value;
  const data = document.getElementById("password");
  if (passWord == "") {
    nameError2.innerHTML = "PASSWORD IS REQUIRED";
    data.style.border = "2px solid red";
    return false;
  }
  nameError2.innerHTML = "";
  data.style.border = "2px solid green";
  return true;
}
function isValid() {
  if (
    (validateuserName() &&
      validateEmailId() &&
      validatePassword() &&
      validateReferralCode()) == true
  ) {
    nameError4.innerHTML = "";
    return true;
  } else {
    nameError4.innerHTML = "FILL THE NECESSARY DETAILS";
    return false;
  }
}
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// const signUpData = JSON.stringify(data, null, 2);
button.addEventListener("click", () => {
  //   const res = isValid();
  //   console.log(res);
  if (
    validateuserName() &&
    validateEmailId() &&
    validatePassword() &&
    validateReferralCode()
  ) {
    // console.log(validateuserName());
    // console.log(validateEmailId());
    // console.log(validatePassword());
    // console.log(validateReferralCode());
    const userName = document.getElementById("username").value;
    const emailID = document.getElementById("emailid").value;
    const passWord = document.getElementById("password").value;
    const referalCode = document.getElementById("referalcd").value;
    const data = {
      username: userName,
      emailId: emailID,
      passWOrd: passWord,
      referralCd: referalCode,
    };
    fetch("/signUpDom", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Network response was not ok. Status: ${response.status}`
          );
        }
        return response.json();
      })
      .then((data) => {
        if (data.message === "Data Received Successfully") {
          window.location.href = "./success.html";
          // await delay(5000);
          // window.location.href = "./entryPage.html";
        }
        if (data.message === "Error") {
          // console.error("Error from the Backend:", data.message);
          window.location.href = "./failureDB.html";
        } else {
          console.log("Error Occured");
        }
      })
      .catch((err) => {
        console.error(
          "There was an issue with the fetch operation:",
          err.message
        );
      });
    // setTimeout(() => {
    //   window.location.href = "./entryPage.html";
    // }, 5000);
  } else {
    validateuserName();
    validateEmailId();
    validatePassword();
    validateReferralCode();
    nameError4.innerHTML = "FILL THE NECESSARY DETAILS";
  }
});
