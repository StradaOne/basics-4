export const getElement = (selector) => document.querySelector(selector)
export const createTag = (tag) => document.createElement(tag)

export const UI_ELEMENTS = {
  PRIORITY_HIGH: getElement('.task_priority_high'),
  PRIORITY_LOW: getElement('.task_priority_low'),
  INPUT_FORM_HIGHT: getElement('.task_form_high'),
  INPUT_FORM_LOW: getElement('.task_form_low'),
  INPUT_TEXT_HIGH: getElement('.input_text_high'),
  INPUT_TEXT_LOW: getElement('.input_text_low'),
}
