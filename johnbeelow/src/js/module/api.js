import { userMain } from './user.js'
import { API } from './confing.js'
import { showStatus, showLoader } from './ui.js'

const GET_ELEMENTS_API = {
  USER: {
    MAIN: () => `${API.LINK.URL}/${API.LINK.USER}`,
    INFO: () => `${API.LINK.URL}/${API.LINK.USER}/${API.LINK.ME}`,
    CHAT: () => `${API.LINK.URL}/${API.LINK.MESSAGES}/`,
  },
  METHOD: {
    PATCH: () => API.METHOD.PATCH,
    POST: () => API.METHOD.POST,
    GET: () => API.METHOD.GET,
  },
  HEADER: {
    DEFAULT: () => ({ ...API.HEADER.DEFAULT }),
    DEFAULT_AUTH: (token) => ({
      ...API.HEADER.DEFAULT,
      Authorization: `Bearer ${token}`,
    }),
  },
  CONVERT: {
    EMAIL: (email) => JSON.stringify({ email }),
    NAME: (name) => JSON.stringify({ name }),
  },
}

const { USER, METHOD, HEADER, CONVERT } = GET_ELEMENTS_API

const getUserCode = async (email) => {
  try {
    showLoader.open()
    const response = await fetch(USER.MAIN(), {
      method: METHOD.POST(),
      headers: HEADER.DEFAULT(),
      body: CONVERT.EMAIL(email),
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
    const token = userMain.token
    const response = await fetch(USER.MAIN(), {
      method: METHOD.PATCH(),
      headers: HEADER.DEFAULT_AUTH(token),
      body: CONVERT.NAME(name),
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
    const token = userMain.token
    const response = await fetch(USER.INFO(), {
      method: METHOD.GET(),
      headers: HEADER.DEFAULT_AUTH(token),
    })
    if (response.ok) {
      showStatus.complete()
    }
    const data = await response.json()
    return data
  } catch (error) {
    showStatus.error()
  } finally {
    showLoader.close()
  }
}

const getHistoryChat = async () => {
  try {
    showLoader.open()
    const token = userMain.token
    const response = await fetch(USER.CHAT(), {
      method: METHOD.GET(),
      headers: HEADER.DEFAULT_AUTH(token),
    })
    if (response.ok) {
      const data = await response.json()
      return data.messages.reverse()
    }
  } catch (error) {
    showStatus.error()
  } finally {
    showLoader.close()
  }
}

export { getUserCode, changeUserName, getUserInfo, getHistoryChat }
