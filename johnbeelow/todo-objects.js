const STATUS = {
  IN_PROGRESS: "In Progress",
  DONE: "Done",
  TO_DO: "To Do",
};

const ERORR = {
  NO_TASK: "There is no such task in the list",
  IS_TASK: "Such a task is already on the list",
};

const task = {
  list: {
    "create a new practice task": STATUS.IN_PROGRESS,
    "make a bed": STATUS.DONE,
    "write a post": STATUS.TO_DO,
  },

  changeStatus(taskName, statusName) {
    if (taskName in this.list) {
      this.list[taskName] = statusName;
    } else {
      console.log(ERORR.NO_TASK);
    }
  },

  addTask(taskName) {
    if (taskName in this.list) {
      console.log(ERORR.IS_TASK);
    } else {
      this.list[taskName] = STATUS.IN_PROGRESS;
    }
  },

  deleteTask(taskName) {
    if (taskName in this.list) {
      delete this.list[taskName];
    } else {
      console.log(ERORR.NO_TASK);
    }
  },

  showList(taskName) {
    let todo = "";
    let in_progress = "";
    let done = "";

    for (taskName in this.list) {
      if (this.list[taskName] === STATUS.TO_DO) {
        todo += "\n" + taskName;
      } else if (this.list[taskName] === STATUS.IN_PROGRESS) {
        in_progress += "\n" + taskName;
      } else if (this.list[taskName] === STATUS.DONE) {
        done += "\n" + taskName;
      }
    }

    if (!todo) {
      todo = `\n -`;
    } else if (!in_progress) {
      in_progress = `\n -`;
    } else if (!done) {
      done = `\n -`;
    }

    console.log(`${STATUS.TO_DO}:${todo}`);
    console.log(`${STATUS.IN_PROGRESS}:${in_progress}`);
    console.log(`${STATUS.DONE}:${done}`);
  },
};

task.changeStatus("write a post", STATUS.DONE);
task.addTask("have a walk");
task.deleteTask("have a walk");
task.addTask("сome up with a new task");
task.changeStatus("сome up with a new task", STATUS.DONE);
task.showList();
