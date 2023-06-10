export const storage = {
  saveFavoriteCities(favoritesCities) {
    const json = JSON.stringify([...favoritesCities]);
    localStorage.setItem('favoriteCities', json);
  },
  saveCurrentCity(cityName) {
    localStorage.setItem('currentCity', cityName);
    document.cookie = `city=${encodeURIComponent(cityName)}; max-age=3600`;
  },
  getFavoriteCities() {
    const json = localStorage.getItem('favoriteCities');
    return new Set(JSON.parse(json)) || new Set();
  },
  getCurrentCity() {
    const name = 'city';
    const matches = document.cookie.match(new RegExp(
      `(?:^|; )${name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1')}=([^;]*)`,
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
  },
};
