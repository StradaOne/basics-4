import Cookies from "js-cookie";

const COOKIES = {
    SET: (codeUser) => Cookies.set('User-code', codeUser),
    GET: (name) => Cookies.get(name)
}
export {COOKIES}
