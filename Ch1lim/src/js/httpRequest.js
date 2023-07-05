import Cookies from 'js-cookie';
import { api } from './apiKey.js';

export async function postEmail(email) {
  await fetch(api, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({ email }),
  });
}

export async function getVerif(token) {
  try {
    const response = await fetch(`${api}/me `, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      return true;
    }
  } catch (e) {
    alert(e);
    return false;
  }
}

export async function patchName(name) {
  await fetch(api, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: `Bearer ${Cookies.get('token')}`,
    },
    body: JSON.stringify({ name: name }),
  });
}
