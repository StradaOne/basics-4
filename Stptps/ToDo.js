// константу нужно использовать везде
const Status = {
    Todo: "To Do",
    Done: "Done",
    InProgress: "In Progress",

};

const ToDo ={
    list : {
        "create a new practice task": "In Progress", 
        "make a bed": "Done", // задача "заправить кровать" в статусе "Готово"
        "write a post": "To Do", // TYT
    },
    addTask(task, status) {
        this.list[task] = status;
    },
    deleteTask(task) {
        delete this.list[task];
    },
    changeStatus(task, status){
        if (status == "To Do" || "In Progress" || "Done"  ) { // TYT
            return this.list[task] = status;
        }
    },
    showList() {
        // TYT
        console.log('To Do:')
        for (task in ToDo.list ) {
            if(ToDo.list[task]===Status.Todo){console.log('     '+ task)};
        };
        console.log('Done:')
        for (task in ToDo.list) {
            if(ToDo.list[task]===Status.Done){console.log('     '+ task)}
        };
        console.log('In Progress:')
        for(task in ToDo.list) {
            if(ToDo.list[task]===Status.InProgress){console.log('     ' + task)}
        }
       
    }
}
ToDo.addTask("make a dinner", "To Do");
ToDo.addTask("make a Strada", "Done");
ToDo.addTask("go for a walk", "To Do");
ToDo.addTask("clean-up the room", "To Do");
ToDo.changeStatus("go for a walk", "In Progress");
ToDo.changeStatus("write a post", "Done")
ToDo.deleteTask("make a bed");
ToDo.showList();
