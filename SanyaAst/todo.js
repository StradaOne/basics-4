// константы на статусы
// проверки
// вывод  "-" если нет задач

const list = {
    'create' : 'In progress',
    'make' :  'To Do',
    'write' : 'To Do',
    'cock' : 'To Do',
}

function addTask (taskName) {
    if (taskName in list) {
        console.log('task already added');
    } else {
        list[taskName] = 'To Do';
    }
}

function deleteTask (taskName) {
    if (taskName in list) {
        delete list[taskName];
    } else {
        console.log('no have task');
    }
}

function changeStatus (taskName, newStatus) {
    if (taskName in list) {
        list[taskName] = newStatus;
    } else {
        console.log('no have task');
    }
}

function showList () {
    let toDo = '';
    let inProgress = '';
    let done = '';

    for (taskName in list) {
        switch (list[taskName]) {
            case 'To Do' : 
                toDo += `\t${taskName} \n`;
                break;
            case 'In progress' :
                inProgress += `\t${taskName} \n`;
                break;
            case 'Done' :
                done += `\t${taskName} \n`;
                break;
        }
    }
    console.log(`To do:\n${toDo}\nIn Progress:\n${inProgress}\nDone:\n ${done} `);
}

showList ()