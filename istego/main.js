let toDoList = ['Выполнить задание', 'Убраться', 'Бег'];

const userNotice = {
    'errorMessage': 'Введенное значение не корректно!',
    'notFound': 'Вы пытаетесь удалить не существующую задачу!',
    'wasDeleted': 'Была удалена задача:',
    'allListTasks': 'Список всех задач:',
    'addedTask': 'Добавлена задача:',
    'copyTask': 'Такая задача уже существует!'
}

// На будущее.
// let valueTask = 'Бег';

addTask('Сходить в магазин');
deleteTask('бег');
showToDoList();

// Проверка на валидность строки
function validationTask(validTask) {
    //Регулярное выражение для проверки любого количества пробелов в строке
    const containsOnlySpaces = /^\s*$/.test(validTask);

    if (typeof (validTask) !== 'string' || !validTask || validTask === ' ' || containsOnlySpaces) {
        return false;
    }
    // Удаляем пробелы в начале и конце строки, если имеются
    return validTask = validTask.trim();
}

// Поиск совпадений
function foundTask(foundTask) {
    for (const task of toDoList) {
        // Убираем чувствительность к регистру первой буквы, сравниваем на равенство.
        if (foundTask.at(0).toLowerCase() + foundTask.slice(1) === task.at(0).toLowerCase() + task.slice(1)) {
            return task;
        }
    }
}

// Добавление задачи
function addTask(addTask) {
    if (!validationTask(addTask)) {
        console.log(userNotice.errorMessage);
    } else {
        addTask = validationTask(addTask);
        if (foundTask(addTask) !== undefined) {
            console.log(userNotice.copyTask, '\n');
            return;
        }
        toDoList.unshift(addTask);
        console.log(userNotice.addedTask, addTask, '\n');
    }
}

// Удаление задачи
function deleteTask(delTask) {
    if (!validationTask(delTask)) {
        console.log(userNotice.errorMessage, '\n');
    } else if (validationTask(delTask)) {
        delTask = validationTask(delTask);
        if (foundTask(delTask) !== undefined) {
            let nameTaskInArray = foundTask(delTask);
            let index = toDoList.indexOf(nameTaskInArray);
            toDoList.splice(index, 1);
            console.log(userNotice.wasDeleted, nameTaskInArray, '\n');
            return;
        }
        console.log(userNotice.notFound, '\n');
    }
}

// Вывод всего списка задач
function showToDoList() {
    console.log(userNotice.allListTasks, '\n------------------');
    for (const task of toDoList) {
        console.log(task);
    }
}
