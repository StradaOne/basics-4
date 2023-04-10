let toDoList = [
    { nameTask: 'Убраться в комнате', statusTask: 'В процессе', priorityTask: 'Низкий' },
    { nameTask: 'Сделать уроки', statusTask: 'Нужно выполнить', priorityTask: 'Низкий' },
    { nameTask: 'Сходить в магазин', statusTask: 'Выполнено', priorityTask: 'Низкий' },
];

const listStatusTask = {
    toDo: 'Нужно выполнить',
    inProgress: 'В процессе',
    done: 'Выполнено'
}

const ListPriorityTask = {
    low: 'Низкий',
    middle: 'Средний',
    hight: 'Высокий',

}

const userNotice = {
    'errorMessage': 'Введенное значение не корректно!',
    'notFound': 'Вы пытаетесь удалить не существующую задачу!',
    'wasDeleted': 'Вы удалили задачу:',
    'allListTasks': 'Список всех задач:',
    'addedTask': 'Вы добавили задачу:',
    'copyTask': 'Такая задача уже существует!',
    'copyTaskStatus': 'Вы пытаетесь изменить статус не существующей задачи!',
    'editTaskStatus': 'Вы изменили статус у задачи:',
    'editPriorityStatus': 'Вы изменили приоритет у задачи:',
    'editNameTask': 'Вы изменили название задачи:'
}

// / На будущее.
// let valueTask = null;
// let valueStatusTask = null;
// let valuePriorityTask = null;

addTask('Оплатить учебу', undefined, ListPriorityTask.hight);
deleteTask('Сходить в магазин');
editStatusTask('Сделать уроки', listStatusTask.done);
editStatusPriority('Сделать уроки', ListPriorityTask.hight);
showToDoList();
editNameTask('Сделать уроки', 'Сходить на каток');
showToDoList();

// Проверка на валидность строки
function validationTask(validTask) {
    //Регулярное выражение для пробелов любого количества в строке
    const containsOnlySpaces = /^\s*$/.test(validTask);

    if (typeof (validTask) !== 'string' || !validTask || validTask === ' ' || containsOnlySpaces) {
        return false;
    }
    // Удаляем пробелы в начале и конце строки, если имеются
    return validTask = validTask.trim();
}

// Поиск совпадений
function foundTask(foundTask) {
    // Убираем чувствительность к регистру первой буквы, проверяем на совпадение.
    for (let i = 0; i < toDoList.length; i++) {
        if (foundTask.at(0).toLowerCase() + foundTask.slice(1) === toDoList[i].nameTask.at(0).toLowerCase() + toDoList[i].nameTask.slice(1)) {
            const foundedTask = toDoList[i];
            return foundedTask;
        }
    }
}

// Добавление задачи
function addTask(addTask, addStatus = listStatusTask.toDo, addPriority = ListPriorityTask.low) {
    if (!validationTask(addTask)) {
        console.log(userNotice.errorMessage);
    } else {
        // Получили и записали валидное значение
        addTask = validationTask(addTask);
        if (foundTask(addTask) !== undefined) {
            console.log(userNotice.copyTask, '\n');
            return;
        }
        addTask = { nameTask: String(addTask), statusTask: addStatus, priorityTask: addPriority }
        toDoList.unshift(addTask);
        console.log(userNotice.addedTask);
        console.log(
            `-----------------
||${addTask.nameTask}||
Статус:
    -${addTask.statusTask}-
Приоритет:
    -${addTask.priorityTask}- \n`);

    }
}

// Удаление задачи
function deleteTask(delTask) {
    if (!validationTask(delTask)) {
        console.log(userNotice.errorMessage, '\n');
    } else if (validationTask(delTask)) {
        // Получили и записали валидное значение
        delTask = validationTask(delTask);
        if (foundTask(delTask) !== undefined) {
            let nameTaskInArray = foundTask(delTask);
            let index = toDoList.indexOf(nameTaskInArray);
            console.log(userNotice.wasDeleted, toDoList[index].nameTask, '\n');
            toDoList.splice(index, 1);
            return;
        }
        console.log(userNotice.notFound, '\n');
    }
}

//Изменение статуса
function editStatusTask(nameTask, newStatus) {
    if (!validationTask(nameTask)) {
        console.log(userNotice.errorMessage);
    } else {
        // Получили и записали валидное значение
        nameTask = validationTask(nameTask);
        if (foundTask(nameTask) !== undefined) {
            let objTask = foundTask(nameTask);
            objTask.statusTask = newStatus;
            console.log(userNotice.editTaskStatus, objTask.nameTask, '\n');
            return;
        }
    }
    console.log(userNotice.copyTaskStatus, '\n');
}

//Изменение приоритета
function editStatusPriority(nameTask, newPriority) {
    if (!validationTask(nameTask)) {
        console.log(userNotice.errorMessage);
    } else {
        // Получили и записали валидное значение
        nameTask = validationTask(nameTask);
        if (foundTask(nameTask) !== undefined) {
            let objTask = foundTask(nameTask);
            objTask.priorityTask = newPriority;
            console.log(userNotice.editPriorityStatus, objTask.nameTask, '\n');
            return;
        }
    }
    console.log(userNotice.copyTaskStatus, '\n');
}

//Изменение названия задачи
function editNameTask(nameTask, newNameTask) {
    if (!validationTask(nameTask)) {
        console.log(userNotice.errorMessage);
    } else {
        // Получили и записали валидное значение
        nameTask = validationTask(nameTask);
        if (foundTask(nameTask) !== undefined) {
            let objTask = foundTask(nameTask);
            console.log(userNotice.editNameTask, objTask.nameTask, '\n');
            objTask.nameTask = newNameTask;
            return;
        }
    }
    console.log(userNotice.copyTaskStatus, '\n');
}

// Вывод всего списка задач
function showToDoList() {
    console.log(userNotice.allListTasks);

    toDoList.forEach(task => {
        console.log(
            `--------------------------
||${task.nameTask}||
Статус:
    -${task.statusTask}-
Приоритет:
    -${task.priorityTask}-`);
    })
}