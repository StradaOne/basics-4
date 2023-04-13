
const listToDo = {
    list: {
        'create a new pratice task': 'In progress',
        'make a bed': 'Done',
        'write a post': 'To Do',
        'lisen a music': 'To Do',
        'have a breackfast': 'In progress'
    },
    changeStatus(taskName, taskStatus) {
        if (!(taskName in listToDo.list) && typeof taskName === 'string' && taskName !== '' && taskName !== null) {
            this.list[taskName] = taskStatus;
        } else if (taskName in listToDo.list && (taskStatus === 'To Do' || taskStatus === 'Done' || taskStatus === 'In progress')) {
            return (`Такая задача уже есть и её статус ${taskStatus}`);
        } else {
            return 'Error, Введите задача и статус задача.';
        }
    },
    
    addTask(taskName) {
        if (taskName in listToDo.list) {
            return 'Такая задача уже есть';
        } else if (taskName === '' || typeof taskName !== 'string' || taskName === null) {
            return 'Введите задача';
        } else {
            this.list[taskName] = 'To Do';
        }
    },
    deleteTask(taskName) {
        if (!(taskName in listToDo.list)) {
            return 'Выбираете задача на удаление из список задач'
        } else {
            delete this.list[taskName]
        }
    },
    showList() {
        for (const key in listToDo.list) {
           console.log(`'${key}': ${listToDo.list[key]}`);
        }
    },
    showList2() {
        
        for (const key in listToDo.list) {
            if (listToDo.list[key] === 'To Do') {
                console.log(`To Do: \n \t'${key}'`);
            } else if (listToDo.list[key] === 'In progress') {
                console.log(key);
            } else if (listToDo.list[key] === 'Done') {
                console.log(key);
            }
        }
    }
}

listToDo.changeStatus('write a post', 'Done');
listToDo.addTask('have a walk');
listToDo.deleteTask('make a bed');
console.log(listToDo);
listToDo.showList();
listToDo.showList2();