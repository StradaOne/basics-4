const STATUS = {
  IN_PROGRESS: 'In Progress',
  DONE: 'Done',
  TO_DO: 'To Do'
}

const PRIORITY = {
  LOW: 'low',
  MID: 'midium',
  HIGH: 'high'
}

const MESSAGE = {
  TASK_IS_ADDED: 'This task is already exists',
  TASK_IS_WRONG: 'Please enter a valid value',
  TASK_IS_DELETED: 'Task is already deleted'
}

const list = [
	{name: 'create a post', status: STATUS.IN_PROGRESS, priority: PRIORITY.LOW}, 
  {name: 'make a bed', status: STATUS.DONE, priority: PRIORITY.HIGH},
  {name: 'create a new practice task', status: STATUS.IN_PROGRESS, priority: PRIORITY.LOW}, 
  {name: 'write a post', status: STATUS.TO_DO, priority: PRIORITY.HIGH}
]

const changeTaskStatus = (name, status) => {
  const task = list.find(task => task.name === name)
  if(task){
      task.status = status
  }else{
      console.log(MESSAGE.TASK_IS_WRONG)
  }
}
const changeTaskPriority = (name, priority) => {
  const task = list.find(task => task.name === name)
  if(task){
      task.priority = priority
  }else{
      console.log(MESSAGE.TASK_IS_WRONG)
  }
}

const addTask = (name, status = STATUS.TO_DO, priority = PRIORITY.LOW) => {
  const task = list.find(task => task.name === name)
  if(task){
      console.log(MESSAGE.TASK_IS_ADDED)
  } else{
      list.push({name, status, priority})
  }
}

const deleteTask = name => {
  const task = list.findIndex(task => task.name === name) 
    if(task){
      list.splice(task,1)
      console.log(MESSAGE.TASK_IS_DELETED)
    } else {
      console.log(MESSAGE.TASK_IS_WRONG)
    }
}

const showList = () => {
  let toDo = ''
  let inProg = ''
  let done = ''
  
  for (const task of list) {
    if(task.status === STATUS.TO_DO){
      toDo += `${task.name} \n\t`
    } else if (task.status === STATUS.IN_PROGRESS){
      inProg += `${task.name} \n\t`
    } else if (task.status === STATUS.DONE){
      done += `${task.name} \n\t`
    }
  }
  console.log(`To Do:\n\t${toDo}\nIn Progress:\n\t${inProg}\nDone:\n\t${done}`)
}

changeTaskStatus('dc', 'To Do')
changeTaskStatus('create a post', 'Done')
addTask('jumpin')
addTask('swimin')
changeTaskStatus('jumpin', 'Done')
deleteTask('make a bed')
console.log(list)

showList()