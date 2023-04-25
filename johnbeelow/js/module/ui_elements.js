export const DOM = {
  GET_ELEMENT: (selector) => document.querySelector(selector),
  CREATE_TAG: (tag) => document.createElement(tag),
}

export const UI_ELEMENTS = {
  PRIORITY_HIGH: DOM.GET_ELEMENT('.task_priority_high'),
  PRIORITY_LOW: DOM.GET_ELEMENT('.task_priority_low'),
  INPUT_FORM_HIGHT: DOM.GET_ELEMENT('.task_form_high'),
  INPUT_FORM_LOW: DOM.GET_ELEMENT('.task_form_low'),
  INPUT_TEXT_HIGH: DOM.GET_ELEMENT('.input_text_high'),
  INPUT_TEXT_LOW: DOM.GET_ELEMENT('.input_text_low'),
}
