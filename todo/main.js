const toDoList = {
  tasks: {
    "Ознакомьтя с требованиями задачи": "done",
    "Создать файл js": "done",
    "Создать функции для выполнения задачи": "done",
    "Написать код для функций": "done",
    "Лечь спать": "waiting",
    "Проверить код, что-бы убедится что он работает правильно": "waiting",
    "Отправить код на проверку": "waiting",
  },

  checkTask(task) {
    if (!this.tasks.hasOwnProperty(task)) {
      throw new Error(`Задачи "${task}" не существует`);
    }
    return true;
  },

  changeStatus(task, status) {
    try {
      this.checkTask(task);
      status = status.toLowerCase().trim();
      if (status === "inprogress") {
        this.tasks[task] = "inProgress";
      } else if (status === "done") {
        this.tasks[task] = "done";
      } else {
        throw new Error(
          "Такого статуса не существует, используйте (inProgress или done), регистр не важен"
        );
      }
      console.log(`Статус задачи "${task}" успешно изменен на "${status}"`);
    } catch (error) {
      console.error(error.message);
    }
  },

  addTask(task) {
    if (!task) {
      return console.error("Некорректный ввод");
    }
    if (this.tasks.hasOwnProperty(task)) {
      return console.error(`Задача "${task}" уже существует`);
    }
    this.tasks[task] = "waiting";
    console.log(`Задача "${task}" успешно добавлена`);
  },

  deleteTask(task) {
    try {
      this.checkTask(task);
      delete this.tasks[task];
      console.log(`Задача "${task}" успешно удалена`);
    } catch (error) {
      console.error(error.message);
    }
  },

  showListTasks() {
    const waitingTasks = [];
    const inProgressTasks = [];
    const completedTasks = [];

    for (const [task, status] of Object.entries(this.tasks)) {
      if (status === "waiting") {
        waitingTasks.push(task);
      } else if (status === "inProgress") {
        inProgressTasks.push(task);
      } else if (status === "done") {
        completedTasks.push(task);
      }
    }

    console.log("Todo:");
    if (waitingTasks.length === 0) {
      console.log("    -");
    } else {
      waitingTasks.forEach((task) => console.log(`    ${task}`));
    }

    console.log("In Progress:");
    if (inProgressTasks.length === 0) {
      console.log("    -");
    } else {
      inProgressTasks.forEach((task) => console.log(`    ${task}`));
    }

    console.log("Done:");
    if (completedTasks.length === 0) {
      console.log("    -");
    } else {
      completedTasks.forEach((task) => console.log(`    ${task}`));
    }
  },
};

toDoList.addTask("Отдыхать");
toDoList.addTask("Исправить код, если вернут на доработку");
toDoList.deleteTask("Лечь спать");

toDoList.changeStatus(
  "Проверить код, что-бы убедится что он работает правильно",
  "done"
);
toDoList.changeStatus("Отправить код на проверку", "done");
toDoList.changeStatus("Отправить код на проверку", "done");

toDoList.changeStatus("Лечь спать", "done");
toDoList.deleteTask("Лечь спать", "done");

toDoList.changeStatus("Отдыхать", "inprogress");

toDoList.showListTasks();
