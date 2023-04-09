//---------------------------------------------------КОНСТАНТЫ-----------------------------------------------------------
const STATUS = {
  TODO: "ToDo",
  IN_PROGRESS: "In Progress",
  DONE: "Done",
};

const MESSAGE = {
  STATUS_CHANGED: "Статус изменен!",
  ERROR_CHANGED_TASK: "Такой задачи не существует!",
  ADDED_TASK: "Задача добавлена!",
  ERROR_ADDED_TASK: "Такая задача уже есть!",
  DELETED_TASK: "Задача удалена!",
  ERROR_DELETED_TASK: "Такой задачи нет в списке!",
  PRIORITY_CHANGED: "Приоритет изменен!",
};

const PRIORITY = {
  LOW: "low priority",
  HIGH: "high priority",
  NOT_SELECTED: "not selected",
};

//-------------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------МАССИВ ДАННЫХ---------------------------------------------------------

const list = [
  { name: "create a post", status: STATUS.IN_PROGRESS, priority: PRIORITY.LOW },
  { name: "test", status: STATUS.DONE, priority: PRIORITY.HIGH },
];

//-------------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------ВАЛИДАЦИЯ-------------------------------------------------------------

function isTaskNameValid(task) {
  return list.map((obj) => obj.name).includes(task);
}

//-------------------------------------------------------------------------------------------------------------------------
//---------------------------------------Индекс объекта, состоящего в ToDo листе---------------------------------------------

function getIndexObj(task) {
  return list.findIndex((obj) => obj.name === task);
}

//-------------------------------------------------------------------------------------------------------------------------
//---------------------------------------ПОКАЗАТЬ ЗАДАЧИ С ЗАДАННЫМ СТАТУСОМ-----------------------------------------------

function showTaskByStatus(status) {
  let checkTask = true;
  console.log(`${status.toUpperCase()} ->\n`);
  list.filter((obj) => {
    if (obj.status === status) {
      console.log(`---------- ${obj.name} : ${obj.priority} ----------\n`);
      checkTask = false
    } 
  });
  if (checkTask) {
    console.log(`---------- NO TASKS! ----------\n`)
  }
}

//-------------------------------------------------------------------------------------------------------------------------
//--------------------------------------Функции для  работы с ToDo листом--------------------------------------------------

function addTask(name, status = STATUS.TODO, priority = PRIORITY.NOT_SELECTED) {
  if (!isTaskNameValid(name)) {
    list.push({ name, status, priority });
    console.log(MESSAGE.ADDED_TASK);
    return;
  } else {
    console.log(MESSAGE.ERROR_ADDED_TASK);
    return;
  }
}

function changeStatus(task, status) {
  if (!isTaskNameValid(task)) {
    console.log(MESSAGE.ERROR_CHANGED_TASK);
    return;
  } else {
    list[getIndexObj(task)].status = status;
    console.log(MESSAGE.STATUS_CHANGED);
    return;
  }
}

function changePriority(task, priority) {
  if (!isTaskNameValid(task)) {
    console.log(MESSAGE.ERROR_CHANGED_TASK);
    return;
  } else {
    list[getIndexObj(task)].priority = priority;
    console.log(MESSAGE.PRIORITY_CHANGED);
    return;
  }
}

function deleteTask(task) {
  if (isTaskNameValid(task)) {
    list.splice(getIndexObj(task), 1);
    console.log(MESSAGE.DELETED_TASK);
    return;
  } else {
    console.log(MESSAGE.ERROR_DELETED_TASK);
    return;
  }
}
function showList() {
  showTaskByStatus(STATUS.TODO);
  showTaskByStatus(STATUS.IN_PROGRESS);
  showTaskByStatus(STATUS.DONE);
}

//-------------------------------------------------------------------------------------------------------------------------
//----------------------------------------------ВЫЗОВ ФУНКЦИЙ--------------------------------------------------------------
addTask("go to sleep");
addTask("test");
changeStatus("go to sleep", STATUS.IN_PROGRESS);
deleteTask("go ");
changePriority('create a post', PRIORITY.HIGH)
addTask('buy a car')
changeStatus('buy a car', STATUS.DONE)
changePriority('buy a car',PRIORITY.LOW)
deleteTask('buy a car')
addTask('meditation')
changePriority('meditation', PRIORITY.HIGH)
changePriority('go to sleep', PRIORITY.LOW)
deleteTask('test')
showList();
//-------------------------------------------------------------------------------------------------------------------------
