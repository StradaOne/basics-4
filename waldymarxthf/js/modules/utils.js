import { list } from "../script.js"

export function isEmpty(taskText) {
	if (taskText.trim() === '') {
		return true;
	}
	return false;
}


//* функция проверки на пустую строку

export function getTaskIndex(taskElement) {
	const { textContent } = taskElement.querySelector('.priority-container__task-text');
	return list.findIndex(task => task.name === textContent);
}

//* функция нахождения индекса элемента