const scriptURL =
  "https://script.google.com/macros/s/AKfycbwz_cLBIu4yNBxjI5_14cRU6K1s__M2igAjIlu925XASKi-HYgs2fj-c6LQwGG-Ztav/exec";
const form = document.forms["contactform"];

form.addEventListener("submit", (e) => {
  e.preventDefault();
  fetch(scriptURL, { method: "POST", body: new FormData(form) })
    .then((response) =>
      alert("Thank you! your form is submitted successfully.")
    )
    .then(() => {
      window.location.reload();
    })
    .catch((error) => console.error("Error!", error.message));
});
