import {PRIOPITIES,STATUS, UI_ELEMNTS } from './ui_elements.js';
import{clearInputHigh,clearInputLow} from './utils.js'

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


function addTask(task){
  toDoList.push(task)
  if(task.priority == "undefined"){
console.log("! Please enter all data for "+task.name+" !")
  }
  clearInputHigh()
 // console.clear()
 console.log(toDoList)
}


function delTask(nameDel){
 const delTask = toDoList.findIndex( task => task.name === nameDel)
    toDoList.splice(delTask, 1);
    console.clear()
  }


UI_ELEMNTS.FROM_HIGH.addEventListener('submit', (event) => {
  event.preventDefault();
  try {
  let task = new СreateObject(UI_ELEMNTS.INPUT_HIGH.value,PRIOPITIES.HIGH,STATUS.TODO)
  addTask(task);
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
  addTask(task);
  renderHigh(UI_ELEMNTS.LIST_TASKS_LOW);
  } catch (err) {
    if (err instanceof ValidationError) {
      alert("Error: " + err.message);
    }  else {
      throw err;
    }
  } 
 
})

 
function renderHigh(listTasks) {
 listTasks.innerHTML=""
  
const taskHigh = toDoList.filter(task => task.priority===PRIOPITIES.HIGH);
taskHigh.forEach(user=>{
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
  delTask(inputValue)
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
})

clearInputHigh()
}

function renderLow(listTasks){
UI_ELEMNTS.LIST_TASKS_LOW.innerHTML=""
const taskLow = toDoList.filter(task => task.priority===PRIOPITIES.LOW);

taskLow.forEach(user=>{
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
  delTask(inputValue)
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
})
clearInputLow()
}

function ShowTime(){
  let now = new Date();
  let date = now.getDate()
  UI_ELEMNTS.TIME.append(`Today is the ${date}th`)
}
ShowTime()