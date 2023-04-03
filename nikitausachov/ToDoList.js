// константы на статусы
// оптимизация вывода
// проверки

const Todo = {
    list:{
        "create a new practice task": "In Progress",
        "make a bed": "Done",
        "write a post": "To Do"
    },
    changeStatus(task,status){
        this.list[task]=status
        console.log(task + " --Task changed--")
    },
    addTask(newTask){
        this.list[newTask]="To Do"
        console.log(newTask + "--task added--")
    },
    deleteTask(task) {
        delete this.list[task]
        console.log(task + " --Task deleted--")
    },
    showList(){
        const noTask = '\t' + '-';
        console.log("---To Do List---")
        console.log("In Progress:")
        let i = 0;
        for (const name in Todo.list) {
            if (this.list[name] === "In Progress") {
                console.log(`\t` + name)
                i += 1;
            }
        }
        if (i === 0) {
            console.log(noTask);
        }
        console.log("Done:")
        i = 0;
        for (const name in Todo.list){
            if (this.list[name]=== "Done"){
                console.log(`\t` + name)
                i+= 1;
            }
        }
        if (i === 0) {
            console.log(noTask);
        }
        console.log("To Do:")
        i = 0;
        for (const name in Todo.list){
            if (this.list[name] === "To Do"){
                console.log(`\t` + name)
                i+= 1;
            }
        }
        if (i === 0) {
            console.log(noTask);
        }
    }
}
Todo.addTask("shower")
Todo.changeStatus("make a bed","Done")
Todo.deleteTask("write a post")
Todo.deleteTask("create a new practice task")
Todo.showList()