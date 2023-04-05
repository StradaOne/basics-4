const STATUS = {
  TODO: 'To Do',
  DONE: 'Done',
  IN_PROGRESS: 'In Progress',
}

const MESSAGE = {
  ERROR_OUT_TASK: 'Задача отсутствует',
  ERROR_TASK_ALREADY: 'Задача с таким именем уже имеется',
  DELETE_TASK: 'Задача удалена',
  ADD_TASK: 'Задача добавлена',
  CHANGE_TASK: 'Задача изменена',
  ERROR_NOT_STRING: 'Введено неправильное значение'
}

const TODO_LIST = {
  list:{
      'Сходить в магазин': STATUS.IN_PROGRESS,
      'Сделать уборку дома': STATUS.DONE,
      'Покормить кошку': STATUS.TODO,
  },

  addTask(task) {
      if (task in this.list) {
        console.log(MESSAGE.ERROR_TASK_ALREADY);
      } else if (typeof task !== 'string') {
        console.log(MESSAGE.ERROR_NOT_STRING);
      }
      else {
        this.list[task] = STATUS.TODO;
        console.log(MESSAGE.ADD_TASK);
      }
  },

  deleteTask(task) {
      if (!(task in this.list)) {
          console.log(MESSAGE.ERROR_OUT_TASK) ;
      } else {
          delete this.list[task];
          console.log(MESSAGE.DELETE_TASK)
      }
  },

  showList(){
      for (task in this.list){
          console.log(`${task}: ${this.list[task]}`);
      }
  },

  changeStatus(task, status){
      if (!(task in this.list)){
          console.log(MESSAGE.ERROR_OUT_TASK)
      } else {
          this.list[task] = status;
          console.log(MESSAGE.CHANGE_TASK);
      }
  },
};

TODO_LIST.addTask(2323);
TODO_LIST.deleteTask('Сделать уборку дома');
TODO_LIST.addTask('Помыть машину');
TODO_LIST.changeStatus('Сходить в магазин', STATUS.DONE);
TODO_LIST.addTask('Посмотреть кино');
TODO_LIST.deleteTask('Посмотреть кино');
TODO_LIST.changeStatus('Помыть машину',STATUS.IN_PROGRESS);
TODO_LIST.showList();