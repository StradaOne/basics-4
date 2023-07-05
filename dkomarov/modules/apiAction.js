import { cookieToken } from "../index";
import { format } from "date-fns";
import { cookieToken } from "../index";
import { DISPLAY_NODE } from "./DOMelements";
import { createNewMessage } from "./createUiElement";
import { scroll } from "../index";


const inputAuthorizationValue = document.querySelector(".authorization-input");
const settingNameInput = document.querySelector(".item-input");

async function postData() {
  try {
    const url = "https://edu.strada.one/api/user";
    const data = { email: inputAuthorizationValue.value };
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    console.log(result);
  } catch (error) {
    console.log(error);
  }
}

async function changeName() {
  try {
    const name = settingNameInput.value;
    const url = "https://edu.strada.one/api/user";
    const data = { name: name };
    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${cookieToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    console.log(result);
  } catch (error) {
    console.log(error);
  }
}

async function getData(cookieToken) {
  try {
    const url = "https://edu.strada.one/api/user/me";
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${cookieToken}`,
      },
    });
    const result = await response.json();
    console.log(result);
  } catch (error) {
    console.log(error);
  }
}

async function getHistoryMessage(cookieToken) {
  try {
    const url = "https://edu.strada.one/api/messages/";
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${cookieToken}`,
      },
    });
    const data = await response.json();
    const arrayMessage = data.messages.reverse();
    console.log(data);
    const nodeElement = arrayMessage.map((message) => {
      const date = new Date(message.createdAt);
      const fixDate = format(date, "HH:mm");
      DISPLAY_NODE.append(
        createNewMessage(message.user.name, message.text, fixDate)
      );
      return message;
    });
    console.log(nodeElement);
  } catch (error) {
    console.log(error);
  }
  scroll();
}

export { postData, changeName, getData, getHistoryMessage };