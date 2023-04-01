const taskAddedMessage = 'Cool! Task was successfully added to the list.'
const taskDeletedMessage = 'Okay, task was successfully removed from the list.'
const taskStatusChangedMessage = 'Task status has been changed.'
const taskNotInListMessage = 'It seems like the task not in list yet.'
const taskAlreadyInListMessage = 'It seems like the task is already in list.'
const indentation = ' '.repeat(4)

const toDoList = {
  tasks: {
  },
  
  addTask(task, status = 'To Do') {
    if (this.tasks.hasOwnProperty(task)) {
      console.log(taskAlreadyInListMessage)
    } else {
      this.tasks[task] = status;
      console.log(taskAddedMessage)
    }
  },

  deleteTask(task) {
    if (!this.tasks.hasOwnProperty(task)) {
      console.log(taskNotInListMessage)
    } else {
      delete this.tasks[task];
      console.log(taskDeletedMessage)
    }
  },

  changeStatus(task, newStatus) {
    if (!this.tasks.hasOwnProperty(task)) {
      console.log(taskNotInListMessage)
    } else {
      this.tasks[task] = newStatus;
      console.log(taskStatusChangedMessage)
    }
  },

  displayStatus(status) {
    const tasksList = this.tasks
    let listIsEmpty = true
    console.log(`${status}:`)
    for (const task in tasksList) {
      if (tasksList[task] === status) {
        console.log(`${indentation}'${task}'`)
        listIsEmpty = false
      }
    }
    if (listIsEmpty) {
      console.log(`${indentation}-`)
    } 
  },

  showList() {
    this.displayStatus('To Do')
    this.displayStatus('Done')
    this.displayStatus('In Progress')
  }
}

toDoList.addTask('Take a breakfast')
toDoList.changeStatus('Take a breakfast', 'Done')
toDoList.addTask('Make a bed', 'In Progress')
toDoList.addTask('Make a simple Python script')
toDoList.deleteTask('Make a simple Python script')
toDoList.showList()
