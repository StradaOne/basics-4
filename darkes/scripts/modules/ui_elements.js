const getElement = (css) => document.querySelector(css);

const ELEMENTS = {
   FORM: getElement('.header-container'),
   INPUT: getElement(".header__input"),
   TEMP: getElement(".main-info__degree"),
   MAIN_CITY: getElement('.main-info__town-name'),
   MAIN_IMG: getElement('.main-info__absolute-img'),
   LIKE_BUTTON: getElement('.main-info__add-favorite-town'),
   LIKE_CITIES: getElement('.rigth__item'),
};

export { ELEMENTS };