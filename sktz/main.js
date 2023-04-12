const STATUS = {
    INPROGRESS:'In progress',
    DONE:'Done',
    TODO:'To Do'
};
const PRIORITY = {
    HIGH:'high',
    MIDDLE:'middle',
    LOW:'low'
};

var toDo = [
        {
            name     : 'create a post', 
            status   : STATUS.INPROGRESS, 
            priority : PRIORITY.LOW
        },

        {
            name     : 'Coding write', 
            status   : STATUS.INPROGRESS, 
            priority : PRIORITY.LOW
        },
    
        {
            name     : 'test',
            status   : STATUS.DONE, 
            priority : PRIORITY.HIGH
        },

];

const editList = (nameTask, statusTask) => {
    const item = toDo.findIndex((el) => el.name === nameTask);

    if (item >= 0) {
        toDo[item].status = statusTask;
    }
}

const deleteList = (nameTask) => {
    let newToDo = toDo.filter ((toDoItem) => toDoItem.name !== nameTask);
    toDo = newToDo;
}

const addList = (nameTask, priorityTask) => {
    const statusTask = STATUS.TODO;
    let doubleItem = false;

    for (const task of toDo) {
        if (task.name == nameTask) {
            doubleItem = true;
        }
    }

    if (doubleItem == false) {
        newTask = {
            name       : nameTask,
            status     : statusTask,
            priority   : priorityTask
        };
    
        toDo.push (newTask);
    } else {
        console.log ('Задача с таким именем уже существует')
    }
}

const showList = () => {
    const showItemProgress = toDo.filter (i => i.status === STATUS.INPROGRESS);
    const showItemDone     = toDo.filter (i => i.status === STATUS.DONE);
    const showItemToDo     = toDo.filter (i => i.status === STATUS.TODO); 

    if (showItemProgress.length == 0) {
        console.log (`\n   ${STATUS.INPROGRESS}`);
        console.log ('      ---');
    } else {
        console.log (`\n   ${STATUS.INPROGRESS}`);

        showItemProgress.forEach (i => {
            console.log ('      ', i.name,);
        });
    }

    if (showItemDone.length == 0) {
        console.log (`\n  ${STATUS.DONE}`);
        console.log ('      ---');
    } else {
        console.log (`\n   ${STATUS.DONE}`);

        showItemDone.forEach (i => {
            console.log ('      ', i.name,);
        });
    }

    if (showItemToDo.length == 0) {
        console.log (`\n   ${STATUS.TODO}`);
        console.log ('      ---');
    } else {
        console.log (`\n   ${STATUS.TODO}`);

        showItemToDo.forEach (i => {
            console.log ('      ', i.name,);
        });
    }
    console.log ('\n');
}

addList ('Updates', PRIORITY.LOW);
deleteList ('Codin1g write');
editList ('create a post', 'Done');
showList ();