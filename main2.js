// Сам туду лист
const list = [
    { name: 'make a video', status: 'in progress', priority: 'high' },
    { name: 'wash the dishes', status: 'todo', priority: 'low' },
];

// Значения для статусов/приоритетов задач
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

// Все что выводится (ошибки, оповещения)
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

// Функция, которая проверяет валидность введенных данных.
// Возвращает true, если одно из значений неверно, потому что в следующей функции это пригодится
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

// Функция, которая проверяет функцию checkArgs, 
// если false, то в функции addTask идем дальше, 
// если в одном из условий true, то выводим сообщение и выходим из функции
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

// Функция для добавления задачи
function addTask(nameTask, statusTask, priorityTask) {
    // Проверка, которую описал выше
    if (checkAddedTask(nameTask, statusTask, priorityTask)) return;

    // Добавление в массив list элементов
    list.push({
        name: nameTask,
        status: statusTask,
        priority: priorityTask,
    });

    // Возвращаем сообщение и выходим из функции
    return console.log(`${messages.alerts.taskAdded} "${nameTask}"!`);
};

// Функция для удаления задачи
function deleteTask(nameTask) {
    // Находим индекс элемента, который хотим удалить
    const taskIndex = list.findIndex(item => item.name === nameTask);

    // Проверка - если индекс -1 (элемент не найден),
    // Тогда выводим сообщение и выходим из функции
    if (taskIndex === -1) {
        console.log(messages.errors.wrongName);
        return;
    };
    // Если же элемент найден, 
    // то из массива list удаляем 1 элемент с индексом taskIndex
    list.splice(taskIndex, 1);

    // Выводим сообщение и выходим из функции
    console.log(`${messages.alerts.taskDeleted} "${nameTask}"!`);
};

// Функция для изменения статуса задачи
function changeStatus(nameTask, statusTask) {
    // Находим индекс элемента
    const taskIndex = list.findIndex(item => item.name === nameTask);
    // Проверка - если индекс -1 (элемент не найден),
    // Тогда выводим сообщение и выходим из функции
    if (taskIndex === -1) {
        console.log(messages.errors.wrongName);
        return;
    };
    // Проверка на валидность введенных данных
    if (statusTask.toUpperCase() !== values.statuses.todo
        && statusTask.toUpperCase() !== values.statuses.inProgress
        && statusTask.toUpperCase() !== values.statuses.done) {
        console.log(messages.errors.wrongStatus);
        return;
    };

    // В элементе по индексу taskIndex массива list 
    // Изменяем свойство status на введенное в аргументе функции
    list[taskIndex].status = statusTask;

    // Выводим сообщение и выходим из функции
    console.log(`${messages.alerts.taskStatusChanged} "${statusTask}"`);
};

// Функция, которая меняет приоритет задачи
// Делает все то же самое, что и функция по смене статуса, но меняет приоритет
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

// Функция, которая принимает приоритет, для того, что бы потом вывести задачи по приоритетам
function showPriority(priority) {
    // Создаем строку tasks, потом будем ее выводить
    let tasks = ``;
    // Пробегаемся по массиву list, если свойство priority у элемента item (item.priority)
    // равно приоритету, переданному функции в аргументе, тогда
    // выводим имя и статус этого элемента под приоритетом, заданным в аргументе функции
    list.forEach(item => {
        if (item.priority === priority) {
            tasks += `${priority}:\n\t${item.name}: ${item.status}`;
            console.log(tasks);
            return;
        };
    });
    // Если нет задач с таким приоритетом (tasks пустой), тогда под приоритетом выводим "-"
    if (!tasks) {
        tasks += `${priority}:\n\t-`;
        console.log(tasks);
        return;
    }
}
// Вызываем функцию showPriority со всеми приоритетами
function showList() {
    showPriority('high');
    showPriority('mid');
    showPriority('low');
};
// Готово!, дальше тесты
// Верные тесты
addTask('aboba', 'todo', 'low');
changeStatus('aboba', 'todo');
changePriority('aboba', 'mid');
showList()
deleteTask('asf');
// Неверные тесты
addTask('abosba', 'tokdo', 'low');
changeStatus('aboba', 'todfo');
changePriority('abobaa', 'mfid');
showList()
deleteTask('aboba');
showList()