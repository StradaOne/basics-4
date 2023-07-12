const highForm = document.querySelector('.high-priority-container__form');
const highTaskList = document.querySelector('.high-priority-container__list');
const lowForm = document.querySelector('.low-priority-container__form');
const lowTaskList = document.querySelector('.low-priority-container__list');

const STATUSES = {
	TODO: 'TODO',
	DONE: 'DONE'
}

const PRIORITIES = {
	HIGH: 'high',
	LOW: 'low'
}

const DEFAULT = {
	DEFAULT_STATUS: STATUSES.TODO
}

export { highForm, highTaskList, lowForm, lowTaskList, STATUSES, PRIORITIES, DEFAULT };