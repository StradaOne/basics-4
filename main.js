const statusToDo = {
    IN_PROGRESS: "In Progress",
    DONE: "Done",
    TO_DO: "To Do",
}

const list = {
    "create a new practice task": statusToDo.IN_PROGRESS,
    "make a bed": statusToDo.DONE,
    "write a post": statusToDo.TO_DO,
}

let countToDo = false;

function showItemList(itemList) {

    console.log(`${itemList}: `);
    for (item in list) {
        if (list[item] === itemList) {
            console.log(`"${item}"`);
            countToDo = true;
        }
    }
    if (!countToDo) {
        console.log("-");
    }
}

function showList() {
    for (statusTask in statusToDo) {
        showItemList(statusToDo[statusTask]);
    }
}

function addTask(task) {
    if (!(task in list)) {
        list[task] = statusToDo.TO_DO;
    } else {
        return console.log('This is task is already create');
    }
}
function changeStatus(task, status) {
    if (task in list) {
        list[task] = status;
    }
}

function deleteTask(task) {
    if (task in list) {
        delete list[task];
    } else {
        return console.log('This is task already delete or not create');
    }
}

addTask("have a walk");
addTask("have a walk");
changeStatus("write a post", statusToDo.DONE);
deleteTask("make a bed");
deleteTask("make a bed");
showList();
