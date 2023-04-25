import { highForm, highTaskList, lowForm, lowTaskList } from "./modules/variables.js"
import { isEmpty } from "./modules/validation.js";

function createTaskElement(taskText) {
	const taskElement = document.createElement('div');
	taskElement.innerHTML = `
		<input type="checkbox" class=" priority-container__checkbox">
		<p class=" priority-container__task-text">${taskText}</p>
		<img src="./assets/close-icon.svg" alt="delete" class=" priority-container__delete">
	`;
	taskElement.classList.add(`priority-container__task`);
	return taskElement;
}

//* функция создает образец блока с таской

function addTask(event, taskList, taskInput, taskPriority) {
	event.preventDefault();
	const formData = new FormData(taskInput);
	let taskText = formData.get(`${taskPriority}-priority-task`);
	if(!isEmpty(taskText)) {
		alert('Нельзя добавить пустую строку')
		return
	}
	const newTask = createTaskElement(isEmpty(taskText));
	taskList.insertAdjacentElement('beforeend', newTask);
	event.target.reset()
}

//* функция доставания значение с формы и добавление блока с таской

highForm.addEventListener('submit', (event) => addTask(event, highTaskList, highForm, 'high'));
lowForm.addEventListener('submit', (event) => addTask(event, lowTaskList, lowForm, 'low'));