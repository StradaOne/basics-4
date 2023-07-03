import { cookieToken } from "../index";

const inputAuthorizationValue = document.querySelector(".authorization-input");
const settingNameInput = document.querySelector(".item-input");

async function postData() {
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
}

async function changeName() {
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
}

async function getData(cookieToken) {
  const url = "https://edu.strada.one/api/user/me";
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${cookieToken}`,
    },
  });
  const result = await response.json();
  console.log(result);
}

export { postData, changeName, getData }