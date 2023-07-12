const inputHighNode = document.querySelector('.form-high') as HTMLInputElement || null
const inputLowNode = document.querySelector('.form-low') as HTMLInputElement || null
const highTasksNode = document.querySelector('.high-tasks') as HTMLElement || null
const lowTasksNode = document.querySelector('.low-tasks') as HTMLElement || null
const inputHighTaskNode = document.querySelector('.input-task-high') as HTMLFormElement || null
const inputLowTaskNode = document.querySelector('.input-task-low') as HTMLFormElement || null

import { changeStatus, removeTask, addTask, statuses, priorities, list } from './logicTask'; 

function closeBtnActions(taskName: string) {
  removeTask(taskName);
  render();
}

function checkboxActions(checkbox: HTMLInputElement, taskName: string) {
  const isChecked = checkbox.checked;
  changeStatus(taskName, isChecked ? statuses.DONE : statuses.TODO);
  render();
}

/* Создание HTML элемента задачи */
function createTaskNode(text: string, status: string) {
  const newTask = document.createElement('div');
  newTask.classList.add('task');
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  const textTask = document.createElement('p');
  textTask.innerText = text;
  const label = document.createElement('label');
  const closeBtnImg = document.createElement('img');
  closeBtnImg.src = './img/close-icon (1).svg';
  const closeBtnNode = document.createElement('button');
  closeBtnNode.appendChild(closeBtnImg);

  /* Вешаем слушатель на кнопку закрытия */
  closeBtnNode.addEventListener('click', closeBtnActions.bind(null, text))
  /* Вешаем слушатель на чекбокс */
  checkbox.addEventListener('change', checkboxActions.bind(null, checkbox, text));

  /* Делаем так чтобы при рендере выполненные задачи оставались выполненными */
  if (status === statuses.DONE) {
    newTask.classList.add('done-task');
    checkbox.checked = true;
  }

  /* Собираем все воедино */
  label.appendChild(checkbox);
  label.appendChild(textTask);
  newTask.appendChild(label);
  newTask.appendChild(closeBtnNode);
  return newTask;
}

/* Функция рендера задач */
function render() {
  highTasksNode.innerHTML = '';
  lowTasksNode.innerHTML = '';

  for (const el of list) {
    const nodeForAddTask = el.priority == priorities.HIGH ? highTasksNode : lowTasksNode;
    const task = createTaskNode(el.name, el.status);
    nodeForAddTask.appendChild(task);
  }
}
/* Функции добавления задач при отправке форм */
function addTaskHigh(event: Event) {
  event.preventDefault();
  addTask(inputHighTaskNode.value, statuses.TODO, priorities.HIGH);
  inputHighTaskNode.value = '';
  render();
}

function addTaskLow(event: Event) {
  event.preventDefault();
  addTask(inputLowTaskNode.value, statuses.TODO, priorities.LOW)
  inputLowTaskNode.value = '';
  render();
}

inputHighNode.addEventListener('submit', addTaskHigh)
inputLowNode.addEventListener('submit', addTaskLow)

//render()
