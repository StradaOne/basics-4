const serverUrl = "https://api.genderize.io";

export const getData = (value) => {
  const url = `${serverUrl}?name=${value}`;

  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Ошибка получения данных: " + response.status);
      }

      return response.json();
    })
    .catch((error) => {
      console.error("Ошибка при извлечении данных:", error);

      return "Произошла ошибка при выполнении запроса";
    });
};
