import { UI_ELEMENTS } from './js/ui.js';
import { createItem } from './js/create.js';
import { showItemInList } from './js/show.js';

export const PRIORITIES = {
  LOW: 'low',
  HIGH: 'high',
  DEFAULT_PRIORITY: 'low',
};

export const STATUSES = {
  TODO: 'To Do',
  DONE: 'Done',
  DEFAULT_STATUS: 'To Do',
};

const ERROR_TASK_EXIST = 'Задача уже существует!';

let list = [
  {
    name: 'create a post',
    status: STATUSES.DONE,
    priority: PRIORITIES.LOW,
  },
  {
    name: 'testTest',
    status: STATUSES.DONE,
    priority: PRIORITIES.HIGH,
  },
  {
    name: 'make a bed',
    status: STATUSES.TODO,
    priority: PRIORITIES.HIGH,
  },
];

function isTaskExist(name) {
  const isValid = list.find(task => task.name === name);
  if (isValid) {
    alert(ERROR_TASK_EXIST);
    return;
  }
  return true;
}

function CreateTask(name, priority) {
  this.name = name;
  this.status = STATUSES.DEFAULT_STATUS;
  this.priority = priority;
}

function addTask(name, status, priority) {
  if (!isTaskExist(name)) {
    return;
  }

  const task = new CreateTask(name, priority);

  // list.push({
  //   name,
  //   status,
  //   priority,
  // });

  list.push(task);
  console.log(list);
}

export function deleteTask(name) {
  list = list.filter(item => item.name !== name);
  render();
}

function getTaskIndex(name) {
  const taskIndex = list.findIndex(task => task.name === name);
  if (taskIndex < 0) {
    return;
  }

  return taskIndex;
}

export function changeStatus(name) {
  const taskIndex = getTaskIndex(name);
  const currentStatus = list[taskIndex].status;
  if (currentStatus === STATUSES.TODO) {
    list[taskIndex].status = STATUSES.DONE;
  } else if (currentStatus === STATUSES.DONE) {
    list[taskIndex].status = STATUSES.TODO;
  }
  render();
}

function clearDom() {
  UI_ELEMENTS.LIST_HIGH.textContent = '';
  UI_ELEMENTS.LIST_LOW.textContent = '';
}

function render() {
  clearDom();
  list.forEach(item => {
    const task = createItem(item.name, item.status);
    showItemInList(task, item.priority);
  });
}

function formsSubmitHandler(event) {
  event.preventDefault();
  const isLowForm = event.target === UI_ELEMENTS.FORM_LOW;
  const isHighForm = event.target === UI_ELEMENTS.FORM_HIGH;
  const inputLowValue = UI_ELEMENTS.INPUT_LOW.value;
  const inputHighValue = UI_ELEMENTS.INPUT_HIGH.value;

  if (isHighForm) {
    addTask(inputHighValue, STATUSES.TODO, PRIORITIES.HIGH);
    render();
  }

  if (isLowForm) {
    addTask(inputLowValue, STATUSES.TODO, PRIORITIES.LOW);
    render();
  }
  event.target.reset();
}

document.addEventListener('DOMContentLoaded', render);
UI_ELEMENTS.TODO.addEventListener('submit', formsSubmitHandler);
