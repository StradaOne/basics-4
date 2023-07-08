const statuses = {
  TODO: 'ToDo',
  DONE: 'Done',
}

const priorities = {
  HIGH: 'high',
  LOW: 'low',
}

const errors = {
  taskIsNotExists: 'Задачи не существует',
  taskIsExists: 'Задача уже существует',
  priorityIsNotExists: 'Такого приоритета не существует',
  statusIsNotExists: 'Такого статуса не существует',
}

const messages = {
  changeStatus: 'Статус задачи изменён',
  changePriority: 'Приоритет задачи изменён',
  addTask: 'Задача добавлена',
  deleteTask: 'Задача удалена',
}

let list = [];

function saveTasksInLocalStorage() {
  localStorage.setItem('tasks', JSON.stringify(list));
}

function loadTasksFromLocalStorage() {
  const tasks = localStorage.getItem('tasks');
  if (tasks) {
    list = JSON.parse(tasks);
  }
}

const isEmpty = (task) => { return !task.trim(); };

function isTaskExists(name) {
  return list.map(t => t.name).includes(name);
}

function indexOfTask(task) {
  return list.findIndex(t => t.name === task);
}

function isPriorityExists(priority) {
  return Object.values(priorities).includes(priority);
}

function isStatusExists(status) {
  return Object.values(statuses).includes(status);
}

/* Добавление задачи в массив */
function addTask(taskName, status = statuses.TODO, priority = priorities.LOW) {
  try {
    if (isTaskExists(taskName)) {
      throw new Error('Такая задача уже есть!');
    }
    if (isEmpty(taskName)) {
      throw new Error('Вы пытаетесь добавить пустую задачу!');
    }
    const task = {
      name: taskName,
      status,
      priority
    };
    list.push(task);
    saveTasksInLocalStorage();
  } catch(err) {
    if (err.name == 'Error') {
      alert(err.message);
    }
  }
}

/* Удаление задачи из массива */
function removeTask(task) {
  if (!isTaskExists(task)) {
    console.log(errors.taskIsNotExists); // ошибка для разработчика (у пользователя ее возникнуть не может)
    return;
  }
  const indexTask = indexOfTask(task);
  list.splice(indexTask, 1);
  saveTasksInLocalStorage();
  return;
}

/* Изменение статуса задачи */
function changeStatus(task, status) {
  if (!isTaskExists(task)) {
    console.log(errors.taskIsNotExists); // ошибка для разработчика
    return;
  }
  if (!isStatusExists(status)) {
    console.log(errors.statusIsNotExists); // ошибка для разработчика 
    return;
  }
  const indexTask = indexOfTask(task);
  list[indexTask].status = status;
  saveTasksInLocalStorage();
  render();
  return;
}
