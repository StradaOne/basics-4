"use strict";
// CARDZLETTE

import dom from "./dom.js";
import { cookies } from "./cookie.js";
// import state from "./state.mjs";
// import utils from "./utils.mjs";

let userNickName = null;
let otherNickName = "Sam";
const url = `https://edu.strada.one/api/user`;
//%%%%%%%%%%%%%%%%%%%%%%%%%%%  Business Logic  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

function getInput(event, author = "user") {
  event.preventDefault();
  const token = cookies.uncookify("token");
  const text = dom.inputMessage.value;
  const stamp = new Date().toString();
  const timeStamp = stamp.slice(16, 21);
  dom.inputMessage.value = "";

  return placeUserMessage(text, timeStamp, token);

  // if (author === "other") {
  //   return placeOtherMessage(text, timeStamp, author);
  // }
}

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
  console.log("message done");
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

  const token = cookies.uncookify("token");
  const requestOptions = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(`{ name: ${newName} }`),
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

function getUserEmail(event) {
  event.preventDefault();
  dom.btnSubmitCode.classList.remove("hidden");
  const email = dom.inputDialogEmail.value;

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
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

function saveCode(event) {
  event.preventDefault();
  const token = dom.inputDialogConfirm.value;
  console.log(token);
  dom.inputDialogConfirm.value = "";
  cookies.cookify("token", token);
  dom.closeDialog("settings");
}
function saveName(event) {
  event.preventDefault();
  userNickName = dom.inputDialogName.value;
  console.log(userNickName);
  dom.inputDialogConfirm.value = "";
  dom.closeDialog();
}

//%%%%%%%%%%%%%%%%%%%%%%%%%%%  Listeners  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

document.addEventListener("DOMContentLoaded", () => {
  dom.closeDialog("auth");
});

dom.formMessage.addEventListener("submit", (event) => {
  getInput(event);
});

dom.formAuthEmail.addEventListener("submit", (event) => {
  getUserEmail(event);
});

dom.formConfirm.addEventListener("submit", (event) => {
  saveCode(event);
});

dom.formName.addEventListener("submit", (event) => {
  saveName(event);
});

dom.btnSubmitCode.addEventListener("click", (event) => {
  const open = "confirm";
  dom.closeDialog(open);
});

// Tasks

// UI: Dialogs - improve
// Logic: Dialogs
// Feat:
// Bugs
