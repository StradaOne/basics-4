const indentation = " ".repeat(4);

const taskManager = {
  tasks: {},

  availableStatuses: {
    "To do": true,
    "In Progress": true,
    Done: true,
  },

  validation: {
    isValidString(str) {
      if (!(typeof str === "string" && str.length > 0)) {
        console.log("Input must be a non-empty string.");
        return false;
      }
      return true;
    },

    isTaskExist(tasks, task, shouldExist = true) {
      const taskExist = tasks[task] !== undefined;
      if (shouldExist && !taskExist) {
        console.log(`Task "${task}" does not exist.`);
        return false;
      }
      if (!shouldExist && taskExist) {
        console.log(`Task "${task}" already exists.`);
        return false;
      }
      return true;
    },

    isStatusAvailable(availableStatuses, status) {
      if (!availableStatuses[status]) {
        console.log(`Status "${status}" is not available.`);
        return false;
      }
      return true;
    },

    isSameStatus(tasks, task, status) {
      if (tasks[task] === status) {
        console.log(`Task "${task}" is already in "${status}"`);
        return false;
      }
      return true;
    },
  },

  changeStatus(task, status) {
    const validation = this.validation;
    const tasks = this.tasks;

    const isValid =
      validation.isValidString(task) &&
      validation.isValidString(status) &&
      validation.isTaskExist(tasks, task) &&
      validation.isStatusAvailable(this.availableStatuses, status) &&
      validation.isSameStatus(tasks, task, status);

    if (isValid) tasks[task] = status;
  },

  addTask(task, status = "To do") {
    const validation = this.validation;
    const tasks = this.tasks;

    const isValid =
      validation.isValidString(task) &&
      validation.isValidString(status) &&
      validation.isTaskExist(tasks, task, false) &&
      validation.isStatusAvailable(this.availableStatuses, status);

    if (isValid) tasks[task] = status;
  },

  deleteTask(task) {
    const validation = this.validation;
    const tasks = this.tasks;

    const isValid = validation.isTaskExist(tasks, task);

    if (isValid) delete tasks[task];
  },

  showStatus(status) {
    const validation = this.validation;
    const tasks = this.tasks;

    const isValid =
      validation.isValidString(status) &&
      validation.isStatusAvailable(this.availableStatuses, status);

    if (!isValid) return;

    console.log(`${status}:`);

    let isEmpty = true;
    for (const task in tasks) {
      if (tasks[task] === status) {
        console.log(`${indentation}"${task}"`);
        isEmpty = false;
      }
    }

    if (isEmpty) console.log(`${indentation}-`);
  },

  showList() {
    const availableStatuses = this.availableStatuses;
    for (const status in availableStatuses) {
      this.showStatus(status);
    }
  },
};

taskManager.addTask("Listen to Techno");
taskManager.addTask("Listen to House");
taskManager.changeStatus("Listen to Techno", "In Progress");
taskManager.deleteTask("Listen to House");
taskManager.addTask("Drink a cup of coffee");
taskManager.changeStatus("Drink a cup of coffee", "Done");
taskManager.deleteTask("Drink a cup of coffee");
taskManager.showList()