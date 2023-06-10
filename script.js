const ToDoList = [
	{TaskName: 'Make a cake', TaskStatus: 'to do'},
];

const input = document.querySelector('.plase');
const place = document.querySelector('.sp');
const form = document.querySelector('.input');
const deleteButton = document.querySelector('.icons');
const tasks = document.querySelector('.task');
const checkbosx = document.querySelector('.checkbox');

const Statuses = ['to do', 'in progress', 'done'];

const defautStatus = Statuses[0];

render();

function isTaskExist(taskContent){
	const taskExistence = ToDoList.find(Object => {
		return (Object['TaskName'] === taskContent)
	});
	return taskExistence;
}

function TaskIndex(taskContent){
	const TaskIndex = ToDoList.findIndex(Object =>
	Object['TaskName'] === taskContent)
	return TaskIndex;
}

function addTask(task, status = defautStatus){
	if(isTaskExist(task)){
		alert('уже есть')
	}
	else{
		const newObject = {
			'TaskName': task,
			'TaskStatus': status,
		};
		ToDoList.push(newObject);
		render();
	}
}

function deleteTask(task){
	if(isTaskExist(task)){
		ToDoList.splice(TaskIndex(task), 1)
	}
	else{
		alert('такого нет')
	}
}

function changeStatusTask(task, newStatus){
	if(isTaskExist(task)){
		ToDoList[TaskIndex(task)]['TaskStatus'] = newStatus;
	}
	else{
		alert('такого нет')
	}
}

form.addEventListener('submit', (event) => {event.preventDefault();
	const formData = new FormData(form);
  const task = formData.get('task');
	addTask(task);
	console.log(ToDoList)
})

place.addEventListener('click', function(event) {
	if (event.target.classList.contains('icons')) {
			event.stopPropagation();
			const deleteName = event.target.parentNode.children;
			deleteTask(deleteName[1].textContent);
			render();
	}
})

place.addEventListener('click', function(event) {
	if (event.target.classList.contains('checkbox')) {
			event.stopPropagation();
			const Check = event.target.parentNode.children;
			changeStatusTask(Check[1].textContent, 'done');
			console.log(ToDoList)
	}
})

function newElement(task){
	const Element = document.createElement('div');
	Element.innerHTML = `
		<input type="checkbox" class="checkbox">
		<div class="text">${task}</div>
		<img src="images/close-icon.svg" class="icons">
	`;
	Element.classList.add(`task`);
	return Element;
}

function render(){
	place.replaceChildren();
	ToDoList.forEach(function(task){
		const newElem = newElement(task.TaskName);
		place.appendChild(newElem);
		if (task.TaskStatus == "done"){
			newElem.querySelector('.checkbox').checked = true;
		}
	})
}
