const toDo = {
    
    list: {
        "Create a new practice task": "In Progress", 
	    "Make a bed": "Done",
	    "Write a post": "To Do",
        "Education": "To Do",
        "BROKE TASK": "To Do",
    },

    addTask (nameTask) {
        this.list[nameTask] = "To Do";
    },

    deleteTask (nameTask) {
        delete this.list[nameTask];
    },

    showList () {
        console.log (">>>>>>>>>>>>>");

        console.log ('To Do');
        for (const name in toDo.list) {
            if (this.list[name] == 'To Do') {
                console.log('  ', name);
            }
        }

        console.log ('Done');
        for (const name in toDo.list) {
            if (this.list[name] == 'Done') {
                console.log('  ', name);
            }
        }

        console.log ('In Progress');
        for (const name in toDo.list) {
            if (this.list[name] == 'In Progress') {
                console.log('  ', name);
            }
        }
    },

    changeStatus (taskName, newStatus) {
        this.list[taskName] = newStatus;
    }

};

toDo.addTask ('Write code');
toDo.deleteTask ('BROKE TASK');
toDo.changeStatus ('Write a post', 'Done');
toDo.showList();
