export const STATUS = {
  IN_PROGRESS: 'In Progress',
  DONE: 'Done',
}

export const PRIORITY = {
  LOW: 'low',
  HIGH: 'high',
}

export const toDoList = new Set()

export const isTaskNameValid = (name) => name && name.trim() !== ''

export const isTaskExist = (name) => {
  for (let task of toDoList) {
    if (task.name === name) return true
  }
  return false
}

export const findTask = (name) => {
  for (let task of toDoList) {
    if (task.name === name) return task
  }
  return null
}

function Task(name, status, priority) {
  this.name = name
  this.status = status
  this.priority = priority
}

export const addTask = (name, status, priority) => {
  if (!isTaskNameValid(name) || isTaskExist(name)) return
  toDoList.add(new Task(name, status, priority))
}

export const changeStatus = (name, status) => {
  const task = findTask(name)
  if (task) findTask(name).status = status
}

export const deleteTask = (name) => {
  toDoList.delete(findTask(name))
}
