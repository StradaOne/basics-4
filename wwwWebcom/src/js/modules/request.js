import { COOKIES } from "./cookies";

const API = {
  URL_USER: " https://edu.strada.one/api/user",
  URL_ME: " https://edu.strada.one/api/user/me",
  URL_MESSAGES: "https://edu.strada.one/api/messages/"
};
async function getCode(email) {
  try {
    const response = await fetch(API.URL_USER, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });
    console.log(response.json());
  } catch (err) {
    console.log(err.message);
  }
}

async function checkToken(token) {
  try {
    const response = await fetch(API.URL_ME, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("Неправильно указан код подтверждения!");
    }
    return response.json();
  } catch (err) {
    console.log(err.message);
    return false;
  }
}

async function changeName(name, token) {
  try {
    const response = await fetch(API.URL_USER, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name }),
    });
    console.log(response.json());
  } catch (err) {
    console.log(err.message);
  }
}

async function getMessages(token) {
  try {
    const response = await fetch(API.URL_MESSAGES, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("Запрос не выполнен!");
    }
    const data = await response.json();
    return data.messages
  }catch(err) {
    console.log(err.message)
  }
}

export { getCode, checkToken, changeName,getMessages };
