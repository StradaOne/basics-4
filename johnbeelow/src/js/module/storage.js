import Cookies from 'js-cookie'

const cookies = {
  saveCode: (codeUser) => Cookies.set('codeUser', codeUser, { expires: 7 }),
  getCode: () => Cookies.get('codeUser'),
}

export { cookies }
