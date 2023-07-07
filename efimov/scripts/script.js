import dom from "./dom.js";
import { validateEmail } from "./validate.js";
import axios from "axios";
import Cookies from "js-cookie";
import { showComponentMassages } from "./rendermassages.js";
import { askMassages } from "./rendermassages.js";

dom.cross.addEventListener("click", () => {
  dom.register.style.display = "none";
  dom.confirm.style.display = "none";
  dom.chat.style.display = "block";
  dom.settings.style.display = "none";
});

dom.buttonLogOut.addEventListener("click", () => {
  Cookies.remove("code");
  Cookies.remove("name");
  dom.chat.style.display = "none";
  dom.register.style.display = "block";
  window.location.reload();
});

const socket = new WebSocket(
  `wss://edu.strada.one/websockets?${Cookies.get("code")}`
);

function onstart() {
  console.log(Cookies.get("code"));
  if (Cookies.get("code") != undefined) {
    dom.register.style.display = "none";
    dom.confirm.style.display = "none";
    dom.chat.style.display = "block";
    askMassages();
    newMassages();
  }
}

function newMassages() {
  socket.onmessage = function (event) {
    console.log(event.data);
    showComponentMassages(event.data);
  };
}

dom.form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (dom.input.value != "") {
    socket.send(JSON.stringify({ text: `${dom.input.value}` }));
  }
});

dom.buttonNext.addEventListener("click", sendCode);
function sendCode() {
  if (dom.inputEmail.value !== "" && validateEmail(dom.inputEmail.value)) {
    const data = { email: dom.inputEmail.value };
    axios
      .post("https://edu.strada.one/api/user", data, {
        headers: {
          "Content-Type": "application/json",
        },
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
  askMassages();
  dom.register.style.display = "none";
  dom.confirm.style.display = "none";
  dom.settings.style.display = "block";
  dom.chat.style.display = "none";
});

dom.buttonsettings.addEventListener("click", () => {
  dom.settings.style.display = "block";
  dom.chat.style.display = "none";
});

dom.changeName.addEventListener("click", () => {
  Cookies.set("name", dom.inputName.value);
  console.log(dom.inputName.value);
  if (dom.inputName.value != "") {
    axios.defaults.headers.common["Authorization"] = `Bearer ${Cookies.get(
      "code"
    )}`;
    axios
      .patch("https://edu.strada.one/api/user", {
        name: `${Cookies.get("name")}`,
      })
      .then((response) => {
        console.log(response.data);
        dom.register.style.display = "none";
        dom.confirm.style.display = "none";
        dom.settings.style.display = "none";
        dom.chat.style.display = "block";
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
      });
  }
});

onstart();
