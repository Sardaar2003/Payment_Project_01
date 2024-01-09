const button = document.querySelectorAll("button")[0];
const button2 = document.querySelectorAll("button")[1];
// console.log(document.querySelectorAll("button"));
console.log(button);
console.log(button2);
button.addEventListener("click", () => {
  //   console.log("Clicked SIGNUP");
  window.location.href = "/signUp";
});
button2.addEventListener("click", () => {
  // console.log("Clicked LOGIN");
  window.location.href = "/login";
});
