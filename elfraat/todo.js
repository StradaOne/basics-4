const STATUS = {
    TO_DO : 'To Do',
    DONE : 'Done',
    IN_PROGRESS : 'In Progress'
};
const PRIORITY = {
    LOW : 'low',
    HIGH : 'high'
};
const toDoList = [
    {name: 'create a post', status: STATUS.TO_DO, priority: PRIORITY.HIGH},
    {name: 'test', status: STATUS.DONE, priority: PRIORITY.HIGH},
    {name: 'do todo list', status: STATUS.IN_PROGRESS, priority: PRIORITY.LOW},
    {name: 'do todo list', status: STATUS.IN_PROGRESS, priority: PRIORITY.LOW},
];


function addTask(name, status = STATUS.TO_DO,priority = PRIORITY.LOW){
    toDoList.push({ name, status, priority });
}

function changeStatus(name,status){
    toDoList.splice(toDoList.indexOf(name),0,status = STATUS.DONE);
}

function deleteTask(name){
    toDoList.splice(toDoList.indexOf(name));
}

function showList(){
    for (const task of toDoList){
        console.log(`
        name: ${task.name}  
        status: ${task.status} 
        priority: ${task.priority}`)
    }
}


addTask('test addTask function',STATUS.IN_PROGRESS,PRIORITY.HIGH);
deleteTask('test addTask function');
changeStatus('do todo list',0, STATUS.TO_DO);
showList();