const toDoList = [
    {name: 'create a post', status: 'In progress', priority: 'low'}, 
  {name: 'test', status: 'Done', priority: 'high'} 
];
const statuses = ['To Do', 'In progress', 'Done'];
const priorities = ['high', 'low'];

const taskExistenceMessage = 'Такая задача уже существует';
const taskNonExistenceMessage = 'Такой задачи не существует';
const defaultStatus = statuses[0];
const defaultPriority = priorities[1];

// Проверяем, есть ли введённая задача в листе:
function isTaskExist(taskContent) {
    const taskExistence = toDoList.find(obj => {
        return (obj['name'] === taskContent)
    })
   return taskExistence;
}

// Находим индекс задачи:
function taskIndex(taskContent) {
    const taskIndex = toDoList.findIndex(obj => 
    obj['name'] === taskContent);
    return taskIndex;   
}

// Функция добавления новой задачи. Принимает в качестве аргументов текст задачи, статус, приоритет. Если статус и приоритет не выбраны, ставятся по умолчанию:
function addTask(task, status = defaultStatus, priority = defaultPriority) {
    if (isTaskExist(task)) {
        console.log(taskExistenceMessage);
    }
    else {
        const newObject = {
            'name': task, 
            'status': status, 
            'priority': priority};
        toDoList.push(newObject)
    }
}

// Удаляем задачу. Сначала проверяем, что задача существует:
function deleteTask(task) {
    if (isTaskExist(task)) {
        toDoList.splice(taskIndex(task), 1)
    }
    else {
        console.log(taskNonExistenceMessage);
    }
}

// Меняем статус задачи:
function changeStatusTask(task, newStatus) {
    if (isTaskExist(task)) {
        toDoList[taskIndex(task)]['status'] = newStatus;
    }
   
    else {
        console.log(taskNonExistenceMessage);
    }
}

// Меняем приоритет задачи:
function changePriorityTask(task, newPriority) {
    if (isTaskExist(task)) {
        toDoList[taskIndex(task)]['priority'] = newPriority;
    }
    else {
        console.log(taskNonExistenceMessage);
    }
}

// Фильтруем по статусу:
function statusSort(status) {
    const sortedByStatus = toDoList.filter(obj => obj.status === status);
    
    return sortedByStatus;
}

// Фильтруем по приоритету:
function prioritySort(arr, priority) {
    const sortedByPriority = arr.filter(obj => obj.priority === priority);
   
    return sortedByPriority;
}

// Выводим туду лист в консоль:
function showToDoList() {
    // Перебираем по статусу:
    for (st of statuses) {
        console.log(`\n${st}:`);
        // Если массив отсортированных по статусу задач не пустой, то перебираем отфильтрованные объекты этого массива для вывода в консоль:
        if (statusSort(st).length !== 0) {
            
            // statusSort(st).sort((a, b) => a.priority - b.priority);
           
            for (obj of  prioritySort(statusSort(st), 'high')) {
                console.log(obj.name + '\t' + obj.priority);
 
            }
            for (obj of  prioritySort(statusSort(st), 'low')) {
                console.log(obj.name + '\t' + obj.priority);
 
            }
        }
        else if (statusSort(st).length === 0) {
            console.log('-');
        }
        
    }
    
}



addTask('complete the task in strada', 'In progress');

addTask('sleep', 'To Do');
addTask('teach a yoga class', 'To Do');
addTask('english lessons', 'Done');
deleteTask('test');
changeStatusTask('create a post', statuses[2]);
changeStatusTask('english lessons', statuses[2]);
changeStatusTask('complete the task in strada', statuses[2]);
changePriorityTask('english lessons', priorities[0]);
changePriorityTask('teach a yoga class', priorities[0]);
changePriorityTask('complete the task in strada', priorities[0]);


console.log(showToDoList());


