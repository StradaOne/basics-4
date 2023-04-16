const STATUS = {
    DONE: "Done",
    INPROGRESS: "In Progress",
    TODO: "To Do"
};


const todoList = [
    {name: 'create a post', status: STATUS.INPROGRESS, priority: "Low"}, 
    {name: 'test', status: STATUS.INPROGRESS, priority: "Low"},
    {name: 'abrakadabra', status: STATUS.INPROGRESS, priority: "Low"},
    {name: 'walking', status: STATUS.TODO, priority: "Low"}
  
]; 

function addTask(task) {
    for (let elem of todoList) {
        const indexElem = elem;
        if (task === indexElem.name) {
        return console.log(`task ${task} in list`)
        };
    };

    todoList.push({name: task, status: STATUS.INPROGRESS, priority: "Low"}); 
    
};

function deleteTask(task) {
    const taskName = todoList.findIndex(tasks => tasks.name === task);
    todoList.splice(taskName, 1);
};

function changeStatus(task, newStatus) {
    for (key in todoList) {
        if (todoList[key].name === task) {
            todoList[key].status = newStatus;
        };
    };
};

function showList() {
    let tasksInProg = '';
    let tasksDone = '';
    let tasksToDo = '';
    console.log("================")
    for (const task of todoList) {
        if (task.status === STATUS.INPROGRESS) {
            tasksInProg += `\n  ${task.name} | priority: "Low"`;
            
        } else if (task.status === STATUS.DONE) {
            tasksDone += `\n  ${task.name} | priority: "Low"`;
            
        } else if (task.status === STATUS.TODO) {
            tasksToDo += `\n  ${task.name} | priority: "Low"`;
        };
        
    };

    if (tasksInProg === '') {
        console.log(`In Progress: \n \t -`);
    } else {
        console.log(`In Progress:  ${tasksInProg}`);
    };

    if (tasksDone === '') {
        console.log(`Done: \n \t -`);
    } else {
        console.log(`Done: ${tasksDone}`);
    };  

    if (tasksToDo === '') {
        console.log(`To Do: \n \t -`);
    } else {
        console.log(`To Do: ${tasksToDo}`);
    };
};

addTask('qwerty');
addTask('qwerty');
addTask('reading');
addTask('reading');
addTask('testTEST');
deleteTask('abrakadabra');
deleteTask('testTEST')
changeStatus('test', STATUS.DONE);
changeStatus('qwerty', STATUS.DONE);
changeStatus('reading', STATUS.DONE);


showList();