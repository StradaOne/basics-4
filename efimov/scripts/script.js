import { Hours, Minutes } from "./date.js";
import dom from "./dom.js";
import { validateEmail } from "./validate.js";

dom.buttonLogOut.addEventListener("click", LogOut);
function LogOut() {
  dom.chat.style.display = "none";
  dom.register.style.display = "block";
}

dom.form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (dom.input.value != "") {
    createMassege();
  }
});
function createMassege() {
  let myMassege = document.createElement("div");
  myMassege.classList.add("myMassege");
  myMassege.innerHTML = `<div class='name'>Я<div class='time'>${Hours}:${Minutes}</div></div>${dom.input.value}`;
  dom.place.append(myMassege);
  dom.place.scrollTo({ top: 9999999999, behavior: "smooth" });
}

dom.buttonNext.addEventListener("click", sendCode);
function sendCode() {
  if (dom.inputEmail.value !== "" && validateEmail(dom.inputEmail.value)) {
    const url = "https://edu.strada.one/api/user";
    const data = { email: dom.inputEmail.value };

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(() => {
        dom.register.style.display = "none";
        dom.confirm.style.display = "block";
      })
      .catch((error) => {
        console.error("Ошибка:", error);
      });
  }
}

dom.crossback.addEventListener("click", () => {
  dom.register.style.display = "block";
  dom.confirm.style.display = "none";
});
