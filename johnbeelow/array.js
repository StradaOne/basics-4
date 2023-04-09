const toDoList = ["create a new practice task", "make a bed", "write a post"];

function addTask(taskName) {
  if (taskName) {
    toDoList.push(taskName);
  }
}

function deleteTask() {
  toDoList.pop();
}

function showList() {
  for (const task of toDoList) {
    console.log(task);
  }
}

addTask('test task')
deleteTask()
showList()
