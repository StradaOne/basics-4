const STATUS = {
    TODO:'To Do',
    PROGRESS:'In Progress',
    DONE:'Done',
}
const PRIORITY = {
    LOW:'Low',
    HIGH: 'High',
    NORMAL: 'Normal',
}
const DEFAULTVALUE = {
    STATUSTASK:STATUS.TODO,
    PRIORITYTASK:PRIORITY.LOW,
}
const ERROR = {
    LIST_IS_EMPTY:'list is empty',
    ADDING_ERROR:'adding error, there is such a task',
    DELITION : 'deletion error, no such task',
    CHENGE_STATUS: 'change status error, no such task',
    CHENGE_PRIORITY: 'change priority error, no such task'
}
const COLOR = {  
    yellow: "\x1b[33m",
    cyan: "\x1b[36m",
    green: "\x1b[32m",
    reset: "\x1b[0m",
}

const list = [
    {name: 'create a post', status: STATUS.PROGRESS, priority: PRIORITY.LOW}, 
    {name: 'test', status: STATUS.DONE, priority: PRIORITY.HIGH},
];
function nameInList (name) {
    return ((list.find(list => list.name === name))?true:false);
}
function addTask (name) {
    if (nameInList(name)) {
        console.log(ERROR.ADDING_ERROR);
        return false;
    }
    else {
        list.push ({name:name,status:DEFAULTVALUE.STATUSTASK,priority:DEFAULTVALUE.PRIORITYTASK});
        return true;
    }
}

function delTask(name){
    const indexdel = list.findIndex (task => task.name === name);
    if (indexdel === -1) {
        console.log (ERROR.DELITION);
        return false;
    }
    list.splice(indexdel,1);
    return true;
}

function changeStatus(name,status) {
    const indexStatus = list.findIndex (task => task.name == name);
    if (indexStatus === -1) {
        console.log(ERROR.CHENGE_STATUS);
        return false;
    }
    list[indexStatus].status = status;
    return true;
}

function changePriority(name,priority) {
    const indexPriority = list.findIndex (task => task.name === name);
    if (indexPriority ===-1) {
        console.log(ERROR.CHENGE_PRIORITY);
        return false;
    }
    list[indexPriority].priority = priority;
    return true;
}
function showStatus(status) {
    let flag = false;
    console.log(status)
    for (const task of list) {
        if (task.status === status) {
            console.log(`\t Task -  ${task.name} priority - ${task.priority}`);
            flag = true;
        }
    }
    if(!flag) console.log(`\t ${COLOR.green}---${COLOR.reset}`);
}
function showList () {
    if (!list.length) {
        console.log(ERROR.LIST_IS_EMPTY);
        return false;
    }
    showStatus(STATUS.PROGRESS);
    showStatus(STATUS.TODO);
    showStatus(STATUS.DONE);
}
showList ();
addTask('test3');
addTask('test2');
changeStatus('test2',STATUS.DONE);
changePriority('test2',PRIORITY.HIGH);
delTask('test3');
showList();