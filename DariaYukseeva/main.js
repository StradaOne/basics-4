const STATUSES = {
    TO_DO: 'To Do', 
    IN_PRIGRESS: 'In progress', 
    DONE: 'Done',
};

const PRIORITIES = {
    HIGH: "High",
    LOW: "Low",
};

const toDoList = [
    {name: 'create a post', status: STATUSES.IN_PRIGRESS, priority: PRIORITIES.LOW}, 
    {name: 'test', status: STATUSES.DONE, priority: PRIORITIES.HIGH}, 
];

// Создаём объект с методами проверки валидности
const validators = {
    isTaskNameValid (taskName) {
        if (!!taskName === false) {
            console.error('Имя задачи некорректно');
        }
        return !!taskName;
    },
    isStatusValid (status) {
        const isAllowdStatus = Object.values(STATUSES).includes(status);
        if (!isAllowdStatus) {
            console.error(`Ошибка добавления задачи. Недопустимый статус. Введите статус из списка: ${Object.values(STATUSES).join(', ')}`);
        } 
        return isAllowdStatus;
    },
    isPriorityValid (priority) {
        const isAllowdPriority = Object.values(PRIORITIES).includes(priority);
        if (!isAllowdPriority) {
            console.error(`Ошибка добавления задачи. Недопустимый приоритет. Введите приоритет из списка: ${Object.values(PRIORITIES).join(', ')}`);
        }    
        return isAllowdPriority;
    },
    
}

function isTaskExist(taskName) {
    const taskExistence = toDoList.find(obj => {
        return (obj['name'] === taskName)
    });
    
   return !!taskExistence;
}

const taskExistenceMessage = 'Такая задача уже существует';
const taskNonExistenceMessage = 'Такой задачи не существует';

// Находим индекс задачи:
function taskIndex(taskName) {
    const taskIndex = toDoList.findIndex(obj => 
    obj['name'] === taskName);
    return taskIndex;   
}

// Функция добавления новой задачи. Принимает в качестве аргументов текст задачи, статус, приоритет. Если статус и приоритет не выбраны, ставятся по умолчанию:
function addTask(task, status = STATUSES.TO_DO, priority = PRIORITIES.LOW) {
    if (isTaskExist(task)) {
        console.log(taskExistenceMessage);
        return;
    }
    if (!validators.isTaskNameValid(task)) {
        return;
    }
    if (!validators.isStatusValid(status)) {
        return;
    }
    if (!validators.isPriorityValid(priority)) {
        return;
    }
    const newTask = {
        'name': task, 
        'status': status, 
        'priority': priority
    };
    toDoList.push(newTask)
    console.log(`Добавлена новая задача ${newTask.name.substr(0, 20)}...`);
}

// Удаляем задачу. Сначала проверяем, что задача существует:
function deleteTask(task) {
    if (isTaskExist(task)) {
        toDoList.splice(taskIndex(task), 1)
        console.log(`Задача ${task.substr(0, 10)}... удалена`);
    }
    else {
        console.log(taskNonExistenceMessage);
    }
}

// Меняем статус задачи:
function setStatusTask(task, newStatus) {
    if (isTaskExist(task)) {
        toDoList[taskIndex(task)]['status'] = newStatus;
    }
   
    else {
        console.log(taskNonExistenceMessage);
    }
}

// Меняем приоритет задачи:
function setPriorityTask(task, newPriority) {
    if (isTaskExist(task)) {
        toDoList[taskIndex(task)]['priority'] = newPriority;
    }
    else {
        console.log(taskNonExistenceMessage);
    }
}


// Отображаем задачи с заданным статусом
function showPartList(targetStatus) {
    console.log(`\n${targetStatus}:`);
    // Фильтруем туду лист по статусу. Если задач с таким статусом нет в листе, выводим "-"
    const filteredList = toDoList.filter(obj => obj.status === targetStatus);
    if (filteredList.length === 0) {
        console.log(`\t-`);
    }
    // Задачи отсортированы по приоритету (сначала high)
    const sortList = filteredList.sort((a) => {
        if (a.priority === PRIORITIES.HIGH) {
            return -1;
        }
        if (a.priority === PRIORITIES.LOW) {
            return 1;
        }
    });
    // Выводим тест задачи и приоритет в консоль
    sortList.forEach(task => console.log(`\t${task.name}\t${task.priority}`));
}

// Фильтруем и сортируем по каждому статусу
function filterAndSortByEachStatus() {
    showPartList(STATUSES.TO_DO);
    showPartList(STATUSES.IN_PRIGRESS);
    showPartList(STATUSES.DONE);

}



addTask('complete the task in strada', STATUSES.IN_PRIGRESS);

addTask('sleep', STATUSES.TO_DO);
addTask('teach a yoga class', STATUSES.DONE, 'fkjgojd');
addTask('english lessons', STATUSES.DONE);
addTask('', 'Done');
deleteTask('test');
setStatusTask('create a post', STATUSES.DONE);
setStatusTask('english lessons', STATUSES.DONE);
setStatusTask('complete the task in strada', STATUSES.DONE);
setPriorityTask('english lessons', PRIORITIES.HIGH);
setPriorityTask('teach a yoga class', PRIORITIES.HIGH);
setPriorityTask('complete the task in strada', PRIORITIES.HIGH);

filterAndSortByEachStatus();


