const toDo = {
  list: {
  "погулять с собакой": "выполнено",
  "выполнить задание": "выполнено",
  "прочитать почту": "в процессе"
  },
  addTask(task, taskStatus = "выполнено"){
  this.list[task] = taskStatus;
  },
  changeStatus(task, taskStatus){
  this.list[task] = taskStatus;
  },
  deleteTask(task){
    delete this.list[task];
  },
  showList(){
    console.log(toDo.list);
  }
};

// const {addTask, changeStatus, deleteTask, showList} = toDo

toDo.addTask("сходить в магазин");
toDo.changeStatus("погулять с собакой", "в процессе")
toDo.showList();