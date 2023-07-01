import VARIABLES from "./varibles.mjs";

async function sendAuthCode() {
  const userData = {
    email: VARIABLES.ELEMENTS.AUTH.INPUT.value
  }
  const url = 'https://edu.strada.one/api/user'
  let response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(userData),
    headers: {
      'Content-type': 'application/json'
    }
  });
  let result = await response
  console.log(result)
}

// async function getUserInfo() {
//   const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1hcG9zaWFAZ21haWwuY29tIiwiaWF0IjoxNjg4MTIyMjM1LCJleHAiOjE2OTE3MTg2MzV9.nt0YfIjMIsHFEmCGXri5P5fZdY_uFmVyQ6CaEra3Wco'
//   const url = 'https://edu.strada.one/api/user/me'
//   let response = await fetch(url, {
//     method: 'GET',
//     headers: {
//       'Authorization': `Bearer ${token}`
//     }
//   })
//   let result = await response.json()
//   console.log(result)
// }

export default sendAuthCode