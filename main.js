const STATUS = {
    TO_DO: 'To do',
    DONE: 'Done',
    IN_PROGRESS: 'In progress',
};

const PRIORITY = {
    HIGH: 'High',
    AVERAGE: 'Average',
    LOW: 'Low',
};

const toDoList = [
    { name: 'create a post', status: STATUS.IN_PROGRESS, priority: PRIORITY.LOW },
    { name: 'test', status: STATUS.DONE, priority: PRIORITY.HIGH },
];

function showToDoList() {

    for (const item in STATUS) {
        let countToDoElement = false;
        console.log(`${STATUS[item]}:`);
        toDoList.forEach(element => {
            if (element.status === STATUS[item]) {
                console.log(`\t"${element.name}" with priority ${element.priority}`);
                countToDoElement = true;
            }
        });
        if (!countToDoElement) {
            console.log('-');
        }
    }
}

function addTask(name, status, priority) {

    const isExists = toDoList.find(isExists => isExists.name === name);

    if (isExists === undefined) {
        toDoList.splice(toDoList.length, 0, { name, status, priority });

    } else {
        console.log(`This is task is already`);
    }
}

function changeTaskPriority(name, priority) {
    const isExists = toDoList.find(isExists => isExists.name === name);

    if (isExists !== undefined) {

        isExists.status = priority;

    } else {
        console.log(`This is task is undefined`);
    }
}

function changeTaskStatus(name, status) {
    const isExists = toDoList.find(isExists => isExists.name === name);

    if (isExists !== undefined) {

        isExists.status = status;

    } else {
        console.log(`This is task is undefined`);
    }
}

function deleteTask(name) {
    const isExists = toDoList.findIndex(isExists => isExists.name === name);
    console.log(isExists);
    if (isExists !== undefined) {
        toDoList.splice(isExists, 1)
    } else {
        console.log(`This is task is't exists`);
    }
}

addTask('test', STATUS.TO_DO, PRIORITY.AVERAGE);
addTask('test_1', STATUS.TO_DO, PRIORITY.HIGH);
addTask('test_2', STATUS.DONE, PRIORITY.LOW);
addTask('test_3', STATUS.TO_DO, PRIORITY.AVERAGE);

changeTaskStatus('test', STATUS.IN_PROGRESS);

deleteTask('test_2');


showToDoList();
