const Status = {
    ToDo: "ToDo",
    InProgress: "InProgress",
    Done: "Done",
};

const Priority = {
    LOW: "LOW",
    HIGH: "HIGH",
};

let toDoList = [
    {
        name: "create a post",
        status: Status.InProgress,
        priority: Priority.LOW,
    },

    {
        name: "test",
        status: Status.InProgress,
        priority: Priority.HIGH,
    },
];

function addTask(task) {
    toDoList.push(task);
}

function changeTask(taskName, changedTask) {
    const index = toDoList.findIndex((task) => task.name === taskName);
    toDoList[index] = changedTask;
}

function deleteTask(taskName) {
    toDoList = toDoList.filter((task) => task.name !== taskName);
}

function groupTasksByStatus(toDoList) {
    const tasksByStatus = {};

    for (let key in Status) {
        const status = Status[key];
        tasksByStatus[status] = [];
    }

    for (let task of toDoList) {
        tasksByStatus[task.status].push(task);
    }

    return tasksByStatus;
}

function showList(toDoList) {
    const tasks = groupTasksByStatus(toDoList);

    for (let status in tasks) {
        for (let task of tasks[status]) {
            console.log(`"${task.name}": ${task.status}`);
        }

        if (tasks[status].length === 0) {
            console.log(`Nothing is ${status}`);
        }

        console.log("");
    }
}

function showListByStatus(toDoList) {
    const tasks = groupTasksByStatus(toDoList);

    for (let status in tasks) {
        console.log(`${status}:`);

        for (let task of tasks[status]) {
            console.log(`    "${task.name}"`);
        }

        if (tasks[status].length === 0) {
            console.log(`    -`);
        }
    }
}

addTask({ name: "TASK-3", status: Status.ToDo, priority: Priority.HIGH });
changeTask("test", {
    name: "CHANGED-TASK-3",
    status: Status.InProgress,
    priority: Priority.LOW,
});
// showList(toDoList);
showListByStatus(toDoList);
deleteTask("CHANGED-TASK-3");
console.log("\n--------------------\n");
// showList(toDoList);
showListByStatus(toDoList);
