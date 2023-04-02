const STATUSES = {
  TODO: 'TODO',
  IN_PROGRESS: 'In Progress',
  DONE: 'Done',
  NO_TASK: '\n\tNothing is ',
};

const list = {
  'create a new practice task': 'In Progress',
  'make a coffe': 'Done',
  'todo is done': 'In Progress',
  'write a post': 'TODO',
  'create all function': 'In Progress',
  'make a bed': 'Done',
  'write a programm': 'TODO',
  'drink a beer': 'TODO',
};

function addTask(text) {
  if (!text) {
    return 'Task is not created. Please add text';
  } else {
    list[text] = STATUSES.TODO;
    return `Task added.`;
  }
}

function deleteTask(taskName) {
  if (!(taskName in list)) {
    return 'Task is not found.';
  } else {
    delete list[taskName];
    return 'Task deleted.';
  }
}

function editTask(text, status) {
  if (!(text in list)) {
    return 'Task is not found.';
  }
  if (status === STATUSES.TODO || status === STATUSES.IN_PROGRESS || status === STATUSES.DONE) {
    for (const searchTask in list) {
      if (searchTask === text) {
        list[searchTask] = status;
        return `[Task]: ${text}.\n[Status has changed on]: ${status}.`;
      }
    }
  } else {
    return `Task is not changed. Please enter correct status: ${STATUSES.TODO} || ${STATUSES.IN_PROGRESS} || ${STATUSES.DONE}.`;
  }
}

function showList() {
  let todo = '';
  let inProgress = '';
  let done = '';
  for (const getTask in list) {
    if (list[getTask] === STATUSES.TODO) {
      todo += `\n\t-"${getTask}"`;
    }
    if (list[getTask] === STATUSES.IN_PROGRESS) {
      inProgress += `\n\t-"${getTask}"`;
    }
    if (list[getTask] === STATUSES.DONE) {
      done += `\n\t-"${getTask}"`;
    }
  }
  return `[Task List]:
    <-TODO-> ${todo ? todo : STATUSES.NO_TASK + STATUSES.TODO}\n
    <-In Progress-> ${inProgress ? inProgress : STATUSES.NO_TASK + STATUSES.IN_PROGRESS}\n
    <-Done-> ${done ? done : STATUSES.NO_TASK + STATUSES.DONE}`;
}
