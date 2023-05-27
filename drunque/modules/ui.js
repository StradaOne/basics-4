const nowTab = document.querySelector("#now");
const detailsTab = document.querySelector("#details");
const forecast = document.querySelector("#forecast");
const form = document.querySelector("form");

const ui = {
  now: {
    tab: nowTab,
    temp: nowTab.querySelector("#now-temp"),
    image: nowTab.querySelector("#weather-image"),
    cityName: nowTab.querySelector("#now-city"),
    favButton: nowTab.querySelector("#now-button"),
  },
  details: {
    tab: detailsTab,
    temp: detailsTab.querySelector("#details-temp"),
    feelsLike: detailsTab.querySelector("#feels-like"),
    cityName: detailsTab.querySelector("#details-city"),
    weatherType: detailsTab.querySelector("#weather-type"),
    sunrise: detailsTab.querySelector("#sunrise-time"),
    sunset: detailsTab.querySelector("#sunset-time"),
  },
  forecast: {
    tab: forecast,
    list: forecast.querySelector(".forecast-list"),
    cityName: forecast.querySelector("#forecast-city"),
    forecastTemplate: forecast.querySelector("#forecast-template"),
    createContainer() {
      const template = this.forecastTemplate.content
      const containerTemplate = template.querySelector(".forecast-container")
      return containerTemplate.cloneNode(true);
    },
    getUI(node) {
      return {
        date: node.querySelector(".forecast-date"),
        time: node.querySelector(".forecast-time"),
        desc: node.querySelector(".forecast-desc"),
        temp: node.querySelector(".forecast-temp"),
        feelsLike: node.querySelector(".forecast-feels-like"),
        image: node.querySelector(".forecast-image"),
      };
    },
  },

  historyNode: document.querySelector(".history-list"),
  form: form,
  formInput: form.querySelector(`input[type="text"]`),
};
