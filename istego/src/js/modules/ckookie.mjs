import Cookies from 'js-cookie';

function setCookie(name, value) {
    Cookies.set(name, value);
}

function getCookie(name) {
    return Cookies.get(name);
}

function removeCkookie(name) {
    Cookies.remove(name);
}

export { setCookie, getCookie, removeCkookie };
