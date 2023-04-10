const STATUS = {
  IN_PROGRESS: 'In Progress',
  DONE: 'Done',
  TO_DO: 'To Do',
}

const ERROR = {
  NO_TASK: 'There is no such task in the list',
  IS_TASK: 'Such a task is already on the list',
  INCORRECT_INPUT:
    'Enter the correct text, which does not consist only of characters and numbers',
  ENTER_TEXT: 'There is an error in the entered text',
}

const PRIORITY = {
  LOW: 'low',
  HIGH: 'high',
}

const list = [
  {
    name: 'create a post',
    status: STATUS.IN_PROGRESS,
    priority: PRIORITY.LOW,
  },
  {
    name: 'test',
    status: STATUS.DONE,
    priority: PRIORITY.HIGH,
  },
]

function checkInputValue(inputValue) {
  return typeof inputValue === 'string'
}

function checkTask(taskName) {
  const check = list.find((task) => task.name === taskName)

  if (check) {
    return true
  }
}

function findIndexTask(taskName) {
  const indexValue = list.findIndex((task) => task.name === taskName)
  return indexValue
}

function addTask(taskName) {
  if (!checkInputValue(taskName)) {
    console.log(`${ERROR.ENTER_TEXT}:  '${taskName}', ${ERROR.INCORRECT_INPUT}`)
    return
  }

  if (checkTask(taskName)) {
    console.log(`'${taskName}' - ${ERROR.IS_TASK}`)
    return
  }

  list.push({
    name: taskName,
    status: STATUS.IN_PROGRESS,
    priority: PRIORITY.LOW,
  })
}

function changeStatus(taskName, statusName) {
  if (!checkInputValue(taskName && statusName)) {
    console.log(
      `${ERROR.ENTER_TEXT}:  '${taskName}' and '${statusName}', ${ERROR.INCORRECT_INPUT}`
    )
    return
  }

  if (checkTask(taskName)) {
    list[findIndexTask(taskName)].status = statusName
    return
  }

  console.log(`'${taskName}' - ${ERROR.NO_TASK}`)
}

function deleteTask(taskName) {
  if (!checkInputValue(taskName)) {
    console.log(`'${taskName}' - ${ERROR.INCORRECT_INPUT}`)
    return
  }

  if (checkTask(taskName)) {
    list.splice(findIndexTask(taskName), 1)
    return
  }

  console.log(`'${taskName}' - ${ERROR.NO_TASK}`)
}

function showList() {
  let todo = ''
  let inProgress = ''
  let done = ''

  for (let taskName of list) {
    if (taskName.status === STATUS.TO_DO) {
      todo += '\n' + taskName.name
    }
    if (taskName.status === STATUS.IN_PROGRESS) {
      inProgress += '\n' + taskName.name
    }
    if (taskName.status === STATUS.DONE) {
      done += '\n' + taskName.name
    }
  }

  if (!todo) {
    todo = `\n -`
  }
  if (!inProgress) {
    inProgress = `\n -`
  }
  if (!done) {
    done = `\n -`
  }

  console.log(`${STATUS.TO_DO}:${todo}`)
  console.log(`${STATUS.IN_PROGRESS}:${inProgress}`)
  console.log(`${STATUS.DONE}:${done}`)
}

addTask('run run run')
changeStatus('test', STATUS.TO_DO)
deleteTask('run run run')

showList()
