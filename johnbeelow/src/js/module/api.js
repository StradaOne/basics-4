import { cookies } from './storage.js'
import { showStatus, showLoader } from './ui_components.js'

const API = {
  URL: 'https://edu.strada.one/api',
  USER: 'user',
  ME: 'me',
}

const getUserCode = async (email) => {
  try {
    showLoader.open()
    const response = await fetch(`${API.URL}/${API.USER}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    })
    if (response.ok) {
      showStatus.complete()
    }
  } catch (error) {
    showStatus.error()
  } finally {
    showLoader.close()
  }
}

const changeUserName = async (name) => {
  try {
    showLoader.open()
    const response = await fetch(`${API.URL}/${API.USER}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${cookies.getCode()}`,
      },
      body: JSON.stringify({ name }),
    })
    if (response.ok) {
      showStatus.complete()
    }
  } catch (error) {
    showStatus.error()
  } finally {
    showLoader.close()
  }
}

const getUserInfo = async () => {
  try {
    showLoader.open()
    const response = await fetch(`${API.URL}/${API.USER}/${API.ME}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${cookies.getCode()}`,
      },
    })
    if (response.ok) {
      showStatus.complete()
    }
    const data = await response.json()
    console.log(data)
  } catch (error) {
    showStatus.error()
  } finally {
    showLoader.close()
  }
}

export { getUserCode, changeUserName, getUserInfo }
