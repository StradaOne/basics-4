export const storage = {
  setFavoriteCities: function (cities) {
    try {
      localStorage.setItem("favoriteCities", JSON.stringify(cities));
    } catch (error) {
      console.error("Error saving favorite cities to local storage", error);
    }
  },

  getFavoriteCities: function () {
    try {
      const cities = localStorage.getItem("favoriteCities");
      return cities ? JSON.parse(cities) : [];
    } catch (error) {
      console.error("Error getting favorite cities from local storage", error);
      return [];
    }
  },

  setCurrentCity: function (city) {
    try {
      localStorage.setItem("currentCity", city);
    } catch (error) {
      console.error("Error setting current city in local storage", error);
    }
  },

  getCurrentCity: function () {
    try {
      return localStorage.getItem("currentCity");
    } catch (error) {
      console.error("Error getting current city from local storage", error);
      return null;
    }
  },
};
