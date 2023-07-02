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
