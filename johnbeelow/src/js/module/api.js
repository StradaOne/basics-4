import { cookies } from './storage.js'
import { API } from './confing.js'
import { showStatus, showLoader } from './ui.js'

const { LINK, METHOD, HEADER } = API

const getUserCode = async (email) => {
  try {
    showLoader.open()
    const response = await fetch(`${LINK.URL}/${LINK.USER}`, {
      method: METHOD.POST,
      headers: {
        ...HEADER.DEFAULT,
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
    const response = await fetch(`${LINK.URL}/${LINK.USER}`, {
      method: METHOD.PATCH,
      headers: {
        ...HEADER.DEFAULT,
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
    const response = await fetch(`${LINK.URL}/${LINK.USER}/${LINK.ME}`, {
      method: METHOD.GET,
      headers: {
        ...HEADER.DEFAULT,
        Authorization: `Bearer ${cookies.getCode()}`,
      },
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
    const response = await fetch(`${LINK.URL}/${LINK.MESSAGES}/`, {
      method: METHOD.GET,
      headers: {
        ...HEADER.DEFAULT,
        Authorization: `Bearer ${cookies.getCode()}`,
      },
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
