const TO_DO = "To Do";
const DONE = "Done";
const IN_PROGRESS = "In Progress";
const ERROR = "Error! There is no such task";

const tasks = {
  list: {},

  changeStatus(task, status) {
    if (task in this.list === false) {
      console.log(ERROR);
    } else if (status !== TO_DO && status !== DONE && status !== IN_PROGRESS) {
      console.log(`This status cannot be assigned,\nAvailable statuses: ${TO_DO}, ${DONE}, ${IN_PROGRESS}.`);
    } else {
      this.list[task] = status;
      console.log(`The status of the task "${task}" has been changed!`);
    }
  },

  addTask(task) {
		if (task == false) {
			console.log("Add a task name!")
		} else {
			this.list[task] = TO_DO;
		}
  },

  deleteTask(task) {
    if (task in this.list === false) {
      console.log(ERROR);
    } else {
      delete this.list[task];
			console.log(`The task "${task}" was deleted!`)
    }
  },

  showList() {
    let list = "";
    let toDo = "";
    let inProgress = "";
    let done = "";

    for (let task in this.list) {
      if (this.list[task] === TO_DO) {
        toDo += `\t \t"${task}" \n`;
      } else if (this.list[task] === IN_PROGRESS) {
        inProgress += `\t \t"${task}" \n`;
      } else if (this.list[task] === DONE) {
        done += `\t \t"${task}" \n`;
      }
    }

    if (toDo === "") {
      toDo = "\t \t-\n";
    }
    if (inProgress === "") {
      inProgress = "\t \t-\n";
    }
    if (done === "") {
      done = "\t \t-\n";
    }

    list = `Todo: \n${toDo}In Progress: \n${inProgress}Done: \n${done}`;
    console.log(list);
  },
};

tasks.addTask("Write a post");
tasks.addTask("Clean up");
tasks.changeStatus("Write a post", IN_PROGRESS);
tasks.addTask("Create a new practice task");
tasks.changeStatus("Create a new practice task", "Done");
tasks.deleteTask("Write a post");

tasks.showList();
