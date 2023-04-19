const indentation = " ".repeat(4);

const LANG = {
  RU: {
    availableStatuses: {
      todo: "Нужно сделать",
      inProgress: "В процессе",
      done: "Готово",
    },
    task: "Задача",
    status: "Статус",
    validation: {
      validStringError: "Ввод должен быть непустой строкой.",
      notExistError: "не существует.",
      existError: "уже существует.",
    },
  },
  EN: {
    availableStatuses: {
      todo: "To do",
      inProgress: "In Progress",
      done: "Done",
    },
    task: "Task",
    status: "Status",
    validation: {
      validStringError: "Input must be a non-empty string.",
      notExistError: "does not exist.",
      existError: "is already exists.",
    },
  },
};

let language = LANG.RU;

const taskManager = {
  tasks: {},
  availableStatuses: {
    [language.availableStatuses.todo]: true,
    [language.availableStatuses.inProgress]: true,
    [language.availableStatuses.done]: true,
  },

  validation: {
    isValidString(...strings) {
      strings.forEach((str) => {
        if (!(typeof str === "string" && str.length > 0)) {
          console.log(language.validation.validStringError);
          return false;
        }
      });
      return true;
    },
    isExist(item, object, itemName, shouldExist = true) {
      const isItemExist = item in object;
      if (shouldExist && !isItemExist) {
        console.log(
          `${itemName} ${item} ${language.validation.notExistError}`
        );
        return false;
      }
      if (!shouldExist && isItemExist) {
        console.log(
          `${itemName} ${item} ${language.validation.existError}`
        );
        return false;
      }
      return true;
    },
  },

  changeLanguage(from, to) {
    const validation = this.validation;

    const isValid =
      validation.isValidString(from, to) &&
      validation.isExist(from, LANG) &&
      validation.isExist(to, LANG);

    if (isValid) {
      const lang = LANG[to];
      for (const task in this.tasks) {
        if (
          Object.values(lang.availableStatuses).includes(
            this.tasks[task]
          )
        )
          this.tasks[task] = lang.availableStatuses;
      }
    }
  },

  changeStatus(task, status) {
    const validation = this.validation;
    const tasks = this.tasks;

    const isValid =
      validation.isValidString(task, status) &&
      validation.isExist(task, tasks, language.task) &&
      validation.isExist(status, this.availableStatuses, language.status);

    if (isValid) tasks[task] = status;
  },

  addTask(task, status = language.availableStatuses.todo) {
    const validation = this.validation;
    const tasks = this.tasks;

    const isValid =
      validation.isValidString(task, status) &&
      validation.isExist(task, tasks, language.task, false) &&
      validation.isExist(status, this.availableStatuses, language.status);

    if (isValid) tasks[task] = status;
  },

  addStatus(status) {
    const validation = this.validation;
    const availableStatuses = this.availableStatuses;
    const isValid =
      validation.isValidString(status) &&
      validation.isExist(status, availableStatuses, language.status, false);

    if (isValid) this.availableStatuses[status] = true;
  },

  disableStatus(status) {
    const validation = this.validation;
    const availableStatuses = this.availableStatuses;
    const isValid =
      validation.isValidString(status) &&
      validation.isExist(status, availableStatuses, language.status);

    if (isValid) availableStatuses[status] = false;
  },

  deleteStatus(status) {
    const validation = this.validation;
    const isValid =
      validation.isValidString(status) &&
      validation.isExist(status, this.availableStatuses, language.status);

    if (isValid) {
      for (const task in this.tasks) {
        if (this.tasks[task] === status) delete this.tasks[task];
      }
      delete this.availableStatuses[status];
    }
  },

  deleteTask(task) {
    const validation = this.validation;
    const tasks = this.tasks;

    const isValid =
      validation.isValidString(task) &&
      validation.isExist(task, tasks, language.task);

    if (isValid) delete tasks[task];
  },

  showStatus(status) {
    const validation = this.validation;
    const tasks = this.tasks;

    const isValid =
      validation.isValidString(status) &&
      validation.isExist(status, this.availableStatuses, language.status);

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
      if (availableStatuses[status]) this.showStatus(status);
    }
  },
};
