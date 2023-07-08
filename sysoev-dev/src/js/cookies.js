import Cookies from 'js-cookie';

export function setCookie(value) {
  Cookies.set('privateToken', value, { expires: 7 });
}

export function getCookie() {
  return Cookies.get('privateToken');
}
