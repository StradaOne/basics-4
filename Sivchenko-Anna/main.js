const ToDo = {
  list: {
    "сomplete new Strada practice task": "In Progress",
    "make a breakfast": "Done",
    "feed the pug": "To Do",
    "apply for a job": "To Do",
  },

  addTask(task) {
    this.list[task] = "To Do";
  },
  deleteTask(task) {
    delete this.list[task];
  },
  changeStatus(task, status) {
    this.list[task] = status;
  },
  showList() {
    console.log(this.list);
  },
};

// console.log(ToDo);

ToDo.addTask("play civilization");
ToDo.deleteTask("make a breakfast");
ToDo.changeStatus("feed the pug", "Done");
ToDo.showList();

ToDo.changeStatus("сomplete new Strada practice task", "Done");

console.log(ToDo);