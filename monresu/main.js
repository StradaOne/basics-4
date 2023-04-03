const message = {
  errorNotTask: 'Sorry! Такой задачи нет!',
  errorIsTask: 'Sorry! Такая задача уже в наличии',
  deleteTaskConst: 'Complete! Task was удалена',
  addTaskConst: 'Task was добавлена',
  changeTaskConst: 'Task was изменена',
  errorTaskIsEmpty: 'Task пустая',
}

const STATUS = {
  TODO: 'todo',
  IN_PROGRESS: 'in progress',
  DONE: 'done',
  TEST: 'test',
}

function isTaskInList(task) {
  return task in todoList.todos;
}

function isTaskTextValid(task) {
  return !task;
}

const todoList = {
	todos: {},
  changeStatus(task, text) {
    if (!isTaskInList(task)) {
      console.log(message.errorNotTask)
      return;
    }
    this.todos[task] = text;
    console.log(message.changeTaskConst)
  },
  addTask(task, status = STATUS.TODO) {
    if (isTaskInList(task)) {
      console.log(message.errorIsTask, task)
      return;
    }
    if (isTaskTextValid(task)) {
      console.log(message.errorTaskIsEmpty);
      return;
    }
    this.todos[task] = status;
    console.log(message.addTaskConst)
  },
  deleteTask(task) {
    if (!isTaskInList(task)) {
      console.log(message.errorNotTask)
      return;
    }
    delete this.todos[task];
    console.log(message.deleteTaskConst)
  },
  showList() {
    for (const stat in STATUS) {
      let tasks = '';
      for (const key in this.todos) {
        if (this.todos[key].toLowerCase() === STATUS[stat].toLowerCase()) {
          tasks += `\n\t${key}`
        }
      }
      console.log(`--${STATUS[stat].toUpperCase()}--`, tasks ? tasks : '\n\tNothing tasks!');
    }
  }
}

todoList.addTask('have a walk');
todoList.addTask('SLEEPY');
todoList.addTask('delete JSON from web');
todoList.addTask('TESTIKIIGIIGIGIG', STATUS.TEST);
todoList.addTask('');
todoList.deleteTask('drink tea');
todoList.changeStatus('delete JSON from web', STATUS.DONE);
todoList.changeStatus('SLEEPY', STATUS.IN_PROGRESS);
todoList.showList()