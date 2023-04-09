'use strict';

const colorText = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[36m',
  closed: '\x1b[0m',   
}

const taskStatus = {
  done: 'Выполнено',
  todo: 'Нужно сделать', 
  inProgress: 'В процессе',
}

const taskPriority = {
  high: 'Высокий',
  low: 'Низкий',
}

const errorMessage = {
  taskName: `${colorText.red}Некорректный формат задачи или задача не указана!${colorText.closed}`,
  status: `${colorText.red}Некорректный формат статуса или статус не указан!${colorText.closed}`,
  priority: `${colorText.red}Некорректный формат приоритета или приоритет не указан!${colorText.closed}`,
  error: `${colorText.red}Что-то пошло не так!${colorText.closed}`
}

const toDoList = [
  {name: 'Сходить в зал', status: taskStatus.done, priority: taskPriority.high}, 
  {name: 'Strada', status: taskStatus.inProgress, priority: taskPriority.high},
];

function taskNameValid(value) {
  if (typeof value !== 'string' || value === null) {
    console.log (errorMessage.taskName);
    return true;
  }
  return false;
}

function statusValid(value) {
  if (typeof value !== 'string' || value === null) {
    console.log(errorMessage.status);
    return true;
  }
  return false;
}

function priorityValid(value) {
  if (typeof value !== 'string' || value === null) {
    console.log(errorMessage.priority);
    return true;
  }
  return false;
}

function isTask(arr, value) {
  const index = arr.indexOf(value);
  if (index === -1) {
    console.log(`${colorText.red}Данной задачи не существует!${colorText.closed}`)
  }
}

function changeStatus(taskName = null, status = null, priority = null) {
  if (typeof taskName === 'string' && typeof status === 'string' && typeof priority === 'string') {
    let searchObj = toDoList.find(task => task.name === taskName);
    searchObj.status = status;
    searchObj.priority = priority;
    
    console.log(`\nЗадача ${colorText.green}"${taskName}"${colorText.closed} успешно изменена!`);
    console.log(`\tСтатус задачи: ${colorText.green}${status}${colorText.closed}`);
    console.log(`\tПриоритет задачи: ${colorText.green}${priority}${colorText.closed}`);
  }

  isTask(toDoList, taskName);
  taskNameValid(taskName);
  statusValid(status);
  priorityValid(priority);
}

function addTask(taskName, status = taskStatus.todo, priority = taskPriority.high) {
  if (typeof taskName === 'string' && typeof status === 'string' && typeof priority === 'string') {
    toDoList.push({name: taskName, status: status, priority: priority,});
    
    console.log(`\nЗадача ${colorText.green}"${taskName}"${colorText.closed} успешно добавлена!`);
    console.log(`\tСтатус задачи: ${colorText.green}${status}${colorText.closed}`);
    console.log(`\tПриоритет задачи: ${colorText.green}${priority}${colorText.closed}`);
  }

  taskNameValid(taskName);
  statusValid(status);
  priorityValid(priority);
}

function deleteTask(taskName) {
  if (typeof taskName === 'string') {
    let index = toDoList.findIndex(task => task.name === taskName);
    toDoList.splice(index, 1);

    console.log(`Задача ${colorText.green}"${taskName}"${colorText.closed} успешно удалена!`);
  }
  taskNameValid(taskName);
  isTask(toDoList, taskName);
}

function showList(list = null) {
  if (list === null) {
    console.log(`${colorText.yellow}Пожалуйста, укажите список задач, который вы хотите просмотреть!${colorText.closed}`)
  } else {
    console.log('Список задач:');
  console.log('-------------------------');
  list.forEach((task, index) => {
    console.log(`[${index}] ${task.name} - ${task.status}, ${task.priority}`);
  });
  console.log('-------------------------');
  }
  
}

showList(toDoList);


// console.log(toDoList);