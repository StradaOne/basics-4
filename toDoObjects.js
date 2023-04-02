// Реализован тудушник с вводом в двух-аргументном формате, где первый - задача, второй это цифра 0-2, где 0 это статус 'to do', 1 - 'in progress' и 2 - 'done'. Изначально список дел пуст.

toDoList = {
  list: {},
  addOrEdit(task, status = "0") {
    this.list[task] = this.status[status];
  },
  delete(task) {
    delete this.list[task];
  },
  // the list will be logged unsorted
  displayList() {
    for (task in toDoList.list) {
      console.log(task, ":", this.list[task]);
    }
  },
  // the list will be logged sorted
  displaySorted() {
    const padding = "     ";
    console.log(this.status[0] + ":");
    let toDo = 0;
    let inProgress = 0;
    let done = 0;

    for (task in toDoList.list) {
      if (this.list[task] === "To Do🔄") {
        console.log(padding, task);
        toDo++;
      }
    }
    toDo === 0
      ? console.log(padding, `There are no tasks to do, you may relax😎`)
      : "";
    console.log("");

    console.log(this.status[1] + ":");
    for (task in toDoList.list) {
      if (this.list[task] === "In Progress🕓") {
        console.log(padding, task);
        inProgress++;
      }
    }
    inProgress === 0
      ? console.log(padding, `There are no tasks in progress yet😊`)
      : "";
    console.log("");

    console.log(this.status[2] + ":");
    for (task in toDoList.list) {
      if (this.list[task] === "Done✅") {
        console.log(padding, task);
        done++;
      }
    }
    done === 0
      ? console.log(padding, `There are no completed tasks yet 😐`)
      : "";
  },

  status: {
    "0": "To Do🔄",
    "1": "In Progress🕓",
    "2": "Done✅",
  },
};

// toDoList.displayList();
toDoList.addOrEdit("Take the dogs to vet", "0");
toDoList.addOrEdit("Pay taxes");
toDoList.addOrEdit("Call the bank", "0");
toDoList.addOrEdit("Cook apple pie", "0");
toDoList.addOrEdit("Meet with the designers", "1");
toDoList.addOrEdit("Plan the Birthday Party", "1");
toDoList.addOrEdit("Pay taxes", "2");

// toDoList.displayList();

// console.log(toDoList.list);
toDoList.displaySorted();
toDoList.addOrEdit("Make weekend plans for April", "1");
toDoList.delete("Cook apple pie");
toDoList.addOrEdit("Buy a costume for a Hippie Party", "0");
toDoList.displaySorted();
