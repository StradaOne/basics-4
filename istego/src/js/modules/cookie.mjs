import Cookies from 'js-cookie';

function setCookie(name, value) {
    Cookies.set(name, value);
}

function getCookie(name) {
    return Cookies.get(name);
}

function removeCookie(name) {
    Cookies.remove(name);
}

export { setCookie, getCookie, removeCookie };
