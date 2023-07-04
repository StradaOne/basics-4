"use strict";
// CARDZLETTE

import dom from "./dom.js";
import { cookies } from "./cookie.js";
// import state from "./state.mjs";
// import utils from "./utils.mjs";

let userNickName = null;
let userEmail = null;
let otherNickName = "Sam";
const url = `https://edu.strada.one/api/user`;
const urlMessages = `https://edu.strada.one/api/messages/`;

//%%%%%%%%%%%%%%%%%%%%%%%%%%%  Utils  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

function timeFormat(stamp) {
  return stamp.slice(11, 16);
}

//%%%%%%%%%%%%%%%%%%%%%%%%%%%  Business Logic  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

function getInput(event, author = "user") {
  event.preventDefault();
  const token = cookies.uncookify("token");
  const text = dom.inputMessage.value;
  const now = new Date();
  const stamp = now.toISOString().slice(0, -1);
  const timeFormatted = timeFormat(stamp);
  dom.inputMessage.value = "";

  return sendUserMessage(text, token);
}
// function sendUserMessage(text, token) {
//   const requestOptions = {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//     body: JSON.stringify(`{ message: ${text} }`),
//   };

//   fetch(urlMessages, requestOptions)
//     .then((response) => response.json())
//     .then((data) => {
//       console.log(data);
//     })
//     .catch((error) => {
//       console.error(error);
//     });
// }
function placeUserMessage(text, timeStamp, token) {
  const clone = dom.templateUserMessage.content.cloneNode(true);
  const name = clone.querySelector(".name");
  console.log(userNickName);
  name.textContent = userNickName;
  const stamp = clone.querySelector("em");
  stamp.textContent = timeStamp;
  const messageText = clone.querySelector(".user-message-text");
  messageText.textContent = text;
  dom.parentMessages.appendChild(clone);
}

function placeOtherMessage(text, timeStamp) {
  const clone = dom.templateOtherMessage.content.cloneNode(true);
  const name = clone.querySelector(".other-name");
  name.textContent = otherNickName;
  const stamp = clone.querySelector("time");
  stamp.textContent = timeStamp;
  const messageText = clone.querySelector(".other-message-text");
  messageText.textContent = text;
  dom.parentMessages.appendChild(clone);
}

function changeName(event) {
  event.preventDefault();
  const newName = dom.inputDialogName.value.trim();
  saveName(newName);
  const token = cookies.uncookify("token");
  const requestOptions = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name: newName }),
  };

  fetch(url, requestOptions)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error(error);
    });
}

function submitUserEmail(event) {
  event.preventDefault();
  dom.btnSubmitCode.classList.remove("hidden");
  userEmail = dom.inputDialogEmail.value.trim();

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: userEmail }),
  };

  fetch(url, requestOptions)
    .then((response) => response.json())
    .then((data) => {
      // console.log(data);
    })
    .catch((error) => {
      console.error(error);
    });
}

function getHistory() {
  const token = cookies.uncookify("token");
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  fetch(urlMessages, requestOptions)
    .then((response) => response.json())
    .then((data) => {
      const array = data.messages.map(({ text, createdAt: time, user }) => ({
        text,
        time: timeFormat(time),
        user: user.name,
        email: user.email,
      }));
      console.log(array);
      renderHistory(array);
    })
    .catch((error) => {
      console.error(error);
    });
}
function prepareHTML(obj) {
  if (obj.email !== userEmail) {
    const clone = dom.templateOtherMessage.content.cloneNode(true);
    const name = clone.querySelector(".other-name");

    name.textContent = obj.user;
    const stamp = clone.querySelector("em");
    stamp.textContent = obj.time;
    const messageText = clone.querySelector(".other-message-text");
    messageText.textContent = obj.text;
    return clone;
  } else {
    const clone = dom.templateUserMessage.content.cloneNode(true);
    const name = clone.querySelector(".name");
    console.log(userNickName);
    name.textContent = obj.user;
    const stamp = clone.querySelector("em");
    stamp.textContent = timeStamp;
    const messageText = clone.querySelector(".user-message-text");
    messageText.textContent = text;
    return clone;
  }
}

function renderHistory(array) {
  const nodes = array.reverse().map((m) => prepareHTML(m));
  const strings = nodes.map((fragment) => {
    const div = document.createElement("div");
    div.appendChild(fragment.cloneNode("true"));

    return div.innerHTML;
  });
  const html = strings.join("");
  dom.tape.innerHTML += html;
}

function saveCode(event) {
  event.preventDefault();
  const token = dom.inputDialogConfirm.value;
  console.log(token);
  dom.inputDialogConfirm.value = "";
  cookies.cookify("token", token);
  dom.closeDialog("settings");
}
function saveName(newName) {
  console.log("saving name");
  userNickName = newName;
  console.log(userNickName);
  dom.inputDialogConfirm.value = "";
  dom.closeDialog();
  getHistory();
}

//%%%%%%%%%%%%%%%%%%%%%%%%%%%  Listeners  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

document.addEventListener("DOMContentLoaded", () => {
  dom.closeDialog("auth");
});

dom.formMessage.addEventListener("submit", (event) => {
  getInput(event);
});

dom.formAuthEmail.addEventListener("submit", (event) => {
  submitUserEmail(event);
});

dom.formConfirm.addEventListener("submit", (event) => {
  saveCode(event);
});

dom.formName.addEventListener("submit", (event) => {
  changeName(event);
});

dom.btnSubmitCode.addEventListener("click", (event) => {
  const open = "confirm";
  dom.closeDialog(open);
});

// Tasks

// UI: Dialogs - improve

// Feat:
// Errors UI
// sending my messages to history
// Bugs: не узнает имейл,

// DONE today: // Logic: Dialogs, history load, selection prohibit, scroll,
