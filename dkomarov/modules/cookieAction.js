const authorizationInput = document.querySelector('.authentication-input');

function setCookie() {
  const token = authorizationInput.value;
  document.cookie = `token=${token}`;
}

//получение куки
function getCookie() {
  return document.cookie.split("; ").reduce((acc, item) => {
    const [name, value] = item.split("=");
    acc[name] = value;
    return acc;
  }, {});
}

export { getCookie, setCookie }