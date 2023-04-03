// Статусы в константы

const toDoList = {
  addTask(name) {
    this[name] = 'To Do'
  },
  changeStatus(name, status) {
    if (this[name] !== status) {
      // плохо подходит для проверки, а если статусов еще +3 ?
      switch (status) {
        case 'To Do':
          this[name] = status
          break
        case 'In Progress':
          this[name] = status
          break
        case 'Done':
          this[name] = status
          break
        default:
          console.log(
            'Не верное значение статуса. Используйте: To Do, In Progress, Done'
          )
      }
    } else {
      console.log('Данный статус уже установлен')
    }
  },
  deleteTask(name) {
    for (key in this) {
      if (key === name) {
        delete this[key]
      }
    }
  },
  showList() {
    let inToDo = ''
    let inProgress = ''
    let isDone = ''
    for (task in this) {
      if (typeof this[task] === 'string') {
        if (this[task] === 'To Do') {
          inToDo += '     ' + task + '\n'
        }
        if (this[task] === 'In Progress') {
          inProgress += '     ' + task + '\n'
        }
        if (this[task] === 'Done') {
          isDone += '     ' + task + '\n'
        }
      }
    }

    console.log(inToDo.length < 1 ? 'в To Do ниего нет' : 'Todo:\n' + inToDo)
    console.log(
      inProgress.length < 1
        ? 'in Progress ничего нет\n'
        : 'in Progress:\n' + inProgress
    )
    console.log(isDone.length < 1 ? 'в Done ничего нет' : 'Done:\n' + isDone)
  },
}

toDoList.addTask('Тренировка в 12')
toDoList.addTask('Изучить React')
toDoList.addTask('Съездить в горы')
toDoList.addTask('Заменить десктоп')
toDoList.addTask('Купить витамины')

toDoList.changeStatus('Тренировка в 12', 'In Progress')
toDoList.changeStatus('Тренировка в 12', 'Done')
toDoList.changeStatus('Съездить в горы', 'Done')

toDoList.deleteTask('Заменить десктоп')

toDoList.showList()
