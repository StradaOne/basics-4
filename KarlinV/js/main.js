import { setTasksLocalStorage, getTasksLocalStorage } from "./localStorage.js";
import { createTask } from "./createTask.js";

const KEY_LOCAL_STORAGE = "taskMy";

const forms = document.querySelectorAll("form");
const highList = document.querySelector("#high-list");
const lowList = document.querySelector("#low-list");

const tasks = getTasksLocalStorage(KEY_LOCAL_STORAGE) || [];

for (const form of forms) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const taskName = form["task-name"].value;
    const priorityTask = form["task-name"].dataset["priority"];

    if (!taskName.trim()) {
      alert("Поле не должно быть пустым");
      return;
    }

    addTask(taskName, priorityTask);

    form["task-name"].value = "";
  });
}

const handleClick = (event) => {
  const element = event.target;
  const task = element.parentElement;
  const taskId = element.parentElement.getAttribute("id");

  if (element.classList.contains("todo__btn-delete-item")) {
    deleteTask(taskId);
  } else if (element.classList.contains("todo__item-screen")) {
    checkedTask(task, taskId);
  }
};

highList.addEventListener("click", handleClick);
lowList.addEventListener("click", handleClick);

const generateId = () => {
  const id = new Date().getTime();

  return `task-${id}`;
};

const containsTask = (searchValue) => {
  return tasks.findIndex((task) => task.name === searchValue) !== -1;
};

// const sortTask = () => {};

const addTask = (taskName, priorityTask) => {
  if (containsTask(taskName)) {
    alert("Такая задача уже существует");
    return;
  }

  const task = {
    name: taskName,
    done: false,
    priority: priorityTask,
    id: generateId(),
  };

  tasks.push(task);
  setTasksLocalStorage(KEY_LOCAL_STORAGE, tasks);
  render();
};

const deleteTask = (id) => {
  const index = tasks.findIndex((task) => task.id === id);

  tasks.splice(index, 1);
  setTasksLocalStorage(KEY_LOCAL_STORAGE, tasks);

  render();
};

const checkedTask = (taskEl, id) => {
  const taskObject = tasks.find((task) => task.id === id);

  if (taskEl.classList.contains("checked")) {
    taskEl.classList.remove("checked");

    if (taskObject && taskObject.done !== undefined) {
      taskObject.done = false;
      setTasksLocalStorage(KEY_LOCAL_STORAGE, tasks);
    }
  } else {
    taskEl.classList.add("checked");

    if (taskObject && taskObject.done !== undefined) {
      taskObject.done = true;
      setTasksLocalStorage(KEY_LOCAL_STORAGE, tasks);
    }
  }
};

const render = () => {
  highList.innerHTML = "";
  lowList.innerHTML = "";

  for (const task of tasks) {
    if (task.priority === "high") {
      highList.appendChild(createTask(task));
    } else if (task.priority === "low") {
      lowList.appendChild(createTask(task));
    } else {
      return;
    }
  }
};

render();
