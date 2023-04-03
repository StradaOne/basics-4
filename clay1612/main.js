const toDoList = {
    tasks: {
        'create a new practice task': 'In Progress',
        'make a bed': 'Done',
        'write a post': 'To Do',
    },

    addTask(taskName) {
        this.tasks[taskName] = 'To Do';
    },

    deleteTask(taskName) {
        delete this.tasks[taskName];
    },

    changeStatus(taskName, statusName) {
        if (statusName === 'To Do' || statusName === 'In Progress' || statusName === 'Done') {
            this.tasks[taskName] = statusName;
        }
    },

    getSortedTasks(taskStatus) {
        let taskStorage = '\t';

        for (let task in this.tasks) {
            if (this.tasks[task] === taskStatus) {
                taskStorage += `${task} \n\t`;
            }
        }

        return taskStorage;
    },

    showList() {
        let toDoTasks = this.getSortedTasks('To Do');
        let inProgressTasks = this.getSortedTasks('In Progress');
        let doneTasks = this.getSortedTasks('Done');

        switch ('\t') {
            case toDoTasks:
                toDoTasks += '-';
                break;
            case inProgressTasks:
                inProgressTasks += '-';
                break;
            case doneTasks:
                doneTasks += '-';
                break;
        }

        console.log(`To Do:\n${toDoTasks}\nIn Progress:\n${inProgressTasks}\nDone:\n${doneTasks}`);
    },
}

toDoList.addTask('go to gym');
toDoList.changeStatus('go to gym', 'In Progress');
toDoList.deleteTask('make a bed');
toDoList.changeStatus('go to gym', 'working on it');
toDoList.showList();