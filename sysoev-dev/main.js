const TODO_STATUSES = {
  TODO: 'To Do',
  IN_PROGRESS: 'In Progress',
  DONE: 'Done',
  DEFAULT_STATUS: 'To Do',
};

const TODO_PRIORITIES = {
  LOW: 'low',
  HIGH: 'high',
  DEFAULT_PRIORITY: 'low',
};

const ERROR_STATUSES = {
  EXISTS: 'The task exists',
  NOT_FOUND: 'Task not found',
  BAD_TITLE: 'Task title is empty',
  BAD_STATUS: 'Task status not supported',
  BAD_PRIORITY: 'Task priority not supported',
};

let list = [
  {
    name: 'create a post',
    status: TODO_STATUSES.IN_PROGRESS,
    priority: TODO_PRIORITIES.LOW,
  },
  {
    name: 'testTest',
    status: TODO_STATUSES.DONE,
    priority: TODO_PRIORITIES.HIGH,
  },
  {
    name: 'make a bed',
    status: TODO_STATUSES.TODO,
    priority: TODO_PRIORITIES.HIGH,
  },
];

function getTaskIndex(name) {
  const taskIndex = list.findIndex(task => task.name === name);
  if (taskIndex < 0) {
    console.log(ERROR_STATUSES.NOT_FOUND);
    return;
  }

  return taskIndex;
}

function isTaskExist(name) {
  const isValid = list.find(task => task.name === name);
  if (!isValid) {
    console.log(ERROR_STATUSES.NOT_FOUND);
    return;
  }
  return true;
}

function isNameValid(name) {
  if (!name) {
    console.log(ERROR_STATUSES.BAD_TITLE);
    return;
  }
  return true;
}

function isStatusValid(status) {
  const isValid = Object.values(TODO_STATUSES).includes(status);
  if (!isValid) {
    console.log(ERROR_STATUSES.BAD_STATUS);
    return;
  }

  return true;
}

function isPriorityValid(priority) {
  const isValid = Object.values(TODO_PRIORITIES).includes(priority);
  if (!isValid) {
    console.log(ERROR_STATUSES.BAD_PRIORITY);
    return;
  }

  return true;
}

function addTask(name, status = TODO_STATUSES.DEFAULT_STATUS, priority = TODO_PRIORITIES.DEFAULT_PRIORITY) {
  if (!isNameValid(name)) {
    return;
  }

  if (!isStatusValid(status)) {
    return;
  }

  if (!isPriorityValid(priority)) {
    return;
  }

  list.push({
    name,
    status,
    priority,
  });
}

function changeStatus(name, status) {
  const taskIndex = getTaskIndex(name);
  if (!isTaskExist(name)) {
    return;
  }

  if (!isStatusValid(status)) {
    return;
  }

  list[taskIndex].status = status;
}

function changePriority(name, priority) {
  const taskIndex = getTaskIndex(name);

  if (!isTaskExist(name)) {
    return;
  }

  if (!isPriorityValid(priority)) {
    return;
  }

  list[taskIndex].priority = priority;
}

function deleteTask(name) {
  if (!isTaskExist(name)) {
    return;
  }

  list = list.filter(item => item.name !== name);
}

function showList(method) {
  if (method === 'status') {
    const todoArr = list.filter(item => item.status === TODO_STATUSES.TODO);
    const inProgressArr = list.filter(item => item.status === TODO_STATUSES.IN_PROGRESS);
    const doneArr = list.filter(item => item.status === TODO_STATUSES.DONE);
    let strTodo = '';
    let strInProgress = '';
    let strDone = '';
    todoArr.forEach(item => {
      strTodo += '\n   ' + item.name;
    });
    inProgressArr.forEach(item => {
      strInProgress += '\n   ' + item.name;
    });
    doneArr.forEach(item => {
      strDone += '\n   ' + item.name;
    });

    strTodo = strTodo || '\n   -';
    strInProgress = strInProgress || '\n   -';
    strDone = strDone || '\n   -';

    console.log(`${TODO_STATUSES.TODO}: ${strTodo}`);
    console.log(`${TODO_STATUSES.IN_PROGRESS}: ${strInProgress}`);
    console.log(`${TODO_STATUSES.DONE}: ${strDone}`);
  }
  if (method === 'priority') {
    const highPriorityArr = list.filter(item => item.priority === TODO_PRIORITIES.HIGH);
    const lowPriorityArr = list.filter(item => item.priority === TODO_PRIORITIES.LOW);
    let strHighTasks = '';
    let strLowTasks = '';

    highPriorityArr.forEach(item => {
      strHighTasks += '\n   ' + item.name;
    });
    lowPriorityArr.forEach(item => {
      strLowTasks += '\n   ' + item.name;
    });

    strHighTasks = strHighTasks || '\n   -';
    strLowTasks = strLowTasks || '\n   -';

    console.log(`${TODO_PRIORITIES.HIGH}: ${strHighTasks}`);
    console.log(`${TODO_PRIORITIES.LOW}: ${strLowTasks}`);
  }
}

addTask('Sleep', TODO_STATUSES.DONE, TODO_PRIORITIES.HIGH);
// deleteTask('testTest');
// deleteTask('Sleep');
showList('priority');
