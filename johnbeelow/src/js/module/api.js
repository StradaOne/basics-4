const API = {
  URL: 'https://edu.strada.one/api/user',
}

const getCodeUser = async (email) => {
  const response = await fetch(API.URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  })
  if (response.ok) {
    console.log('Отправлено успешно')
  } else {
    console.log('Ошибка')
  }
}

export { getCodeUser }
