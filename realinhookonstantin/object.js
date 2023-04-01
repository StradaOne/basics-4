const listTasks = {
	list: {
    "create a new practice task": "In Progress", 
    "make a bed": "Done",
    "write a post": "To Do",
  },

  changeStatus(change, status){
    this.list[change] = status;
  },

  addTask(task, add) {
    this.list[task]= add;
  },

  deleteTask(task){
    delete this.list[task];
  },

  showList(){
    console.log(this.list);

    let taskStatus;
    for(const taskName in listTasks.list) {
      if (listTasks.list[taskName] !== 'Done') {
        taskStatus = 'Nothing Done';
      }

      if (listTasks.list[taskName] !== 'In Progress') {
        taskStatus = 'Nothing In Progress';
      }

      if (listTasks.list[taskName] !== 'To Do') {
        taskStatus = 'Nothing To Do';
      }
    }
    console.log(taskStatus);
  }
}

listTasks.addTask('Walk in street', 'Done');
listTasks.addTask('Coocking', 'Done');
listTasks.changeStatus("create a new practice task", "Done");
listTasks.deleteTask("write a post");

listTasks.showList();