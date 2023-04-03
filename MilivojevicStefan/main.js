// проверки входных данных
// константы на статусы
// оптимизация вывода
// счетчик i не нужен


const toDoList = {
    list : {
        "Create a new todo list" : "In progress",
        
        "Make a bed" : "Done",
        "Write a post" : "To Do",
    },
    changeStatus(task, status) {
        this.list[task] = status;
    },
    addTask(task, status) {
        this.list[task] = status
    },
    deleteTask(task) {
        delete this.list[task];
    },
    showList(){
        console.log("Todo:");
        let i = 0;
        for (let task in this.list) {
            
            if (this.list[task] == "To Do") {
                console.log(`\t` + task);
                i++;
            } 
        }
        if (i == 0) {
            console.log(`\t` + "-");
        }
        console.log("In progress:")
        i = 0;
        for (let task in this.list) {
            if (this.list[task] == "In progress") {
                console.log(`\t` + task);
                i++;
            }
        }
        if (i == 0) {
            console.log(`\t` + "-");
        }
        console.log("Done:");
        i = 0;
        for (let task in this.list) {
            if (this.list[task] == "Done") {
                console.log(`\t` + task);
                i++;
            }
        }
        if (i == 0) {
            console.log(`\t` + "-");
        }
    }
}

toDoList.addTask("Make a programm", "In progress");
toDoList.changeStatus("Make a programm", "Done");
toDoList.deleteTask("Create a new todo list");
toDoList.showList();

