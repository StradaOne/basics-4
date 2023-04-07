const list = [
    { name: 'make a video', status: 'in progress', priority: 'high' },
    { name: 'wash the dishes', status: 'todo', priority: 'low' },
];

const values = {
    statuses: {
        todo: 'TODO',
        inProgress: 'IN PROGRESS',
        done: 'DONE',
    },
    priorities: {
        high: 'HIGH',
        mid: 'MID',
        low: 'LOW',
    },
};

const messages = {
    errors: {
        unknownName: 'Введите название задачи и попробуйте снова',
        wrongStatus: 'Введите корректный статус задачи ("todo", "in progress", "done")\nИ попробуйте снова',
        wrongPriority: 'Введите корректное название приоритета ("low", "mid", "high")\nИ попробуйте снова',
        wrongName: 'Задача с таким названием не существует',
    },
    alerts: {
        taskAdded: 'Вы успешно добавили задачу',
        taskDeleted: 'Вы успешно удалили задачу',
        taskStatusChanged: `Вы успешно изменили статус задачи на`,
        taskPriorityChanged: `Вы успешно изменили приоритет задачи на`,
    },
};

function checkArgs(statusTask, priorityTask) {
    if (statusTask.toUpperCase() !== values.statuses.todo
        && statusTask.toUpperCase() !== values.statuses.inProgress
        && statusTask.toUpperCase() !== values.statuses.done) {
        return true;
    } else if (priorityTask.toUpperCase() !== values.priorities.low
        && priorityTask.toUpperCase() !== values.priorities.mid
        && priorityTask.toUpperCase() !== values.priorities.high) {
        return true;
    };
};

function checkAddedTask(nameTask, statusTask, priorityTask) {
    if (!nameTask) {
        console.log(messages.errors.unknownName);
        return true;
    } else if (checkArgs(statusTask, priorityTask)) {
        console.log(messages.errors.wrongStatus);
        return true;
    } else if (checkArgs(statusTask, priorityTask)) {
        console.log(messages.errors.wrongPriority);
        return true;
    };
};

function addTask(nameTask, statusTask, priorityTask) {
    if (checkAddedTask(nameTask, statusTask, priorityTask)) return;

    list.push({
        name: nameTask,
        status: statusTask,
        priority: priorityTask,
    });

    return console.log(`${messages.alerts.taskAdded} "${nameTask}"!`);
};

function deleteTask(nameTask) {
    const taskIndex = list.findIndex(item => item.name === nameTask);

    if (taskIndex === -1) {
        console.log(messages.errors.wrongName);
        return;
    };
    list.splice(taskIndex, 1);

    console.log(`${messages.alerts.taskDeleted} "${nameTask}"!`);
};

function changeStatus(nameTask, statusTask) {
    const taskIndex = list.findIndex(item => item.name === nameTask);
    if (taskIndex === -1) {
        console.log(messages.errors.wrongName);
        return;
    };

    if (statusTask.toUpperCase() !== values.statuses.todo
        && statusTask.toUpperCase() !== values.statuses.inProgress
        && statusTask.toUpperCase() !== values.statuses.done) {
        console.log(messages.errors.wrongStatus);
        return;
    };

    list[taskIndex].status = statusTask;

    console.log(`${messages.alerts.taskStatusChanged} "${statusTask}"`);
};

function changePriority(nameTask, priorityTask) {
    const taskIndex = list.findIndex(item => item.name === nameTask);
    if (taskIndex === -1) {
        console.log(messages.errors.wrongName);
        return;
    }

    if (priorityTask.toUpperCase() !== values.priorities.low
        && priorityTask.toUpperCase() !== values.priorities.mid
        && priorityTask.toUpperCase() !== values.priorities.high) {
        console.log(messages.errors.wrongPriority);
        return;
    };

    list[taskIndex].priority = priorityTask;
    console.log(`${messages.alerts.taskPriorityChanged} "${priorityTask}"`);
};

function showPriority(priority) {
    let tasks = ``;
    list.forEach(item => {
        if (item.priority === priority) {
            tasks += `${priority}:\n\t${item.name}: ${item.status}`;
            console.log(tasks);
            return;
        };
    });
    if (!tasks) {
        tasks += `${priority}:\n\t-`;
        console.log(tasks);
        return;
    }
}

function showList() {
    showPriority('high');
    showPriority('mid');
    showPriority('low');
};

addTask('aboba', 'todo', 'low');
deleteTask('asf');
changeStatus('aboba', 'todo');
changePriority('abobaa', 'mid');