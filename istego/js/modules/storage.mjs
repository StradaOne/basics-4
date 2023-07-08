const storage = localStorage;

// Если локал пустой то создать для городов и фаваритов место в локал
function createStorage() {
  try {

    if (!storage.getItem('localDataCity')) {
      const stringListDataCity = JSON.stringify({});
      storage.setItem('localDataCity', stringListDataCity);
    }

    if (!storage.getItem('localListFavorites')) {
      const stringListFavorites = JSON.stringify([]);
      storage.setItem('localListFavorites', stringListFavorites);
    }

  } catch (error) {
    console.error(error);
  }
}
// Распарсить город в объект
function parseToObjLocalCity() {
  try {
    if (storage.getItem('localDataCity')) {
      const stringListDataCity = storage.getItem('localDataCity');
      try {
        const ListDataCity = JSON.parse(stringListDataCity);
        return ListDataCity;
      } catch(error) {
        console.log(error);
      }
      
    }
  } catch (error) {
    console.error(error); // логирование ошибки
  }

}

// Распарсить фаваритов в массив
function parseToArrlocalFavorites() {
  if (storage.getItem('localListFavorites')) {
    const stringListFavorites = storage.getItem('localListFavorites');
    const ListFavorites = JSON.parse(stringListFavorites);

    return ListFavorites;
  }
}

// Спарсить город в строку
function parseToStrLocalCity(objCity) {
  const listDataString = JSON.stringify(objCity);
  storage.setItem('localDataCity', listDataString);
}

// Спарсить фавориты в строку
function parseToStrlocalFavorites(objFavorite) {
  const listDataString = JSON.stringify(objFavorite);
  storage.setItem('localListFavorites', listDataString);
}

export { storage, createStorage, parseToObjLocalCity, parseToArrlocalFavorites, parseToStrLocalCity, parseToStrlocalFavorites };