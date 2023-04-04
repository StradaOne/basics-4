const statusDo = {
  toDO: "To do",
  inProgress: "In progress",
  Done: "Done",
};

const list = {
  "Write a code": statusDo.inProgress,
  "Create a new practice task": statusDo.toDO,
  "Make a bed": statusDo.Done,
};

function addTask(task, statusDo) {
  //метод для добавления задачи
  list[task] = statusDo;
}

function changeStatus(task, statusDo) {
  // метод для смены статуса задачи
  list[task] = statusDo;
}
function deleteTask(task) {
  // метод для удаления задачи
  delete list[task];
}
function showList() {
  // метод для вывода всех задач
  for (task in list) {
    console.log(`${task}: ${list[task]}`);
  }
}

addTask("get a tea", statusDo.toDO); //  добавляем задачку
changeStatus("Write a code", statusDo.Done); // обновляем статус
deleteTask("Create a new practice task"); // удаляем задачку
showList(); // выводим список задачек