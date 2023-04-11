const STATUS = {
	TODO: 'To Do',
	IN_PROGRESS: "In Progress",
	DONE: 'Done'
}

const priorities = {
	HIGH: 'High',
	MEDIUM: 'Medium',
	LOW: 'Low'
}

const toDoList = [ 
	{name: 'create a post', status:STATUS.TODO, priority: "Low"}, 
  {name: 'test', status:STATUS.DONE, priority: "High"} ,

];

const showList = () => {
  for (const nameStatus in STATUS) {
    let noneTask = true;

    console.log(`\n${STATUS[nameStatus]}`);

    const filteredStatus = toDoList.filter(
      task => task.status === STATUS[nameStatus]
    );

    filteredStatus.forEach((task) => {
      if (task) {
        console.log(`\t${task.name}: ${task.priority} priority;`);
        noneTask = false;
      }
    });

    if (noneTask) {
      console.log(`\t -`);
    }
  }
};

function addTask(name,status,priority){
  toDoList.push({name,status,priority})
  if(status="undefined" || priority == "undefined"){
console.log("! Please enter all data for "+name+" !")
  }
}

function changeStatus(nameNew,statusNew){
  const changeTask = toDoList.findIndex(
    task => task.name === nameNew)
 if(changeTask===-1){
  console.log("!---Undefined change name---!")
}
else{
  toDoList[changeTask].status=statusNew
}
}

function deleteTask(nameDel){
  const delTask = toDoList.findIndex(
    task => task.name === nameDel)
    if(delTask===-1){
      console.log("!---Undefined delete name---!")
    }
    else{
    toDoList.splice(delTask, 1);
    }
  }

changeStatus('create a post',STATUS.IN_PROGRESS) // меняет статус задачи
addTask('132',STATUS.DONE,priorities.HIGH); 
changeStatus('132',STATUS.IN_PROGRESS) // меняет статус задачи
addTask('423',STATUS.DONE,priorities.HIGH); 
deleteTask('test'); // удаляет задачу
showList();

