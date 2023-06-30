"use strict";
// CARDZLETTE

import dom from "./dom.js";

// import state from "./state.mjs";
// import utils from "./utils.mjs";

let userNickName = "Maria";
let otherNickName = "Sam";

//%%%%%%%%%%%%%%%%%%%%%%%%%%%  Business Logic  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

function getInput(event, author = "user") {
  event.preventDefault();
  const text = dom.inputMessage.value;
  const stamp = new Date().toString();
  const timeStamp = stamp.slice(16, 21);
  dom.inputMessage.value = "";
  if (author === "user") {
    return placeUserMessage(text, timeStamp, author);
  }
  if (author === "other") {
    return placeOtherMessage(text, timeStamp, author);
  }
}

function placeUserMessage(text, timeStamp) {
  const clone = dom.templateUserMessage.content.cloneNode(true);
  const name = clone.querySelector(".user-name");
  name.textContent = userNickName;
  const stamp = clone.querySelector("time");
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

function getUserEmail(event) {
  event.preventDefault();
  const email = dom.inputDialogEmail.value;

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // Add any other headers as needed
    },
    body: JSON.stringify({ email }),
  };

  fetch("https://edu.strada.one/api/user", requestOptions)
    .then((response) => response.json())
    .then((data) => {
      // Handle the response data
      console.log(data);
    })
    .catch((error) => {
      // Handle any error that occurred
      console.error(error);
    });
}

// function authCheckCode() {
//   // dom.inputDialogConfirm.value===
// }

//%%%%%%%%%%%%%%%%%%%%%%%%%%%  Listeners  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

document.addEventListener("DOMContentLoaded", () => {
  dom.closeDialog("auth");
});

dom.formMessage.addEventListener("submit", (event) => {
  getInput(event);
});

dom.formEmail.addEventListener("submit", (event) => {
  getUserEmail(event);
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
