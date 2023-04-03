// видел такой подход с сообщениями в константах в каком-то ПР который был позже по времени
// константы на статусы
// оптимизация вывода
// не будет работать еси задач нет, не будет прочерка.

const errorNotTask = 'Sorry! Такой задачи нет!'
const errorIsTask = 'Sorry! Такая задача уже в наличии'
const deleteTaskConst = 'Complete! Task was удалена'
const addTaskConst = 'Task was добавлена'
const changeTaskConst = 'Task was изменена'

const todoList = {
	todos: {
  },
  changeStatus(task, text) {
    // зачем нам нестрогое сравнение с false?
    // if (!(task in this.todos)) {
    if (task in this.todos == false) {
      console.log(errorNotTask)
    }
    else {
      this.todos[task] = text;
      console.log(changeTaskConst)
    }
  },
  addTask(task, status = 'todo') { // тут ошибочка подкралась везде 'Todo' а тут 'todo'
    //нестрогое сравнение с true?
    // if (task in this.todos) {
    // можно было бы проверить на валидность входные данные  
    if (task in this.todos == true) {
      console.log(errorIsTask)
    }
    else {
      this.todos[task] = status;
      console.log(addTaskConst)
    }
  },
  deleteTask(task) {
    if (task in this.todos == false) {
      console.log(errorNotTask)
    }
    else {
      delete this.todos[task];
      console.log(deleteTaskConst)
    }
  },
  displayStatus(status) {
    let tasks = '';
    for (const key in this.todos) {
      if (this.todos[key].toLowerCase() === status.toLowerCase()) {
        tasks += `\n\t${key}`
      }
    }
    console.log(status + ':', tasks ? tasks : '\n\t-');
  },
  showList() {
    // вот тут хорошо, но всетаки внесение изменений будет больно
    this.displayStatus('Todo');
    this.displayStatus('Done');
    this.displayStatus('In Progress');
  }
}

todoList.addTask('have a walk');
todoList.addTask('SLEEPY');
todoList.addTask('delete JSON from web');
todoList.deleteTask('drink tea');
todoList.changeStatus('delete JSON from web', 'Done');
todoList.changeStatus('SLEEPY', 'in progress');
todoList.showList()