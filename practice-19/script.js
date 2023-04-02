const StatusToDo = "ToDo";
const StatusProgress = "InProgress";
const StatusDone = "Done";

const toDoList = {
    "create a new practice task": StatusProgress,
    "make a bed": StatusProgress,
    "write a post": StatusToDo,
};

function changeStatus(task, status) {
    toDoList[task] = status;
}

function addTask(task) {
    toDoList[task] = StatusToDo;
}

function deleteTask(task) {
    delete toDoList[task];
}

function getTasksByStatus(toDoList) {
    const tasksByStatus = {
        [StatusToDo]: [],
        [StatusProgress]: [],
        [StatusDone]: [],
    };

    for (let task in toDoList) {
        const status = toDoList[task];
        tasksByStatus[status].push(task);
    }

    return tasksByStatus;
}

function showList(toDoList) {
    const tasks = getTasksByStatus(toDoList);

    for (let status in tasks) {
        for (let task of tasks[status]) {
            console.log(`"${task}": ${status}`);
        }

        if (tasks[status].length === 0) {
            console.log(`Nothing is ${status}`);
        }

        console.log("");
    }
}

function showListByStatus(toDoList) {
    const tasks = getTasksByStatus(toDoList);

    for (let status in tasks) {
        console.log(`${status}:`);

        for (let task of tasks[status]) {
            console.log(`    "${task}"`);
        }

        if (tasks[status].length === 0) {
            console.log(`    -`);
        }
    }
}

addTask("make coffee", StatusDone);
changeStatus("write a post", StatusProgress); // меняет статус задачи
addTask("have a walk"); // добавляет новую задачу
deleteTask("have a walk"); // удаляет задачу
showList(toDoList); // показывает список всех задач
console.log("--------\n");
showListByStatus(toDoList);
