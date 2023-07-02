import { COOKIES } from "./cookies";

const API =  {
  URL_ONE:" https://edu.strada.one/api/user",
  URL_TWO:" https://edu.strada.one/api/user/me",
}
async function getCode(email) {
  try {
    const response = await fetch(API.URL_ONE, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });
    console.log(response.json())
  } catch (err) {
    console.log(err.message);
  }
}

async function checkToken(token) {
    try {
      const response = await fetch(API.URL_TWO, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });
      if(!response.ok) {
        // console.log('Неправильно указан код подтверждения!')
        throw new Error ('Неправильно указан код подтверждения!')
        
      } 
      return response.json()
    } catch (err) {
      console.log(err.message);
      return false
    }
  }

  async function changeName(name,token) {
    try {
      const response = await fetch(API.URL_ONE, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ name }),
      });
      console.log(response.json())
    } catch (err) {
      console.log(err.message);
    }
  }



export { getCode, checkToken, changeName };
