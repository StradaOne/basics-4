
const UI_ELEMNTS = {
  FROM_HIGH: document.querySelector('.addHighForm'),
  INPUT_HIGH: document.querySelector('.addHighInput'),
  FORM_BTN: document.querySelector('.addHighButton'),
  LIST_TASKS_HIGH: document.querySelector('.list-taskHigh'),

  FROM_LOW: document.querySelector('.addLowForm'),
  INPUT_LOW: document.querySelector('.addLowInput'),
  FORM_BTN: document.querySelector('.addLowButton'),
  LIST_TASKS_LOW: document.querySelector('.list-taskLow'),

  DEL_BTN: document.querySelectorAll('.closeButton'),
 TIME: document.querySelector('.date')
}

const PRIOPITIES = {
	HIGH: 'High',
	LOW: 'Low'
}
const STATUS = {
	TODO: 'To do',
	DONE: 'Done'
}
export{UI_ELEMNTS,PRIOPITIES,STATUS}