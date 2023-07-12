"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeStatus = exports.removeTask = exports.addTask = exports.list = exports.priorities = exports.statuses = void 0;
exports.statuses = {
    TODO: 'ToDo',
    DONE: 'Done',
};
exports.priorities = {
    HIGH: 'high',
    LOW: 'low',
};
exports.list = [];
const isEmpty = (task) => { return !task.trim(); };
function isTaskExists(name) {
    return exports.list.map(t => t.name).indexOf(name) !== -1;
}
function indexOfTask(task) {
    return exports.list.findIndex(t => t.name === task);
}
function isStatusExists(status) {
    return Object.keys(exports.statuses).includes(status);
}
/* Добавление задачи в массив */
function addTask(taskName, status = exports.statuses.TODO, priority = exports.priorities.LOW) {
    try {
        if (isTaskExists(taskName)) {
            throw new Error('Такая задача уже есть!');
        }
        if (isEmpty(taskName)) {
            throw new Error('Вы пытаетесь добавить пустую задачу!');
        }
        const task = {
            name: taskName,
            status,
            priority
        };
        exports.list.push(task);
    }
    catch (err) {
        if (err.name == 'Error') {
            console.log(err.message);
        }
    }
}
exports.addTask = addTask;
/* Удаление задачи из массива */
function removeTask(task) {
    if (!isTaskExists(task)) {
        return;
    }
    const indexTask = indexOfTask(task);
    exports.list.splice(indexTask, 1);
    return;
}
exports.removeTask = removeTask;
/* Изменение статуса задачи */
function changeStatus(task, status) {
    if (!isTaskExists(task)) {
        console.log('Задачи нет и не было');
        return;
    }
    if (!isStatusExists(status)) {
        return;
    }
    const indexTask = indexOfTask(task);
    exports.list[indexTask].status = status;
    return;
}
exports.changeStatus = changeStatus;
