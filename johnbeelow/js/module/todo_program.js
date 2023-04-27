export const STATUS = {
  IN_PROGRESS: 'In Progress',
  DONE: 'Done',
}

export const PRIORITY = {
  LOW: 'low',
  HIGH: 'high',
}

export const toDoList = []

export const isTaskNameValid = (name) =>
  !name || name.trim() === ''

export const isTaskExist = (name) =>
  toDoList.find((task) => task.name === name)

export const findIndexTask = (name) =>
  toDoList.findIndex((task) => task.name === name)

export const addTask = (name, status, priority) => {
  if (isTaskNameValid(name) || isTaskExist(name)) return

  toDoList.push({
    name: name,
    status: status,
    priority: priority,
  })
}

export const changeStatus = (name, status) =>
  isTaskExist(name) && (toDoList[findIndexTask(name)].status = status)

export const deleteTask = (name) => {
  toDoList.splice(findIndexTask(name), 1)
}
