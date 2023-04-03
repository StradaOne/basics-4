// задача не завершена

const toDoList = {
  list: {
    "Buy food": "To Do",
    "Read a book": "In Progress",
    "Meditation 10min": "Done",
    "Workout 30min": "Done",
  },

  addTask(task, status) {
    this.list[task] = status;
  },

  deleteTask(task) {
    delete this.list[task];
  },

  changeStatus(task, status) {
    this.list[task] = status;
  },

    showList() {
      for (let task in toDoList.list) {
        console.log(`${task}: ${toDoList.list[task]}`);
      }
    },
};

// toDoList.deleteTask("buy food");
// toDoList.addTask("make a bed");
// toDoList.changeStatus('Buy food', 'Done');
toDoList.showList();
