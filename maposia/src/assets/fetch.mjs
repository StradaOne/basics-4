import VARIABLES from "./varibles.mjs";
import Cookies from "js-cookie";

async function sendAuthCode() {
  const userData = {
    email: VARIABLES.ELEMENTS.AUTH.INPUT.value
  }
  const url = 'https://edu.strada.one/api/user'
  try {
    let response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(userData),
      headers: {
        'Content-type': 'application/json'
      }
    });
    if (response.ok) {
      let result = await response
      console.log(result)
    } else {
      throw new Error('Request failed with status ' + response.status)
    }

  } catch (error) {
    console.error('Error:', error.message)
  }


}

async function getUserInfo() {
  const token = Cookies.get('token')
  const url = 'https://edu.strada.one/api/user/me'
  try {
    let response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    if (response.ok) {
      let result = await response.json()
    } else {
      throw new Error('Request failed with status ' + response.status)
    }
  } catch (error) {
    console.error('Error:', error.message)
  }
}


async function changeName() {
  const token = Cookies.get('token');
  const newName = VARIABLES.ELEMENTS.SETTING.INPUT.value;
  const data = {name: newName};
  const url = 'https://edu.strada.one/api/user';
  try {
    const response = await fetch(url, {
      method: 'PATCH',
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    if (response.ok) {
      VARIABLES.ELEMENTS.MAIN_USERNAME.textContent = newName;
      VARIABLES.ELEMENTS.SETTING.INPUT.value = '';
      Cookies.set('username', newName)
    } else {
      throw new Error('Request failed with status ' + response.status)
    }
  } catch (error) {
    console.error('Error:', error.message)
  }
}

async function loadChatData() {
  const token = Cookies.get('token')
  const url = 'https://edu.strada.one/api/messages/'
  try {
    let response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    if (response.ok) {
      let result = await response.json()
      return result.messages
    } else {
      throw new Error('Request failed with status ' + response.status)
    }
  } catch (error) {
    console.error('Error:', error.message)
  }
}

export { sendAuthCode, getUserInfo, changeName, loadChatData }