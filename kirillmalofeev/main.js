const STATUS = {
  TODO: "To Do",
  INPROGRESS: "In Progress",
  DONE: "Done",
};
const NOTHINGISDONE = "Nothing is Done";
const TODOLIST = {
  list: {
    "create a new practice task": STATUS.INPROGRESS,
    "make a bed": STATUS.DONE,
    "write a post": STATUS.TODO,
  },
  addTask(task, status = STATUS.TODO) {
    this.list[task] = status;
  },
  changeStatus(task, status) {
    this.list[task] = status;
  },
  deleteTask(task) {
    delete this.list[task];
  },
  showTask() {
    for (let key in this.list) {
      if (this.list[key] === STATUS.DONE) {
        console.log(STATUS.DONE + ":", key);
      } else if (this.list[key] === STATUS.INPROGRESS) {
        console.log(STATUS.INPROGRESS + ":", key);
      } else if (this.list[key] === STATUS.TODO) {
        console.log(STATUS.TODO + ":", key);
      } else if (this.list[key] !== STATUS.DONE) {
        console.log(NOTHINGISDONE);
      }
    }
  },
};
TODOLIST.addTask("Band PR");
TODOLIST.addTask("Do it", STATUS.INPROGRESS);
TODOLIST.changeStatus("create a new practice task", STATUS.DONE);
TODOLIST.deleteTask("write a post");
TODOLIST.showTask();
