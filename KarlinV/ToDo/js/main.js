import { errorHandlers } from "./ErrorsHandlers.js";
import { emptyName, containsTask, readTask } from "./ValidationUtils.js";
import { setTasksLocalStorage, getTasksLocalStorage } from "./localStorage.js";
import { createTask } from "./createTask.js";
import { Task } from "./Task.js";

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

    try {
      const name = emptyName(taskName);

      addTask(name, priorityTask);
    } catch (error) {
      if (error instanceof errorHandlers.EmptyTaskError) {
        alert(error);
      } else {
        throw error;
      }
    } finally {
      form["task-name"].value = "";
    }
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

const addTask = (taskName, priorityTask) => {
  try {
    if (containsTask(tasks, taskName)) {
      throw new errorHandlers.DuplicateTaskError();
    }

    const task = new Task(taskName, priorityTask);

    tasks.push(task);
    setTasksLocalStorage(KEY_LOCAL_STORAGE, tasks);

    render();
  } catch (error) {
    if (error instanceof errorHandlers.DuplicateTaskError) {
      alert(error);
    } else {
      throw error;
    }
  }
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

const preСheck = (task) => {
  try {
    readTask(task);
  } catch (error) {
    if (!task.priority || !task.done) alert(error + " в задаче " + task.name);
    console.error(error);
  } finally {
    if (task.priority === "high") {
      highList.appendChild(createTask(task));
    }

    if (task.priority === "low") {
      lowList.appendChild(createTask(task));
    }
  }
};

const render = () => {
  highList.innerHTML = "";
  lowList.innerHTML = "";

  for (const task of tasks) {
    preСheck(task);
  }
};

render();
