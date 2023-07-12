export let token = JSON.parse(localStorage.getItem('token'));

const API = {
  URL: 'https://edu.strada.one/api',
  USER: 'user',
  ME: 'me',
  MESSAGES: 'messages',
};

export const getData = async (token) => {
  const response = await fetch(`${API.URL}/${API.USER}/${API.ME}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data;
};

export const sendCode = async (emailForm) => {
  const email = new FormData(emailForm).get('email');
  const response = await fetch(`${API.URL}/${API.USER}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email })
  });
  console.log('Отправлено')
};

export const changeName = async (name) => {
  const response = await fetch(`${API.URL}/${API.USER}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name })
  });
  location.reload();
};

export const getMessages = async () => {
  const response = await fetch(`${API.URL}/${API.MESSAGES}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data;
};

export const fetchData = async (prop) => {
  const data = await getData(token);
  return data[prop];
};

export const checkCode = async (code) => {
  const response = await fetch(`${API.URL}/${API.USER}/${API.ME}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  return response.status === 200;
} 
