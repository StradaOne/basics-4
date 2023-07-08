import {PRIOPITIES,STATUS, UI_ELEMNTS } from './ui_elements.js';
import{clearInputHigh,clearInputLow,ShowTime} from './utils.js'

const toDoList = [];
 
function СreateObject(name,priority,status){
  if (name=="") {
    throw new ValidationError("Task name is not found");
  }
  this.name=name;
  this.priority=priority;
  this.status=status;
  return
}

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}


function addTaskInMassive(task){
  toDoList.push(task)
  if(task.priority == "undefined"){
console.log("! Please enter all data for "+task.name+" !")
  }
  clearInputHigh()
 console.clear()
 console.log(toDoList)
}


function delTaskFromMassive(nameDel){
 const delTaskFromMassive = toDoList.findIndex( task => task.name === nameDel)
    toDoList.splice(delTaskFromMassive, 1);
    console.clear()
  }


UI_ELEMNTS.FROM_HIGH.addEventListener('submit', (event) => {
  event.preventDefault();
  try {
  let task = new СreateObject(UI_ELEMNTS.INPUT_HIGH.value,PRIOPITIES.HIGH,STATUS.TODO)
  addTaskInMassive(task);

  renderHigh(UI_ELEMNTS.LIST_TASKS_HIGH);
  } catch (err) {
    if (err instanceof ValidationError) {
      alert("Error: " + err.message);
    }  else {
      throw err;
    }
  }  
})

UI_ELEMNTS.FROM_LOW.addEventListener('submit', (event) => {
  event.preventDefault();
  try {
  let task = new СreateObject(UI_ELEMNTS.INPUT_LOW.value,PRIOPITIES.LOW,STATUS.TODO)
  addTaskInMassive(task);

  renderLow(UI_ELEMNTS.LIST_TASKS_LOW);
  } catch (err) {
    if (err instanceof ValidationError) {
      alert("Error: " + err.message);
    }  else {
      throw err;
    }
  } 
})

function createTask(listTasks,user){
  const task = document.createElement("div")
  task.classList.add('task');
  task.innerHTML=`
    <input type="checkbox" class="checkBox">
    <div class="taskContent">
    ${user.name}
    </div>
      <button type="button" class="closeButton">x</button>
    `
    
const delBtn = task.querySelector('.closeButton')
let inputValue = user.name
delBtn.addEventListener('click',()=>{
  task.remove(inputValue)
  delTaskFromMassive(inputValue)
console.log(toDoList)
})

const checkBox = task.querySelector(".checkBox")
checkBox.addEventListener('change',()=>{
  task.className="doneTask"
  delBtn.className="closeDoneButton"
  user.status=STATUS.DONE
  console.clear()
  console.log(toDoList)
})
  listTasks.append(task);
}

function renderHigh(listTasks) {
 listTasks.innerHTML=""
 const taskHigh = toDoList.filter(task => task.priority===PRIOPITIES.HIGH);
function recursive (i,taskHigh){
   if(i>=taskHigh.length){
 return 
   }
   else{
    let user=taskHigh[i]
  createTask(listTasks,user)
  recursive(i+1,taskHigh)
}
}
recursive(0,taskHigh)
clearInputHigh()
}

function renderLow(listTasks){
  listTasks.innerHTML=""
  const taskLow = toDoList.filter(task => task.priority===PRIOPITIES.LOW);
 function recursive (i,taskLow){
    if(i>=taskLow.length){
  return 
    }
    else{
     let user=taskLow[i]
   createTask(listTasks,user)
   recursive(i+1,taskLow)
 }
 }
 recursive(0,taskLow)
 clearInputLow()
}

ShowTime()
