const Status_TODO = {
  INPROGRESS: "In Progress",
  TODO: "To Do",
  DONE: "Done",
};
const Priority_TODO = {
  LOW: "Low",
  MEDIUM: "Medium",
  HIGH: "High",
  DEFAULT: "-",
};
const ERROR = {
  TASKNAME: "Incorrect task",
  TASKSTATUS: "Incorrect status",
  TASKPRIORITY: "Incorrect priority",
  NOTFOUND: "Task not found",
};
const TASK1 = "Make ToDo";
const TASK2 = "Love your mom";
const TASK3 = "Eat ass";
const TASK4 = "Sleep";

const todoArrays = [
  {
    task: TASK1,
    status: Status_TODO.INPROGRESS,
    priority: Priority_TODO.HIGH,
  },
  {
    task: TASK2,
    status: Status_TODO.TODO,
    priority: Priority_TODO.MEDIUM,
  },
];

function isValidExist(task) {
  const exist = todoArrays.find((name) => name.task === task);
  if (!exist) {
    console.log(ERROR.NOTFOUND);
    return;
  }
  return true;
}

function isValidTask(task) {
  if (
    !task ||
    task === "" ||
    task === NaN ||
    task === Priority_TODO ||
    task === Status_TODO
  ) {
    console.log(ERROR.TASKNAME);
    return;
  }
  return true;
}

function isValidStatus(status) {
  const ValidStatus = Object.values(Status_TODO).includes(status);
  if (!ValidStatus) {
    console.log(ERROR.TASKSTATUS);
    return;
  }
  return true;
}

function isValidPriority(priority) {
  const ValidPriority = Object.values(Priority_TODO).includes(priority);
  if (!ValidPriority) {
    console.log(ERROR.TASKPRIORITY);
    return;
  }
  return true;
}

function addTask(
  task,
  status = Status_TODO.TODO,
  priority = Priority_TODO.DEFAULT
) {
  if (!isValidTask(task)) {
    return;
  }
  if (!isValidStatus(status)) {
    return;
  }
  if (!isValidPriority(priority)) {
    return;
  }
  todoArrays.push({
    task,
    status,
    priority,
  });
}
function changeStatus(task, status) {
  const taskIndex = isValidExist(task);
  if (!isValidExist(task)) {
    return;
  }
  if (!isValidStatus(status)) {
    return;
  }
  todoArrays[taskIndex].status = status;
}
function changeStatus(task, priority) {
  const taskIndex = isValidExist(task);
  if (!isValidExist) {
    return;
  }
  if (!isValidPriority) {
    return;
  }
  todoArrays[taskIndex].priority = priority;
}
function deleteTask(task) {
  const taskIndex = isValidExist(task);
  if (!isValidExist) {
    return;
  }
  todoArrays.splice(taskIndex, taskIndex);
}

function show(status) {
  let statusTask = "";
  todoArrays.forEach((name) => {
    if (name.status === status) {
      statusTask += `${status}:\n\t${name.task}: ${name.priority}`;
      console.log(statusTask);
      return;
    }
  });
  if (!statusTask) {
    statusTask += `${status}:\n\t-`;
    console.log(statusTask);
    return;
  }
}
function showList() {
  show(Status_TODO.DONE);
  show(Status_TODO.INPROGRESS);
  show(Status_TODO.TODO);
}

addTask(TASK4, Status_TODO.INPROGRESS, Priority_TODO.HIGH);
addTask(TASK1);
getIndex = todoArrays.findIndex((name) => name.task == TASK1);
todoArrays[0].task = "lol";
deleteTask(TASK2);
console.log(todoArrays);
console.log(getIndex);
showList(Status_TODO.INPROGRESS);
