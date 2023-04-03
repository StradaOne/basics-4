
const states = {
    "To Do": "To Do",
    "In Progress": "In Progress",
    "Done": "Done",
}
function addStatus(statusName) {
    if (statusName in states) {
        console.log('Такой статус уже существует.');
    }
    else if (statusName === '') {
        console.error('Введите статус');
    }
    else {
        states[statusName] = statusName;
    }
}
function deleteStatus(status) {
    delete states[status];
    console.log(`Статус ${status} удален`);
}


const toDoList = {
    list: {},
    defaultState: "To Do",
    addTask(task) {
        if (task in this.list) {
            console.log('Такая задача уже существует. ');
        }
        else if (task === '') {
            console.error('Введите задачу');
        }
        else {
        this.list[task] = this.defaultState;
        console.log('Добавлена задача');
        }
    },

    deleteTask(task) {
        delete this.list[task];
        console.log('Задача удалена');
    },

    changeStatus(task, newStatus) {
        this.list[task] = newStatus;

    },
    showlist() {
        for (key in states) {
            console.log(`${key}:`);
            let out = '';
            for (task in this.list) {
                if (states[key] === this.list[task]) {
                    out += `\t "${task}" \n`;
                }
                
            }
            if (out !== '') {
                console.log(out);
                out = '';
            }
            else {
                console.log('\t -');
            }
  
        }
    
    }
};
toDoList.addTask('Сделать ToDo list');
toDoList.addTask('Позаниматься английским');
toDoList.addTask('Составить план тренировки');
toDoList.addTask('Провести тренировку');
toDoList.addTask('Сходить за продуктами');
toDoList.changeStatus('Сделать ToDo list', "Done")
toDoList.changeStatus('Составить план тренировки', 'Done')
toDoList.addTask('');

addStatus('Postponed');
toDoList.changeStatus('Сходить за продуктами', 'Postponed');

toDoList.showlist();





