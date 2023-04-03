const ERROR_TASK = 'Sorry something went wrong!';
const TODO = 'Todo';
const DONE = 'Done';
const IN_PROGRESS = 'In Progress';

const toDoList = {
    'create a new practice task': 'In Progress', 
	'make a bed': 'Done', 
	// 'write a post': 'Todo',
}

function changeStatus(task, status) {
    if (typeof task === 'string' && (status === TODO || status === DONE || status === IN_PROGRESS)) {
        toDoList[task] = status;
        console.log(`Task status "${task}" successfully changed to "${status}"!`);
    } else {
        console.log(ERROR_TASK);
    }
}

function addTask(task) {
    if (typeof task === 'string') {
        toDoList[task] = '';
        console.log(`Task "${task}" added successfully!`);
    } else {
        console.log(ERROR_TASK);
    }
}

function deleteTask(task) {
    if (typeof task === 'string') {
        delete toDoList[task];
        console.log(`Task "${task}" successfully removed!`);
    } else {
        console.log(ERROR_TASK);
    }
}

function showList() {
    let done = '';
    let todo = '';
    let inProgress = '';
    let list;

    for (let key in toDoList) {
        if (toDoList[key] === DONE) {
            done += `\t ${key} \n`;
        } else if (toDoList[key] === TODO) {
            todo += `\t ${key} \n`;
        } else if (toDoList[key] === IN_PROGRESS) {
            inProgress += `\t ${key} \n`;
        }
    }

    if (todo === '') {
        todo = '\t - \n';
    } else if (done === undefined) {
        done = '\t - \n';
    } else if (inProgress === undefined) {
        inProgress = '\t - \n';
    }

    list = ` Todo: \n ${todo} Done: \n ${done} In Progress: \n ${inProgress}`;

    console.log(list);
}


showList();