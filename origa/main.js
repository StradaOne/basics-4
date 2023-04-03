const STATUS = {
    TODO: "To Do",
    INPROGRESS: "In Progress",
    DONE: "Done"
}
const errorAddTask = "Такая задача уже существует"
const errorNameTask = "Такой задачи не существует"

const list = {
    "create a new practice task": "In Progress",
    "make a bed": "Done",
    "write a post": "To Do",
}


function changeStatus(nameTask, status) {
    if (!(nameTask in list)) {
        console.log(errorNameTask)

    }
    else
        list[nameTask] = status
}

function addTask(nameTask) {
    if (nameTask in list) {
        console.log(errorAddTask)

    }
    else
        list[nameTask] = STATUS.TODO
}

function deleteTask(nameTask) {
    if (!(nameTask in list)) {
        console.log(errorNameTask)

    }
    else
        delete list[nameTask]
}

function showList() {
    for (let name in list) {
        console.log(`${name}: ${list[name]}`)
    }
}

function showList2() {
    let todo = "" + STATUS.TODO + ":"
    let progress = "" + STATUS.INPROGRESS + ":"
    let done = "" + STATUS.DONE + ":"
    for (let name in list) {
        switch (list[name]) {
            case STATUS.TODO:
                todo += '\n' + '\t' + name
                break
            case STATUS.INPROGRESS:
                progress += '\n' + '\t' + name
                break
            case STATUS.DONE:
                done += '\n' + '\t' + name
                break
        }
    }
    console.log(todo.endsWith(":") ? todo + '\n' + '\t' + "-" : todo)
    console.log(progress.endsWith(":") ? progress + '\n' + '\t' + "-" : progress)
    console.log(done.endsWith(":") ? done + '\n' + '\t' + "-" : done)
}


changeStatus("write a post", "Done")
addTask('have a walk')
deleteTask('have a walk')
showList2()
