const ToDo = {
    list: {
        "registration of technical acts": "To Do",
        "learning English": "Done",
        "to pass the exam on labor protection": "To Do",
        "complete a course assignment": "In Progress",
    },

    addTask(task) {
        this.list[task] = "To Do";
    },
    deleteTask(task) {
        delete this.list[task];
    },
    changeStatus(task, status) {
        this.list[task] = status;
    },
    showList() {
        console.log(this.list);
    },
};

// console To Do

ToDo.addTask("make a reference");
ToDo.deleteTask("learning English");
ToDo.changeStatus("to pass the exam on labor protection", "Done");
ToDo.showList();

console.log(ToDo);

