const task = {
    list: {
        "create a new practice task": "In Progress",
        "make a bed": "Done",
        "write a post": "To Do",
        "Zadacha4": "In Progress",
        "Zadacha5": "In Progress"
    },

    changeStatus(nameTask, Status) {
        this.list[nameTask] = Status;

    },
    addTask(nameTask, Status) {
        this.list[nameTask] = Status;
    },
    deleteTask(nameTask) {
        delete this.list[nameTask];
    },
    showList() {
        console.log(this.list);

    }

}
task.changeStatus("create a new practice task", "Done");
task.addTask("Zadacha", "Done");
task.deleteTask("make a bed");
task.showList();



