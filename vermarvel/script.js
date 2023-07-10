"use strict";
// CHAT

import dom from "./dom.js";
import { cookies } from "./cookie.js";
import { url } from "./urls.js";
import { updateUser, getUser } from "./user.js";
import { updateMemory, getMemory } from "./memory.js";
import { utils } from "./utils.js";

let socket;

//%%%%%%%%%%%%%%% Business Logic  %%%%%%%%%%%%%%%%%%

function collectInput(type) {
  let user = getUser();
  if (type === "name") {
    user.name = dom.inputDialogName.value.trim();
    dom.inputDialogConfirm.value = "";
    updateUser(user);
    changeName(user);
  }
  if (type === "email") {
    dom.errorAuth.classList.add("hidden");
    user.email = dom.inputDialogEmail.value.trim();

    dom.inputDialogEmail.value = "";
    dom.btnSubmitCode.classList.remove("hidden");
    dom.authWrapper.classList.add("hidden");
    updateUser(user);
    submitEmail(user.email);
  }
  if (type === "token") {
    user.token = dom.inputDialogConfirm.value;
    dom.inputDialogConfirm.value = "";
    dom.closeDialog("settings");
    updateUser(user);
    cookies.cookify("user", user);
  }
  if (type === "message") {
    const textMessage = dom.inputMessage.value.trim();
    submitMessage(textMessage);
    dom.inputMessage.value = "";
  }
}
//%%%%%%%%%%%%%%  REQUESTS TO SERVER  %%%%%%%%%%%%%%%

function changeName(user) {
  renderError("nameInvalid");
  const requestOptions = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.token}`,
    },
    body: JSON.stringify({ name: user.name }),
  };

  fetch(url.user, requestOptions)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      // reconnect as a crutch to work around a PATCH bug of backend:
      disonnect();
      connect(user.token);
      dom.closeDialog();
      getHistory();
    })
    .catch((error) => {
      console.error(error);
    });
}

function submitEmail(userEmail) {
  renderError("emailInvalid");
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: userEmail }),
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
  let user = getUser();
  let token = user.token;
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

      let memory = utils.splitArray(20, array);
      updateMemory(memory);
      renderHistory();
    })
    .catch((error) => {
      console.error(error);
    });
}

function submitMessage(textMessage) {
  try {
    socket.send(JSON.stringify({ text: textMessage }));
  } catch (error) {
    console.error(error);
  }
}
//&&&&&&&&&&&&&&&&&&& RENDERS &&&&&&&&&&&&&&&&&&&&&&&&&&&&

function prepareHTML(obj, user) {
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

function renderMessage(message) {
  let user = getUser();
  const data = JSON.parse(message.data);
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

function renderHistory(mode = "initial") {
  let memory = getMemory();
  let user = getUser();
  if (!memory.length) {
    dom.notice.textContent = dom.noticeFullyLoaded;
    return;
  }

  const toBeRenderedNow = memory.at(0);
  memory.shift();
  updateMemory(memory);

  const nodes = toBeRenderedNow.map((m) => prepareHTML(m, user));
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

function loadMore() {
  // Reaching coord in Y of the chat: approach (point)
  const approach = 0;
  const scrollSpot = dom.tape.offsetTop - dom.parentMessages.scrollTop;
  if (scrollSpot >= approach) {
    renderHistory("loadMore");
  } else {
    dom.notice.textContent = "";
  }
}

function renderError(errorType) {
  let user = getUser();
  if (errorType === "nameInvalid") {
    if (user.name.length < 3) {
      dom.errorSettings.textContent = dom.errNameRequirementsStr;
      dom.errorSettings.classList.remove("hidden");
      return;
    } else {
      dom.errorSettings.classList.add("hidden");
    }
  }

  if (errorType === "emailInvalid") {
    if (!user.email) {
      dom.errorAuth.textContent = "Please fill in your email to authorize";
      dom.errorAuth.classList.remove("hidden");
      return;
    }
  }
}

// &&&&&&&&&&&&&&&&&&&&& WEB-SOCKET &&&&&&&&&&&&&&&&&&&&&&&&

function connect() {
  let user = getUser();
  let token = user.token;
  return new Promise((resolve, reject) => {
    socket = new WebSocket(`wss://edu.strada.one/websockets?${token}`);
    socket.onopen = () => {
      resolve();
      socket.addEventListener("message", renderMessage);
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

//
//&&&&&&&&&&&&&&&&&&&&&& LISTENERS &&&&&&&&&&&&&&&&&&&&&&

document.addEventListener("DOMContentLoaded", () => {
  dom.closeDialog("auth");
});

dom.parentMessages.addEventListener("scroll", loadMore);

dom.main.addEventListener("submit", (event) => {
  event.preventDefault();
  const target = event.target;
  if (target.classList.contains("form-message")) {
    collectInput("message");
  }

  if (target.classList.contains("form-email")) {
    collectInput("email");
  }

  if (target.classList.contains("form-confirm")) {
    collectInput("token");
  }

  if (target.classList.contains("form-name")) {
    collectInput("name");
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
// let user = uncookify("user") - apply cookies
// UI:-
// check for unconnected ws: ws reconnect

// Bugs:
//Confirm x mark not working
// Reconnect history reload corrupted

// DONE today:
// Ref: improved responsibilities
