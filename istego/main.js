const list = {
    "test": 'To Do'
}

// Статусы задач

//Статус в константах хорошо, можно статусы загнать в один объект
const statusDone = "Done";
const statusInProgress = "In Progress";
const statusToDo = 'To Do';

// Имя задачи
let nameTask = undefined;

// Выбор действий
// let select = null;

// Вопрос, если список пуст
let question = null;

// Запуск программы
// Вцелом интересный подход, видно что посвящено много вермени продумыванию UI и его реализации, 
// но не совсем по ТЗ, а так интересное решение, буд-то был опыт раньше с какими-то ЯП типа VisualBasic
// использование alert и prompt завязывает нас под браузер
// но самое главное я не смог выйти
startProgramm();

//Старт программы
function startProgramm() {
    if (isEmpty(list)) {
        question = confirm('Список дел пока пуст! Хотите добавить задачу?');
        if (question) {
            addTask();
        }
    } else {
        console.clear();
        showListTasks();
        question = prompt('Если хотите добавить новую задачу введите 1, удалить задачу 2, изменить статус 3');
        if (+question === 1) {
            addTask();
            return;
        }
        if (+question === 2) {
            deleteTask();
            return;
        }
        if (+question === 3) {
            changesStatus();
            return;
        } else if (question === NaN) {
            alert('Вы вели не корректное значение, введите предложенные цифры');
            startProgramm();
        } else if (question === '') {
            alert('Вы ничего не ввели!');
            startProgramm();
        } else if (typeof (question) === 'string') {
            alert('Нужно вводить цифры');
            startProgramm();
        } else if (question === null) {
            alert('Вы отменили программу!');
        }
    }
}

// Проверка на пустоту
function isEmpty(obj) {
    for (let key in obj) {
        return false;
    }
    return true;
}

// Вывод списка задач
function showListTasks() {
    for (let task in list) {
        console.log(task + ": " + list[task]);
    }
}

// Добавление задачи
function addTask() {
    while (nameTask !== null) {
        nameTask = prompt('Введите имя задачи. Для выхода введите "назад"');
        if (nameTask === undefined || nameTask === "") {
            alert('Вы ничего не ввели!');
            continue;
        } else if (nameTask in list) {
            alert('Такая задача уже есть, введите другую!');
            continue;
        } else if (nameTask === 'назад') {
            startProgramm();
            break;
        } else if (nameTask === null) {
            alert('Вы отменили программу!');
            break;
        }
        list[nameTask] = statusToDo;

        console.clear();
        showListTasks();
    }
}

//Удаление задачи
function deleteTask() {
    if (isEmpty(list)) {
        alert('Вы удалили все задачи!');
        startProgramm();
        return;
    }
    nameTask = prompt('Какую задачу хотите удалить? Введите ее название');
    if (nameTask in list) {
        delete list[nameTask];
        console.clear();
        showListTasks();
        deleteTask();
    } else if (nameTask === null) {
        alert('Вы вышли из программы!');
    } else if (nameTask === '') {
        alert('Вы ничего не ввели!');
        deleteTask();
    } else {
        alert('Такой задачи нет в списке!');
        deleteTask();
    }
}

// Изменение статуса
function changesStatus() {
    nameTask = prompt('Статус какой задачи хотите изменить?');
    let newStatus;
    if (nameTask in list) {
        newStatus = prompt(`Выберите статус, указав соответствующую цифру: 1 - ${statusToDo}; 2 - ${statusInProgress}; 3 - ${statusDone}`);
        if (newStatus === '') {
            alert('Вы ничего не ввели!')
            changesStatus();
        }
        else if (newStatus === null) {
            alert('Вы вышли из программы!');
            return;
        }
        else if (+newStatus === 1) {
            list[nameTask] = statusToDo;
            console.clear();
            showListTasks();
            changesStatus();
        }
        else if (+newStatus === 2) {
            list[nameTask] = statusInProgress;
            console.clear();
            showListTasks();
            changesStatus();
        }
        else if (+newStatus === 3) {
            list[nameTask] = statusDone;
            console.clear();
            showListTasks();
            changesStatus();
        }
    }
    else if (nameTask === '') {
        alert('Вы ничего не ввели!')
        changesStatus();
    }
    else if (nameTask === null) {
        alert('Вы вышли из программы!');
        return;
    }
    else {
        alert('Такой задачи нет');
        changesStatus();
    }
}
