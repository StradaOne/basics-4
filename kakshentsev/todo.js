const list = {
  "create a new practice task": "In Progress",
  "make a bed": "Done",
  "write a post": "To Do",

  changeStatus(taskName, status) {
    if (
      // сложность проверки
      taskName in list &&
      // сама идея того, что статус должен быть валиден - правильная
      // а можно так Object.values(list).includes(status), но далеко не лучший вариант
      (status === "To Do" || status === "In Progress" || status === "Done")
    ) {
      list[taskName] = status;
    }
    return;
  },
  addTask(taskName) {
    if (!(taskName in list)) {
      list[taskName] = "To Do";
    }
  },
  deleteTask(taskName) {
    if (taskName in list) {
      delete list[taskName];
    }
  },
  showList() {
    let task = 0;
    for (const key in list) {
      if (list[key] === "To Do") {
        console.log(key + " : " + list[key]);
        task++;
      }
    }
    if (task === 0) {
      console.log("Nothing is To Do");
    }
    task = 0;
    console.log();
    for (const key in list) {
      if (list[key] === "In Progress") {
        console.log(key + " : " + list[key]);
        task++;
      }
    }
    if (task === 0) {
      console.log("Nothing is In Progress");
    }
    task = 0;
    console.log();
    for (const key in list) {
      if (list[key] === "Done") {
        console.log(key + " : " + list[key]);
        task++;
      }
    }
    if (task === 0) {
      console.log("Nothing is Done");
    }
  },
};

list.changeStatus("write a post", "Done");
list.showList();
