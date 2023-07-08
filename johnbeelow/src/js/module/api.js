import { cookies } from './storage.js'
import { showStatus, showLoader } from './ui_components.js'

const API = {
  LINK: {
    URL: 'https://edu.strada.one/api',
    USER: 'user',
    ME: 'me',
    MESSAGES: 'messages',
  },
  METHOD: {
    POST: 'POST',
    PATCH: 'PATCH',
    GET: 'GET',
  },
  HEADER: {
    DEFAULT: {
      'Content-Type': 'application/json',
    },
  },
}

const getUserCode = async (email) => {
  try {
    showLoader.open()
    const response = await fetch(`${API.LINK.URL}/${API.LINK.USER}`, {
      method: API.METHOD.POST,
      headers: {
        ...API.HEADER.DEFAULT,
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
    const response = await fetch(`${API.LINK.URL}/${API.LINK.USER}`, {
      method: API.METHOD.PATCH,
      headers: {
        ...API.HEADER.DEFAULT,
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
    const response = await fetch(
      `${API.LINK.URL}/${API.LINK.USER}/${API.LINK.ME}`,
      {
        method: API.METHOD.GET,
        headers: {
          ...API.HEADER.DEFAULT,
          Authorization: `Bearer ${cookies.getCode()}`,
        },
      }
    )
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

const getHistoryChat = async () => {
  try {
    const response = await fetch(`${API.LINK.URL}/${API.LINK.MESSAGES}/`, {
      method: API.METHOD.GET,
      headers: {
        ...API.HEADER.DEFAULT,
        Authorization: `Bearer ${cookies.getCode()}`,
      },
    })
    if (response.ok) {
      const data = await response.json()
      return data.messages.reverse()
    }
  } catch (error) {
    showStatus.error()
  }
}

export { getUserCode, changeUserName, getUserInfo, getHistoryChat }
