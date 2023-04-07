const statusList = {
    toDo: "To Do",
    inProgress: "In Progress",
    done: "Done"
};

const priorityList = {
    high: 1,
    mid: 2,
    low: 3
};

let toDoList = [];

function getIndexToDoList(name) {
    return toDoList.findIndex(task => task.name === name)
}

function sortToDoList() {
    switch (toDoList.length) {
        case 0:
            break
        default:
            toDoList.sort((task1, task2) => task1.priority - task2.priority)
    }
};

function changeTask(status, name, priority) {
    switch (~getIndexToDoList(name)) {
        case 0:
            console.log(`Task "${name}" doesn't exist.\n\n`)
            break
            console.log(`Task "${name}" doesn't exist.\n\n`)
        default:
            toDoList[getIndexToDoList(name)].status = status;
            switch (priority in priorityList) {
                case true:
                    toDoList[getIndexToDoList(name)].priority = priorityList[priority]
                    break
                default:
                    console.log(`Cannot possible set priority "${priority}" to task "${name}".\n\n`);
            }
            console.log(`The task "${name}" is successful changed to "${status}".\n\n`)
    }
    sortToDoList()
}

function addTask(status, name, priority = "low") {
    switch (~getIndexToDoList(name)) {
        case 0:
            let task = {
                status: status,
                name: name
            };
            switch (priority in priorityList) {
                case true:
                    task.priority = priorityList[priority];
                    message = `The task "${name}" is successful add with status "${status}" and "${priority}" priority\n\n`;
                    break
                default:
                    message = `The task "${name}" is successful add with status "${status}", but without priority "${priority}".\n\n`;
            }
            toDoList.push(task);
            console.log(message)
            break
        default:
            console.log(`Task "${name}" already exist.\n\n`)
    }
    sortToDoList()
}

function deleteTask(name) {
    switch (~getIndexToDoList(name)) {
        case 0:
            console.log(`Task "${name}" doesn't exist.\n\n`)
            break
        default:
            toDoList.splice(getIndexToDoList(name), 1);
            console.log(`The task "${name}" is successful deleted.\n\n`)
    }
}

function listTasks() {
    switch (toDoList.length) {
        case 0:
            console.log("ToDo пуст.\n\n");
            break
        default:
            for (let keySL in statusList) {
                let flag = 0;
                console.log(`${statusList[keySL]}:`);
                for (const task of toDoList) {
                    if (statusList[keySL] === task.status) {
                        let priority;
                        for (key in priorityList) {
                            task.priority === priorityList[key] ? priority = key : false;
                        }
                        console.log(`\t"${task.name}" with ${priority} priority`);
                        ++flag;
                    }
                }
                flag === 0 ? console.log(`\t-`) : false;
            }
            console.log('\n');
    }
}

listTasks()
addTask(statusList.toDo, 'почитать')
addTask(statusList.done, 'помыть посуду', "low")
addTask(statusList.done, 'помыть машину', "mid")
addTask(statusList.done, 'испачкать машину', "high")
addTask(statusList.toDo, 'почитать', "mid")
listTasks()
changeTask(statusList.done, 'почитать', "low")
deleteTask('помыть посуду')
deleteTask('помыть кота')
changeTask(statusList.done, 'посадить цветы')
listTasks()