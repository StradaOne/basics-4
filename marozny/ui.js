const getElement = (element) => document.querySelector(element);
const UI_ELEMENTS = {
  TABS: document.querySelectorAll(".tabs__item"),
  WEATHER_BLOCK: document.querySelectorAll(".weather__block"),
  SEARCH_FORM: getElement(".weather__search-form"),
  INPUT_CITY: getElement(".weather__search-form-input"),
  TEMP: getElement(".weather__block-temp"),
  CURRENT_CITY: getElement(".weather__block-content-city"),
  CURRENT_ICON: getElement(".weather__block-cloud"),
};

export { UI_ELEMENTS };
