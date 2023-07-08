export const storage = {
  saveFavoriteCities(favoritesCities) {
    const json = JSON.stringify([...favoritesCities]);
    localStorage.setItem('favoriteCities', json);
  },
  saveCurrentCity(cityName) {
    localStorage.setItem('currentCity', cityName);
  },
  getFavoriteCities() {
    const json = localStorage.getItem('favoriteCities');
    return new Set(JSON.parse(json)) || new Set();
  },
  getCurrentCity() {
    return localStorage.getItem('currentCity') || 'Aktobe';
  },
};
