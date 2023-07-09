"use strict";
// CHAT

import dom from "./dom.js";
import { cookies } from "./cookie.js";
import { url } from "./urls.js";
import { user } from "./state.js";
import { utils } from "./utils.js";

let memory = [];
let socket;

//%%%%%%%%%%%%%%%%%%%%%%%%%%%  Business Logic  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

function saveCode() {
  user.token = dom.inputDialogConfirm.value;
  dom.inputDialogConfirm.value = "";
  cookies.cookify("token", user.token);
  dom.closeDialog("settings");
}

async function sendUserMessage() {
  try {
    const textMessage = dom.inputMessage.value.trim();

    socket.send(JSON.stringify({ text: textMessage }));
  } catch (error) {
    console.error(error);
  } finally {
    dom.inputMessage.value = "";
    setTimeout(utils.scrollToBottom, 100);
  }
}

//%%%%%%%%%%%%%%%%%%%%%%%%  REQUESTS TO SERVER  %%%%%%%%%%%%%%%%%%%%%%%%%%%%

function changeName() {
  user.name = dom.inputDialogName.value.trim();

  dom.inputDialogConfirm.value = "";
  if (user.name.length < 3) {
    dom.errorSettings.textContent = dom.errNameRequirementsStr;

    dom.errorSettings.classList.remove("hidden");
    return;
  } else {
    dom.errorSettings.classList.add("hidden");
  }
  let token = cookies.uncookify("token");
  const requestOptions = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name: user.name }),
  };

  fetch(url.user, requestOptions)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error(error);
    });

  disonnect();

  connect(token);
  dom.closeDialog();
  getHistory();
}

function submitUserEmail() {
  dom.errorAuth.classList.add("hidden");
  user.email = dom.inputDialogEmail.value.trim();

  if (!user.email) {
    dom.errorAuth.textContent = "Please fill in your email to authorize";
    dom.errorAuth.classList.remove("hidden");
    return;
  }
  dom.btnSubmitCode.classList.remove("hidden");
  dom.authWrapper.classList.add("hidden");
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: user.email }),
  };

  fetch(url.user, requestOptions)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
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

  fetch(url.messages, requestOptions)
    .then((response) => response.json())
    .then((data) => {
      const array = data.messages.map(({ text, createdAt: time, user }) => ({
        text,
        time: utils.timeFormat(time),
        user: user.name,
        email: user.email,
      }));
      console.log(memory);
      memory = utils.splitArray(20, array);
      console.log(memory);

      renderHistory();
    })
    .catch((error) => {
      console.error(error);
    });
}

//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&& RENDERS &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

function renderHistory(mode = "initial") {
  if (!memory.length) {
    dom.notice.textContent = dom.noticeFullyLoaded;
    return;
  }

  const toBeRenderedNow = memory.at(0);
  memory.shift();

  const nodes = toBeRenderedNow.map((m) => prepareHTML(m));
  const strings = nodes.map((fragment) => {
    const div = document.createElement("div");
    div.appendChild(fragment.cloneNode("true"));

    return div.innerHTML;
  });
  const html = strings.join("");

  dom.tape.insertAdjacentHTML("afterbegin", html);

  // Scroll down if the history download is at the chat openning

  if (mode === "initial") {
    setTimeout(utils.scrollToBottom, 1000);
  }
}

function prepareHTML(obj) {
  let clone;
  obj.email !== user.email
    ? (clone = dom.templateOtherMessage.content.cloneNode(true))
    : (clone = dom.templateUserMessage.content.cloneNode(true));

  const name = clone.querySelector(".name");
  name.textContent = obj.user;
  const stamp = clone.querySelector("em");
  stamp.textContent = obj.time;
  const messageText = clone.querySelector(".message-text");
  messageText.textContent = obj.text;
  return clone;
}

function uiMessage(message) {
  const data = JSON.parse(message.data);
  console.log(data);
  let clone;
  if (data.user.email !== user.email) {
    clone = dom.templateOtherMessage.content.cloneNode(true);
  } else {
    clone = dom.templateUserMessage.content.cloneNode(true);
  }

  const name = clone.querySelector(".name");
  name.textContent = data.user.name;
  const stamp = clone.querySelector("em");
  stamp.textContent = utils.timeFormat(data.updatedAt);
  const messageText = clone.querySelector(".message-text");
  messageText.textContent = data.text;
  dom.tape.appendChild(clone);
  // // Scroll to the uptodate messages
  dom.parentMessages.scrollTo(0, dom.parentMessages.scrollHeight);
}

function loadMore() {
  // Reaching coord in Y of the chat
  const approach = 0;
  const scrollSpot = dom.tape.offsetTop - dom.parentMessages.scrollTop;
  if (scrollSpot >= approach) {
    renderHistory("loadMore");
  } else {
    dom.notice.textContent = "";
  }
}
// &&&&&&&&&&&&&&&&&&&&&&& WEB-SOCKET &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

function connect(token) {
  return new Promise((resolve, reject) => {
    socket = new WebSocket(`wss://edu.strada.one/websockets?${token}`);
    socket.onopen = () => {
      resolve();
      socket.addEventListener("message", uiMessage);
    };
    socket.onerror = (error) => {
      reject(error);
      disonnect();
      connect(token);
    };
  });
}

function disonnect() {
  if (socket) {
    socket.close();
    socket = null;
  }
}

//&&&&&&&&&&&&&&&&&&&&&& LISTENERS &&&&&&&&&&&&&&&&&&&&&&

document.addEventListener("DOMContentLoaded", () => {
  dom.closeDialog("auth");
});

dom.parentMessages.addEventListener("scroll", loadMore);

dom.main.addEventListener("submit", (event) => {
  event.preventDefault();
  const target = event.target;
  if (target.classList.contains("form-message")) {
    sendUserMessage();
  }

  if (target.classList.contains("form-email")) {
    submitUserEmail();
  }

  if (target.classList.contains("form-confirm")) {
    saveCode();
  }

  if (target.classList.contains("form-name")) {
    changeName();
  }
});

dom.main.addEventListener("click", (event) => {
  const target = event.target;

  if (
    target.classList.contains("btn-settings") ||
    target.classList.contains("icon-settings")
  ) {
    dom.closeDialog("settings");
  }

  if (target.classList.contains("icon-exit-settings")) {
    dom.closeDialog();
  }
  if (
    target.classList.contains("icon-exit") ||
    target.classList.contains("btn-exit") ||
    target.classList.contains("icon-exit-settings")
  ) {
    disonnect();
    dom.tape.innerHTML = "";
    dom.closeDialog("auth");
  }
  if (target.classList.contains("btn-submit-code")) {
    dom.closeDialog("confirm");
  }
});

// Tasks

// UI:
// check for unconnected ws: ws reconnect

// ws Module?
// Errors UI

// Bugs:
//Confirm x mark not working

// DONE today:
// Ref: Listeners (submit delegation)
// Scroll after each message
// user object
