const toDoList = {
  tasks: {
    "wake up": "ToDo",
    "brush teeth": "ToDo",
  },
  changeStatus(task, status) {
    //интересное решение, но решаеться константами "ToDo" "todo" много шансов выстрелить в ногу себе
    let lowStatus = status.toLowerCase(); 
    if (
      // очень тяжелая валидация в функцию
      task in this.tasks &&
      (lowStatus ===  "todo"||
        lowStatus === "done" ||
        lowStatus === "in progress")
    ) {
      this.tasks[task] = status;
      console.log('Статус изменен')
    } else {
      console.log("Такой задачи/такого статуса не существует");
    }
  },
  addTask(task) {
    if (!(task in this.tasks)) {
      this.tasks[task] = "ToDo";
      console.log('Задача добавлена')
    } else {
      console.log("Такая задача уже есть!");
    }
  },
  deleteTask(task) {
    if (task in this.tasks) {
      delete this.tasks[task];
      console.log('Задача удалена')
    } else {
      console.log("Такой задачи нет в списке!");
    }
  },
  checkStatus(status) {
    let checkTask = "";
    console.log(`${status}:`);
    for (let task in this.tasks) {
      if (this.tasks[task].toLowerCase() === status.toLowerCase()) {
        console.log("\t", task);
        checkTask = "!";
      }
    }
    if (checkTask === "") console.log("\t -");
  },
  showTasks() {
    this.checkStatus("ToDo");
    this.checkStatus("In Progress");
    this.checkStatus("Done");
  },
}

// Добавление задачи
toDoList.addTask("learn English");
toDoList.addTask("learn Programming");
toDoList.addTask("go to sleep")

// Изменение статуса
toDoList.changeStatus("wake up", "Done");
toDoList.changeStatus("learn English", "Done");
toDoList.changeStatus("go to sleep", 'Done')

// Удаление задачи
toDoList.deleteTask("brush teeth");

//Показать текущие задачи
toDoList.showTasks();
