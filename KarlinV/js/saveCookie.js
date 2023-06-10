export const cookies = {
  setCurrentCity: function (city) {
    document.cookie = `currentCity=${city}; max-age=3600`;
  },

  getCurrentCity: function (key) {
    const data = document.cookie;
    const arrFromData = data.split(";");
    let startCity = null;

    for (let i = 0; i < arrFromData.length; i++) {
      const str = arrFromData[i].trim();

      if (str.startsWith(`${key}=`) && str.startsWith(`${key}=`) !== "") {
        startCity = str.substring(`${key}=`.length);
      }
    }

    return startCity;
  },
};
