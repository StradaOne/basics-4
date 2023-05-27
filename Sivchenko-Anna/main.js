const STATUS = {
  TODO: "To Do",
  DONE: "Done",
};

const PRIORITY = {
  HIGH: "High",
  LOW: "Low",
};

const formHigh = document.querySelector(".high-priority-container__form");
const formLow = document.querySelector(".low-priority-container__form");
const formHighInput = document.querySelector(".high-priority-container__form-input");
const formLowInput = document.querySelector(".low-priority-container__form-input");
const listHigh = document.querySelector(".priority-container-high");
const listLow = document.querySelector(".priority-container-low");
const toDoList = [];

//* функция проверки на пустую строку

function isInputEmpty(task) {
  return !task.trim();
}

//* функция проверки на наличие задачи в списке

function isTaskExist(task) {
  if (toDoList.find((item) => item.name === task)) {
    console.log(`Задача '${task}' уже есть в списке`);
    return false;
  }
  return true;
}

//* функция нахождения индекса задачи в массиве

function findIndexOfTask(task) {
  return toDoList.findIndex((item) => item.name === task);
}

//* функция-конструктор задачи

function CreateTask(task, priority) {
  this.name = task;
  this.status = STATUS.TODO;
  this.priority = priority;
}

//* функция добавления задачи в массив и вывод ошибок

function addTask(task, priority) {
  try {
    if (isInputEmpty(task)) {
      throw new Error('Введите задачу')
    }

    if (!isTaskExist(task)) {
      throw new Error(`Задача '${task}' уже есть в списке`);
    }

    const newTask = new CreateTask(task, priority);
    toDoList.push(newTask);
  }
  catch(err) {
    alert(err.message);
    return;
  }
}

//* функция удаления задачи из массива

function deleteTask(task) {
  const deleteTaskIndex = findIndexOfTask(task);
  toDoList.splice(deleteTaskIndex, 1);
  console.log(`Задачи '${task}' успешно удалена`);
  render();
}

//* функция изменения статуса задачи в массиве

function changeStatus(task, status) {
  const taskIndex = findIndexOfTask(task);
  toDoList[taskIndex].status = status;
  render();
  return;
}

//* функция изменения чекбокса

function checkboxActions(checkbox, task) {
  const isChecked = checkbox.checked;
  changeStatus(task, isChecked ? STATUS.DONE : STATUS.TODO);
  render();
}

//* функция создания блока задачи

function createTaskList(text, status) {
  const newTask = document.createElement("div");
  newTask.classList.add("priority-container__task");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.classList.add("priority-container__checkbox");

  const taskText = document.createElement("p");
  taskText.classList.add("priority-container__task-text");
  taskText.innerText = text;

  const btnClose = document.createElement("button");
  btnClose.classList.add("priority-container__form-button");

  const btnCloseImg = document.createElement("img");
  btnCloseImg.src = "./assets/close-icon.svg";
  btnCloseImg.classList.add("priority-container__delete");

  btnClose.appendChild(btnCloseImg);

  /* Cлушатель на кнопку закрытия задания и на чекбокс */
  btnClose.addEventListener("click", deleteTask.bind(null, text));
  checkbox.addEventListener(
    "change",
    checkboxActions.bind(null, checkbox, text)
  );

  if (status === STATUS.DONE) {
    checkbox.checked = true;
  }

  /* Собираем элемент задачи */
  newTask.appendChild(checkbox);
  newTask.appendChild(taskText);
  newTask.appendChild(btnClose);

  return newTask;
}

//* Функция рендера задач 

function render() {
  listHigh.innerHTML = '';
  listLow.innerHTML = '';

  for (const elem of toDoList) {
    const nodeForAddTask = elem.priority == PRIORITY.HIGH ? listHigh : listLow;
    const task = createTaskList(elem.name, elem.status);

    nodeForAddTask.appendChild(task);
  }
}

//* Функция добавления задачи при отправке формы

function addHighTask(event) {
  event.preventDefault();
  addTask(formHighInput.value, PRIORITY.HIGH);
  clearInput(formHighInput);
  render();
}

function addLowTask(event) {
  event.preventDefault();
  addTask(formLowInput.value, PRIORITY.LOW);
  clearInput(formLowInput);
  render();
}

//* Функция очистки поля ввода задачи

function clearInput(formInput) {
  formInput.value = "";
}

formHigh.addEventListener("submit", addHighTask);
formLow.addEventListener("submit", addLowTask);