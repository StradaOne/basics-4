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
};

function isTaskNameValid(task) {
  if (task in toDoList.tasks) {
    return true;
  }
  return false;
}

function showStatus(status) {
  let showTask = "";
  console.log(`${status}:`);
  for (let task in toDoList.tasks) {
    if (toDoList.tasks[task] === status) {
      console.log("\t", task);
      showTask = "!";
    }
  }
  if (showTask === "") console.log("\t -");
}

const toDoList = {
  tasks: {
    "wake up": STATUS.TODO,
    "brush teeth": STATUS.TODO,
  },
  changeStatus(task, status) {
    if (isTaskNameValid(task)) {
      this.tasks[task] = status;
      console.log(MESSAGE.STATUS_CHANGED);
    } else {
      console.log(MESSAGE.ERROR_CHANGED_TASK);
    }
  },
  addTask(task,status = STATUS.TODO) {
    if (!isTaskNameValid(task)) {
      this.tasks[task] = status;
      console.log(MESSAGE.ADDED_TASK);
    } else {
      console.log(MESSAGE.ERROR_ADDED_TASK);
    }
  },
  deleteTask(task) {
    if (isTaskNameValid(task)) {
      delete this.tasks[task];
      console.log(MESSAGE.DELETED_TASK);
    } else {
      console.log(MESSAGE.ERROR_DELETED_TASK);
    }
  },
  showTasks() {
    showStatus(STATUS.TODO);
    showStatus(STATUS.IN_PROGRESS);
    showStatus(STATUS.DONE);
  },
};

// Добавление задачи
toDoList.addTask("learn English");
toDoList.addTask("learn Programming");
toDoList.addTask("go to sleep");

// Изменение статуса
toDoList.changeStatus("wake up", STATUS.DONE);
toDoList.changeStatus("learn Programming", STATUS.DONE);
toDoList.changeStatus("go to sleep", STATUS.DONE);

// Удаление задачи
toDoList.deleteTask("brush teeth");
toDoList.deleteTask("wake up")

//Показать текущие задачи
toDoList.showTasks();
