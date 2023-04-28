import { highForm, highTaskList, lowForm, lowTaskList, STATUSES, PRIORITIES, DEFAULT } from "./modules/ui-components.js"
import { isEmpty, getTaskIndex } from "./modules/utils.js";

export const list = []

function deleteTask(taskElement) {
	const index = getTaskIndex(taskElement)
	list.splice(index, 1);
	render()
}

//* функция которая удаляет таску из массива

function addTask(event, taskInput, taskPriority) {
	event.preventDefault();
	const formData = new FormData(taskInput);
	let taskText = formData.get(`${taskPriority}-priority-task`);

	if(isEmpty(taskText)) {
		console.error('Нельзя добавить пустую строку')
		return
	}

	list.push({
		name: taskText,
		status: DEFAULT.DEFAULT_STATUS,
		priority: taskPriority,
	})

	event.target.reset()
	render();
}

//* функция которая добавляет таску в массив

function changeStatus(taskElement) {
	const index = getTaskIndex(taskElement);
	const task = list[index];

	if (task.status === STATUSES.TODO) {
		task.status = STATUSES.DONE;
	} else {
		task.status = STATUSES.TODO;
	}

	render();
}

//* функция которая меняет статус задачи в массиве при нажатии на чекбокс

function createTaskElement(task) {
	const taskElement = document.createElement('div');
	taskElement.innerHTML = `
			<input type="checkbox" class="priority-container__checkbox">
			<p class="priority-container__task-text">${task.name}</p>
			<img src="./assets/close-icon.svg" alt="delete" class="priority-container__delete">
	`;
	taskElement.classList.add('priority-container__task');
	
	const deleteTaskButton = taskElement.querySelector('.priority-container__delete');
	deleteTaskButton.addEventListener('click', () => {
			deleteTask(taskElement);
	});
			
	const checkbox = taskElement.querySelector('.priority-container__checkbox');
	checkbox.addEventListener('change', () => {
			changeStatus(taskElement)
	});
	
	if (task.status === STATUSES.DONE) {
			checkbox.checked = true
			taskElement.classList.add('priority-container__task--done');
	}
	
	return taskElement;
}

//* функция которая создает блок с задачей, а также обрабатывает нажатие на удаление задачи и на изменение статуса

function render() {
	highTaskList.innerHTML = '';
	lowTaskList.innerHTML = '';

	for(let i = 0; i < list.length; i++) {
		const task = list[i];
		const taskList = task.priority === PRIORITIES.HIGH ? highTaskList : lowTaskList;
		const taskElement = createTaskElement(task);
		taskList.insertAdjacentElement('beforeend', taskElement)
	}
}

//* функция которая проходит по каждому объекту в массиве, очищает список и добавляет в список

highForm.addEventListener('submit', (event) => {
	try {
		addTask(event, highForm, PRIORITIES.HIGH)
	} catch(error) {
		console.error('Произошла ошибка при выполнении addTask:', error);
	}
})


lowForm.addEventListener('submit', (event) => {
	try {
		addTask(event, lowForm, PRIORITIES.LOW)
	} catch(error) {
		console.error('Произошла ошибка при выполнении addTask:', error);
	}
});