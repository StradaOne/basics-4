import { Hours, Minutes } from "./date.js";
import dom from "./dom.js";
import { validateEmail } from "./validate.js";
import axios from "axios";
import Cookies from "js-cookie";

dom.buttonLogOut.addEventListener("click", LogOut);
function LogOut() {
  Cookies.remove("code");
  dom.chat.style.display = "none";
  dom.register.style.display = "block";
}

function onstart() {
  console.log(Cookies.get("code"));
  if (Cookies.get("code") != undefined) {
    dom.register.style.display = "none";
    dom.confirm.style.display = "none";
    dom.chat.style.display = "block";
    zapros();
  }
}

function zapros() {
  axios.defaults.headers.common["Authorization"] = `Bearer ${Cookies.get(
    "code"
  )}`;
  axios
    .get("https://edu.strada.one/api/messages/ ")
    .then((response) => {
      showMassages(response.data.messages);
    })
    .catch((error) => {
      console.error(error);
    });
}

function showMassages(massages) {
  massages.forEach((massage) => {
    console.log(massage);
    let myMassege = document.createElement("div");
    myMassege.classList.add("companionMassege");
    myMassege.innerHTML = `<div class='name'>${massage.user.name}<div class='time'>${massage.createdAt[11]}${massage.createdAt[12]}:${massage.createdAt[14]}${massage.createdAt[15]}</div></div>${massage.text}`;
    dom.place.append(myMassege);
    dom.place.scrollTo({ top: 9999999999 });
  });
}

dom.cross.addEventListener("click", () => {
  dom.register.style.display = "none";
  dom.confirm.style.display = "none";
  dom.chat.style.display = "block";
  dom.settings.style.display = "none";
});

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

dom.buttonGo.addEventListener("click", () => {
  const code = `${dom.inputCode.value}`;
  Cookies.set("code", code);
  zapros();
  dom.register.style.display = "none";
  dom.confirm.style.display = "none";
  dom.chat.style.display = "block";
});

dom.buttonsettings.addEventListener("click", () => {
  dom.settings.style.display = "block";
  dom.chat.style.display = "none";
});

dom.changeName.addEventListener("click", () => {
  console.log(dom.inputName.value);
  if (dom.inputName.value != "") {
    axios.defaults.headers.common["Authorization"] = `Bearer ${Cookies.get(
      "code"
    )}`;
    axios
      .patch("https://edu.strada.one/api/user", {
        name: `${dom.inputName.value}`,
      })
      .then((response) => {
        console.log(response.data);
        dom.register.style.display = "none";
        dom.confirm.style.display = "none";
        dom.chat.style.display = "block";
        dom.settings.style.display = "none";
      })
      .catch((error) => {
        console.error(error);
      });
  }
});

onstart();
