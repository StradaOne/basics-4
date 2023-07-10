import Cookies from 'js-cookie'

const cookies = {
  saveCode: (code) => Cookies.set('code', code, { expires: 7 }),
  getCode: () => Cookies.get('code'),
  removeCode: () => Cookies.remove('code'),

  saveEmail: (email) => Cookies.set('email', email, { expires: 7 }),
  getEmail: () => Cookies.get('email'),
  removeEmail: () => Cookies.remove('email'),

  saveUser: (user) => Cookies.set('user', user, { expires: 7 }),
  getUser: () => Cookies.get('user'),
  removeUser: () => Cookies.remove('user'),
}

export { cookies }
