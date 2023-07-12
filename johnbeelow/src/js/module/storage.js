import Cookies from 'js-cookie'
import { generateHash } from './utils'

const generateUniqueCookie = (cookie) => {
  const hash = generateHash()
  return `${cookie}-${hash}`
}

const cookies = {
  saveCode: (code) => {
    const uniqueCookie = generateUniqueCookie('code')
    Cookies.set(uniqueCookie, code, { expires: 7 })
  },
  getCode: () => {
    const cookies = Cookies.get()
    const codeCookie = Object.keys(cookies).find((cookie) =>
      cookie.startsWith('code-')
    )
    return cookies[codeCookie]
  },
  removeCode: () => {
    const cookies = Cookies.get()
    const codeCookie = Object.keys(cookies).find((cookie) =>
      cookie.startsWith('code-')
    )
    Cookies.remove(codeCookie)
  },

  saveEmail: (email) => {
    const uniqueCookie = generateUniqueCookie('email')
    Cookies.set(uniqueCookie, email, { expires: 7 })
  },
  getEmail: () => {
    const cookies = Cookies.get()
    const emailCookie = Object.keys(cookies).find((cookie) =>
      cookie.startsWith('email-')
    )
    return cookies[emailCookie]
  },
  removeEmail: () => {
    const cookies = Cookies.get()
    const emailCookie = Object.keys(cookies).find((cookie) =>
      cookie.startsWith('email-')
    )
    Cookies.remove(emailCookie)
  },

  saveUser: (user) => {
    const uniqueCookie = generateUniqueCookie('user')
    Cookies.set(uniqueCookie, user, { expires: 7 })
  },
  getUser: () => {
    const cookies = Cookies.get()
    const userCookie = Object.keys(cookies).find((cookie) =>
      cookie.startsWith('user-')
    )
    return cookies[userCookie]
  },
  removeUser: () => {
    const cookies = Cookies.get()
    const userCookie = Object.keys(cookies).find((cookie) =>
      cookie.startsWith('user-')
    )
    Cookies.remove(userCookie)
  },
}

export { cookies }
