function getDomElement(selector) {
  return document.querySelector(selector);
}

export const UI_ELEMENTS = {
  TODO: getDomElement('.todo'),
  FORM_LOW: getDomElement('.todo__form--low'),
  FORM_HIGH: getDomElement('.todo__form--high'),
  INPUT_LOW: getDomElement('.todo__form-input--low'),
  INPUT_HIGH: getDomElement('.todo__form-input--high'),
  LIST_LOW: getDomElement('.todo__list--low'),
  LIST_HIGH: getDomElement('.todo__list--high'),
  TEMPLATE: getDomElement('.template'),
};
