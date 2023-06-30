const list = {
	"create a new practice task": "In progress",
	"make a bed": "Done",
	"write a post": "To Do",
  


};
  
  function addTask(task, taskStatus = "To Do") {
	list[task] = taskStatus;
  


}
  function changeStatus(task, taskStatus) {
	list[task] = taskStatus;
  }

  

  function showList() {
    console.log(list);
    }

  function deleteTask(task) {
	delete list[task];
  }
  
  
  
  addTask('Go to ');
  deleteTask('make a bed');
  changeStatus("write a post", "In progress");
  showList();