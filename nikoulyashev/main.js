const STATUS = {
  toDo: 'To Do',
  inProgress: 'In Progress',
  done: 'Done',
}

const list = {
  "create a new practice task": STATUS.inProgress, 
  "make a bed": STATUS.done, // задача "заправить кровать" в статусе "Готово"
  "write a post": STATUS.toDo,
}

function changeStatus(taskName, status) {
  list[taskName] = status;
};

function addTask(taskName) {
  list[taskName] = STATUS.toDo;
};

function deleteTask(taskName) {
  delete list[taskName];
}

function showList() {
  let showToDo = '';
  let showInProgress = '';
  let showDone = '';

  for (task in list) {
    if (list[task] === STATUS.toDo) {
      showToDo += `  "${task}"\n`;
    } else if (list[task] === STATUS.inProgress) {
      showInProgress += `  "${task}"\n`;
    } else if (list[task] === STATUS.done) {
      showDone += `  "${task}"\n`;
    }
  }

  if (showToDo === '') {
    showToDo = '  -';
  }
  if (showInProgress === '') {
    showInProgress = '  -';
  }
  if (showDone === '') {
    showDone = '  -';
  }

  console.log(`${STATUS.toDo}:\n${showToDo}`);
  console.log(`${STATUS.inProgress}:\n${showInProgress}`);
  console.log(`${STATUS.done}:\n${showDone}`);
}




changeStatus("write a post", STATUS.done) // меняет статус задачи
addTask('have a walk'); // добавляет новую задачу
addTask('прочитать книгу');
deleteTask('have a walk'); // удаляет задачу

showList(); // показывает список всех задач