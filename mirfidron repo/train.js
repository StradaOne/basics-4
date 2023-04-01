const Status = {
    Done: "Done",
    InProgress: "In Progress",
	Todo: "To Do",
};

const ToDo ={
    list : {
        "create a new practice task": "In Progress", 
        "make a bed": "Done", // задача "заправить кровать" в статусе "Готово"
        "write a post": "To Do",
    },
    addTask(task, status) {
        this.list[task] = status;
    },
	changeStatus(task, status){
        this.list[task] = status; // изменяет
    },
    deleteTask(task) {
        delete this.list[task];
    },
    showList() {
        console.log('To Do:')
        for (task in ToDo.list ) {
            if(ToDo.list[task] === Status.Todo){console.log(' '+ task)};
        };
        console.log('Done:')
        for (task in ToDo.list) {
            if(ToDo.list[task] === Status.Done){console.log(' '+ task)}
        };
        console.log('In Progress:')
        for(task in ToDo.list) {
            if(ToDo.list[task] === Status.InProgress){console.log(' ' + task)}
        }

    }
}

ToDo.addTask("awake", "To Do");
ToDo.addTask("wash up", "To Do");
ToDo.addTask("read the book", "Done");
ToDo.addTask("sleep", "Done");
ToDo.changeStatus("wash up", "In Progress");
ToDo.changeStatus("make a bed", "To Do")
ToDo.deleteTask("sleep");
ToDo.showList();