const TODO_STATUSES = {
  TODO: 'To Do',
  IN_PROGRESS: 'In Progress',
  DONE: 'Done',
  DEFAULT_STATUS: 'To Do',
};

const ERROR_STATUSES = {
  EXISTS: 'The task exists',
  NOT_FOUND: 'Task not found',
  BAD_TITLE: 'Task title is empty',
  BAD_STATUS: 'Task status not supported',
};

const list = {
  'create a new practice task': TODO_STATUSES.IN_PROGRESS,
  'make a bed': TODO_STATUSES.DONE,
  'write a post': TODO_STATUSES.TODO,
  'test': TODO_STATUSES.TODO,
};

function isTaskNameValid(taskName) {
  if (!taskName) {
    console.log(ERROR_STATUSES.BAD_TITLE);
    return;
  }

  return true;
}

function isTaskStatusValid(taskStatus) {
  for (const key in TODO_STATUSES) {
    if (taskStatus === TODO_STATUSES[key]) {
      return true;
    }
  }

  console.log(ERROR_STATUSES.BAD_STATUS);
  return;
}

function isTaskExist(taskName) {
  if (!taskName in list) {
    console.log(ERROR_STATUSES.NOT_FOUND);
    return;
  }
  return true;
}

function addTask(taskName, taskStatus = TODO_STATUSES.DEFAULT_STATUS) {
  if (!isTaskNameValid(taskName)) {
    return;
  }

  if (!isTaskStatusValid(taskStatus)) {
    return;
  }

  list[taskName] = taskStatus;
}

function changeStatus(taskName, newStatus) {
  if (!isTaskExist(taskName)) {
    return;
  }

  if (!isTaskStatusValid(newStatus)) {
    return;
  }

  list[taskName] = newStatus;
}

function deleteTask(taskName) {
  delete list[taskName];
}

function showList() {
  let strToDo = '';
  let strInProgress = '';
  let strDone = '';

  for (const name in list) {
    switch (list[name]) {
      case TODO_STATUSES.TODO:
        strToDo += '\n   ' + name;
        break;
      case TODO_STATUSES.IN_PROGRESS:
        strInProgress += '\n   ' + name;
        break;
      case TODO_STATUSES.DONE:
        strDone += '\n   ' + name;
        break;
      default:
        break;
    }
  }

  strToDo = strToDo || '\n   -';
  strInProgress = strInProgress || '\n   -';
  strDone = strDone || '\n   -';

  console.log(`${TODO_STATUSES.TODO}: ${strToDo}`);
  console.log(`${TODO_STATUSES.IN_PROGRESS}: ${strInProgress}`);
  console.log(`${TODO_STATUSES.DONE} ${strDone}`);
}

changeStatus('make a bed', TODO_STATUSES.TODO);
changeStatus('test', TODO_STATUSES.IN_PROGRESS);
deleteTask('make a bed');
changeStatus('write a post', TODO_STATUSES.DONE);
addTask('Qwerty', TODO_STATUSES.DEFAULT_STATUS);
changeStatus('Qwerty', TODO_STATUSES.DONE);
showList();
console.log(list);
