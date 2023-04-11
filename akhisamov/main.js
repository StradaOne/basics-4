const statusList = {
    ToDo: 'To do',
    InProgress: 'In progress',
    Done: 'Done',
}

const priorityList = {
    Low: 'Low',
    Hight: 'Hight',
}

const list = [ 
	{name: 'Побегать', status: statusList.ToDo, priority: priorityList.Low}, 
    {name: 'Покушать', status: statusList.Done, priority: priorityList.Hight}, 
];

function addTask(task) {
    if(list.find(item => item.name === task)) {
        console.log(`Задача ${task} уже в списке.`);
    } else {
        list.push({name: task, status: statusList.ToDo, priority: priorityList.Low });
    }
}

function deleteTask(task) {
    let result = list.findIndex(item => item.name === task);
    list.splice(result, 1);
}

function changeStatus(task, idStatus) {
    let result = list.findIndex(item => item.name === task);
    if (result === -1) {
        console.log(`Задача ${task} отсутствует.`);
    } else {
        list[result].status = idStatus;
    }
}

function changePriority(task, idPriority) {
    let result = list.findIndex(item => item.name === task);
    if (result === -1) {
        console.log(`Задача ${task} отсутствует.`);
    } else {
        list[result].priority = idPriority;
    }
}

function showList() {
    let checkToDo = false;
    let checkInProg = false;
    let checkDone = false;
    
    console.log(`${statusList.ToDo}:`)
    for (const task of list) {
        if (task.status === statusList.ToDo) {
            console.log(`\t${task.name}, приоритет: ${task.priority}`)
            checkToDo = true;
        }
    }

    if (!checkToDo) {
        console.log('\t-')
    }

    console.log(`${statusList.InProgress}:`)
    for (const task of list) {
        if (task.status === statusList.InProgress) {
            console.log(`\t${task.name}, приоритет: ${task.priority}`)
            checkInProg = true;
        }
    }

    if (!checkInProg) {
        console.log('\t-')
    }

    console.log(`${statusList.Done}:`)
    for (const task of list) {
        if (task.status === statusList.Done) {
            console.log(`\t${task.name}`)
            checkDone = true;
        }
    }

    if (!checkDone) {
        console.log('\t-')
    }
}

addTask('Умыться');
addTask('Покормить кошку');

changeStatus('Умыться', statusList.InProgress);
changePriority('Покормить кошку', priorityList.Hight);
changePriority('Бла-бла-бла', priorityList.Hight);
deleteTask('Побегать');

showList();
