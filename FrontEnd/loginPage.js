const button = document.querySelectorAll("button")[0];
const button1 = document.querySelectorAll("button")[1];
let nameError = document.getElementById("submit-Error");
let nameError2 = document.getElementById("submit-Error-password");
let nameError4 = document.getElementById("submit-Error-signUp");
button1.addEventListener("click", () => {
  window.location.href = "/home";
});
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
  if ((validateuserName() && validatePassword()) == true) {
    nameError4.innerHTML = "";
    return true;
  } else {
    nameError4.innerHTML = "FILL THE NECESSARY DETAILS";
    return false;
  }
}
button.addEventListener("click", () => {
  isValid();
});
