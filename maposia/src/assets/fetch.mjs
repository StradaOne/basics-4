import { VARIABLES, BLOCKS } from "./varibles.mjs";
import Cookies from "js-cookie";

async function getAuthCode() {
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
      BLOCKS.AUTH.classList.add('hide')
      BLOCKS.VERIFICATION.classList.remove('hide')
    } else {
      throw new Error('Request failed with status ' + response.status)
    }
  } catch (error) {
    console.error('Error:', error.message)
  }
}

async function getUserData() {
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
      return console.log(result)
    } else {
      throw new Error('Request failed with status ' + response.status)
    }
  } catch (error) {
    console.error('Error:', error.message)
  }
}


async function setUserData() {
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
      Cookies.set('name', newName)
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

async function authorization(token) {
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
      Cookies.set('token', token)
      Cookies.set('name', result.name)
      Cookies.set('email', result.email)
      VARIABLES.ELEMENTS.AUTH.NODE.close();
      return response
    } else {
      throw new Error('Request failed with status ' + response.status)
    }

  } catch (error) {
    console.error('Error:', error.message)
  }
}

export { getAuthCode, setUserData, loadChatData, authorization }