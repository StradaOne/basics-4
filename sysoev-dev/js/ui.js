function getElement(selector) {
  return document.querySelector(selector);
}

export const UI_ELEMENTS = {
  TABS: document.querySelectorAll('.tabs__buttons-link'),
  DELETE_FAVORITES_BTN: document.querySelectorAll('.locations__item-button'),
  SEARCH_FORM: getElement('.search-form'),
  FORM_INPUT: getElement('.search-form__input'),
  NOW_TEMP: getElement('.now-content__temp'),
  NOW_CITY: getElement('.now-content__buttom-city'),
  NOW_ICON: getElement('.now-content__icon'),
  LIKE_BTN: getElement('.now-content__buttom-btn'),
  FAVORITES_LIST: getElement('.locations__list'),
  DETAILS_CITY: getElement('.details__city'),
  DETAILS_TEMP: getElement('.details__item-temp--value'),
  DETAILS_FEELS: getElement('.details__item-feels--value'),
  DETAILS_WEATHER: getElement('.details__item-weather--value'),
  DETAILS_SUNRISE: getElement('.details__item-sunrise--value'),
  DETAILS_SUNSET: getElement('.details__item-sunset--value'),
};
