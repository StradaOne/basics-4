const DUPLICATE_TASK_TEXT = `Такая задача уже существует`;
const STATUSES = {
    NOT_DISTRIBUTED_TASKS: 'Не распределенные',
    PLANED_TASKS: 'Запланированные',
    IN_PROGRESS_TASKS: 'В процессе выполнения',
    DONE_TASKS: 'Выполненные',
};

const list = [
    {
        id: "id" + Math.random().toString(16).slice(2),
        title: "create a new practice task",
        isPlanned: false,
        isDone: false,
        inProgress: false,
    },
    {
        id: "id" + Math.random().toString(16).slice(2),
        title: "go to the training",
        isPlanned: true,
        isDone: false,
        inProgress: false,
    },
    {
        id: "id" + Math.random().toString(16).slice(2),
        title: "do some exercises",
        isPlanned: true,
        isDone: false,
        inProgress: false,
    },
    {
        id: "id" + Math.random().toString(16).slice(2),
        title: "write a post",
        isPlanned: false,
        isDone: true,
        inProgress: false,
    },
]
console.log(list)

const changeStatusToCompleted = (title) => {
    const completedTaskIndex = list.findIndex(item => item.title === title);
    list[completedTaskIndex].isDone = !list[completedTaskIndex].isDone;
    if (list[completedTaskIndex].isDone) {
        list[completedTaskIndex].isPlanned = false;
        list[completedTaskIndex].inProgress = false;
    }
}

const changeStatusToPlanned = (title) => {
    const plannedTaskIndex = list.findIndex(item => item.title === title);
    list[plannedTaskIndex].isPlanned = !list[plannedTaskIndex].isPlanned;
    console.log(list[plannedTaskIndex].isPlanned)
    if (list[plannedTaskIndex].isPlanned) {
        list[plannedTaskIndex].isDone = false;
        list[plannedTaskIndex].inProgress = false;
    }
}

const changeStatusToInProgress = (title) => {
    const inProgressTaskIndex = list.findIndex(item => item.title === title);
    list[inProgressTaskIndex].inProgress = !list[inProgressTaskIndex].inProgress;
    if (list[inProgressTaskIndex].inProgress) {
        list[inProgressTaskIndex].isDone = false;
        list[inProgressTaskIndex].isPlanned = false;
    }
}

const addTask = (title) => {
    const isDuplicate = list.find(item => item.title.toLowerCase() === title.trim().toLowerCase())
    if (isDuplicate) {
       return console.log(DUPLICATE_TASK_TEXT)
    } else {
        list.push({
            id: "id" + Math.random().toString(16).slice(2),
            title,
            isPlanned: false,
            isDone: false,
            inProgress: false,
        })
    }
    console.log(`Задача '${title}' успешно добавлена!`)
}

const deleteTask = (title) => {
    const taskIndexToDelete = list.findIndex(item => item.title === title);
    list.splice(taskIndexToDelete, 1);
}

const makeFinalArray = (arr) => {
     arr.length === 0 ? arr.push('-') :
        arr = arr.map(item => item.title).join('\n\t');
    return arr
}

const showList = (list) => {
    let itemsTodo = list.filter((item, index) => list[index].isPlanned);
    let itemsInProgress = list.filter((item, index) => list[index].inProgress);
    let itemsDone = list.filter((item, index) => list[index].isDone);
    let itemsNotDistributed = list.filter((item, index) => !list[index].isPlanned && !list[index].inProgress && !list[index].isDone)

    itemsTodo = makeFinalArray(itemsTodo)
    itemsInProgress = makeFinalArray(itemsInProgress)
    itemsDone = makeFinalArray(itemsDone)
    itemsNotDistributed = makeFinalArray(itemsNotDistributed)

    console.log(`
        ${STATUSES.NOT_DISTRIBUTED_TASKS}: 
\t${itemsNotDistributed}
        ${STATUSES.PLANED_TASKS}: 
\t${itemsTodo}
        ${STATUSES.IN_PROGRESS_TASKS}: 
\t${itemsInProgress}
        ${STATUSES.DONE_TASKS}:  
\t${itemsDone}
        `
            )
}

showList(list)
addTask('затащить todo на массивах');
showList(list)
