function getElement(selector) {
  return document.querySelector(selector);
}

export const UI_ELEMENTS = {
  SEARCH_FORM: getElement('.search-form'),
  FORM_INPUT: getElement('.search-form__input'),
  NOW_TEMP: getElement('.now-content__temp'),
  NOW_CITY: getElement('.now-content__buttom-city'),
  NOW_ICON: getElement('.now-content__icon'),
};
