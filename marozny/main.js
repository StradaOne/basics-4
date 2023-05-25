import { PRIORITY, STATUS, formHigh, formLow, highInput, highTask, list, lowInput, lowTask } from "./constants.js";

function CreateTask(name, priority) {
  this.name = name;
  this.priority = priority;
  this.status = STATUS.TODO;
}

function addTask(task) {
  list.push(task);
}

const changeStatus = (name, status) => {
  const indexTask = list.findIndex((task) => task.name === name);
  list[indexTask].status = status;
};

const deleteTask = (name) => {
  const indexTask = list.findIndex((task) => task.name === name);
  list.splice(indexTask, 1);
};

function render() {
  highTask.innerHTML = "";
  lowTask.innerHTML = "";
  for (let task of list) {
    if (task.priority === PRIORITY.HIGH) {
      createUI(task.name, task.status, highTask);
    }
    if (task.priority === PRIORITY.LOW) {
      createUI(task.name, task.status, lowTask);
    }
  }
}

function createUI(name, status, priority) {
  const containerTask = document.createElement("div");
  const labelTask = document.createElement("label");
  const statusTask = document.createElement("input");
  const textTask = document.createElement("span");
  const deleteTaskButton = document.createElement("button");

  containerTask.classList.add("task");
  statusTask.classList.add("checkbox");
  statusTask.type = "checkbox";
  textTask.classList.add("task_text");
  textTask.textContent = name;
  deleteTaskButton.classList.add("button_close_task");
  deleteTaskButton.textContent = "×";

  priority.appendChild(containerTask);
  containerTask.appendChild(labelTask);
  labelTask.appendChild(statusTask);
  labelTask.appendChild(textTask);
  containerTask.appendChild(deleteTaskButton);

  if (status === STATUS.DONE) {
    statusTask.setAttribute("checked", true);
  }
  deleteTaskButton.addEventListener("click", () => {
    deleteTask(name);
    render();
  });
  statusTask.addEventListener("change", () => {
    changeStatus(name, statusTask.checked ? STATUS.DONE : STATUS.TODO);
    render();
  });
}

formHigh.addEventListener("submit", (event) => {
  event.preventDefault();
  const task = new CreateTask(highInput.value, PRIORITY.HIGH);
  addTask(task);
  render();
  formHigh.reset();
});

formLow.addEventListener("submit", (event) => {
  event.preventDefault();
  const task = new CreateTask(lowInput.value, PRIORITY.LOW);
  addTask(task);
  render();
  formLow.reset();
});
