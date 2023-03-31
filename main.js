
const statusInProgress = "In Progress";
const statusDone = "Done";
const statusToDo = "To Do";
const toDoList = {
    list: {},
    
    addTask(task) {
        if (task in this.list) {
            console.log('Такая задача уже существует. ');
        }
        else if (task === '') {
            console.log('Введите задачу');
        }
        else {
        this.list[task] = statusToDo;
        }
    },

    deleteTask(task) {
        delete this.list[task];
    },

    changeStatus(task, status) {
        if (status === statusToDo) {
            this.list[task] = statusToDo;
        }
        else if (status === statusInProgress) {
            this.list[task] = statusInProgress;
        }
        else if (status === statusDone) {
            this.list[task] = statusDone;
        }
    },
    showlist() {
        let list = '';
        let toDo = '';
        let inProgress = '';
        let done = '';

        for (key in this.list) {
            if (this.list[key] === statusToDo) {
                toDo += `\t "${key}" \n`;
            }
            else if (this.list[key] === statusInProgress) {
                inProgress += `\t "${key}" \n`;
            }
            else if (this.list[key] === statusDone) {
                done += `\t "${key}" \n`;
            }
            
            
        }
        if (toDo === '') {
            toDo = '\t -\n';
        }
        else if (inProgress === '') {
            inProgress = '\t -\n';
        }
        else if (done === '') {
            done = '\t -\n';
        }
        
        return list = ` Todo: \n${toDo} In Progress: \n${inProgress} Done: \n${done}`;
    }
};
toDoList.addTask('Сделать ToDo list');
toDoList.addTask('Позаниматься английским');
toDoList.addTask('Составить план тренировки');
toDoList.addTask('Провести тренировку');
toDoList.addTask('Сходить за продуктами');
toDoList.changeStatus('Сделать ToDo list', statusDone)
toDoList.changeStatus('Составить план тренировки', statusDone)
toDoList.addTask('');

console.log(toDoList.showlist());




