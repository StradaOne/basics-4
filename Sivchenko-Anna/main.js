const STATUS = {
  ToDo: "To Do",
  InProgress: "In progress",
  Done: "Done",
};

const PRIORITY = {
  High: "High",
  Medium: "Medium",
  Low: "Low",
};

const toDoList = [
  { name: "create a post", status: STATUS.ToDo, priority: PRIORITY.Low },
  { name: "test", status: STATUS.Done, priority: PRIORITY.High },
  { name: "eat pizza", status: STATUS.InProgress, priority: PRIORITY.Medium },
];

function addTask(task, status = STATUS.ToDo, priority = PRIORITY.Medium) {
  if (toDoList.find((item) => item.name === task)) {
    console.log(`Задача ${task} уже есть в списке`);
  } else {
    toDoList.push({
      name: task,
      status: status,
      priority: priority,
    });
  }
}

function deleteTask(task) {
  const deleteTaskIndex = toDoList.findIndex((item) => item.name === task);
  if (deleteTaskIndex === -1) {
    console.log("Данной задачи нет в списке")
  } else {
    toDoList.splice(deleteTaskIndex, 1);
    console.log(`Задачи '${task}' успешно удалена`);
  }
}

function changeStatus(task, status) {
  const taskIndex = toDoList.findIndex((item) => item.name === task);
  if (toDoList[taskIndex].status === status) {
    console.log(`Задача '${task}' уже имеет статус '${status}'`);
  } else {
    toDoList[taskIndex].status = status;
    console.log(`Статус задачи '${task}' обновлен на '${status}'`);
  }
}

function showList() {
  let toDo = '';
  let inProgress = '';
  let done = '';

  for (task of toDoList) {
    if (task.status === STATUS.ToDo) {
      toDo += `${task.name} \n\t`;
    } else if (task.status === STATUS.InProgress) {
      inProgress += `${task.name} \n\t`;
    } else if (task.status === STATUS.Done) {
      done += `${task.name} \n\t`;
    }
  }

  console.log(`To Do:\n\t${toDo}\nIn Progress:\n\t${inProgress}\nDone:\n\t${done}`);
}


addTask("play game", "Done");
addTask("play game");
deleteTask("test");
deleteTask("test");
changeStatus("play game", "Done");
changeStatus("play game", "In progress");
showList();