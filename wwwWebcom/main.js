//---------------Константы
const STATUS = {
  TODO: "ToDo",
  IN_PROGRESS: "In Progress",
  DONE: "Done",
};

const PRIORITY = {
  LOW: "low",
  HIGH: "high",
};
//---------------Элементы
const inputHigh = document.querySelector(".add_input.high");
const inputLow = document.querySelector(".add_input.low");
const forms = document.querySelectorAll(".form");
const tasksHighDiv = document.querySelector(".toDoList_tasks.high");
const tasksLowDiv = document.querySelector(".toDoList_tasks.low");

const listOfTasks = [];
let countId = 0;

//-------------------------------------------------------------------------------------
function addTaskByPriority(input, priority, list) {
  if (event.target.classList.contains(priority)) {
    if (!input.value) return;
    const newTask = {
      name: input.value,
      status: STATUS.TODO,
      priority: priority,
    };
    list.push(newTask);
    console.log(list);
  }
}
function resetInput(input) {
  input.value = null;
}
function resetDom() {
  tasksHighDiv.innerHTML = "";
  tasksLowDiv.innerHTML = "";
}
function createElementsDOM(priorityDiv, task, status) {
  const newTask = document.createElement("div");
  const label = document.createElement("label");
  const inputCheckbox = document.createElement("input");
  const textTask = document.createElement("span");
  const deleteBtn = document.createElement("button");
  const deleteImg = document.createElement("img");
  newTask.classList.add("toDoList_task");
  inputCheckbox.type = "checkbox";
  textTask.textContent = task;
  deleteImg.src = "close-icon.svg";
  deleteBtn.classList.add("btn-del");
  deleteImg.id = `${countId}`;
  deleteBtn.id = `${countId++}`;
  inputCheckbox.name = task;

  newTask.appendChild(label);
  label.appendChild(inputCheckbox);
  label.appendChild(textTask);
  deleteBtn.appendChild(deleteImg);
  newTask.appendChild(deleteBtn);
  priorityDiv.appendChild(newTask);

  inputCheckbox.addEventListener("click", (event) => {
    changeStatus(deleteBtn.id);
    newTask.classList.toggle("done");
  });

  deleteBtn.addEventListener("click", deleteTask);

  if (status === STATUS.DONE) {
    newTask.classList.add("done");
    inputCheckbox.checked = true;
  }

  return priorityDiv;
}
//-------------------------------------------------------------------------------------

//--Добавление задачи--//
function addTask(event) {
  event.preventDefault();
  addTaskByPriority(inputHigh, PRIORITY.HIGH, listOfTasks);
  resetInput(inputHigh);
  addTaskByPriority(inputLow, PRIORITY.LOW, listOfTasks);
  resetInput(inputLow);
  render();
}

//--Удаление задачи--//

function deleteTask(event) {
  const indexButton = event.target.getAttribute("id");
  console.log(event.target);
  listOfTasks.splice(indexButton, 1);
  render();
}

//--Отрисовка задач--//
function render() {
  countId = 0;
  resetDom();
  for (let task of listOfTasks) {
    if (task.priority === PRIORITY.HIGH)
      createElementsDOM(tasksHighDiv, task.name, task.status);
    if (task.priority === PRIORITY.LOW)
      createElementsDOM(tasksLowDiv, task.name, task.status);
  }
}

//--Изменение статуса--//

function changeStatus(index) {
  const task = listOfTasks[index] 
  if(task.status === STATUS.TODO) {
    task.status = STATUS.DONE
  } else {
    task.status = STATUS.TODO
  }
}

for (let form of forms) {
  form.addEventListener("submit", addTask);
}

