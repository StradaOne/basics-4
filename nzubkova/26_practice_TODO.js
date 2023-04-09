//Вам нужно реализовать список с задачами и четыре возможных действия с элементами этого списка:
// чтение, добавление, изменение, удаление. 


//делаем статусы константами

const STATUS = {
    TO_DO: 'To do',
    DONE: 'Done',
    IN_PROGRESS: 'In progress',
    BACKLOG: 'In the backlog'
};

//делаем приоритет константами

const PRIORITY = {
    CRITICAL: 'ASAP',
    HIGH: 'High',
    MEDIUM: 'Medium',
    LOW: 'Low',
};

//делаем сообщения константами - конфирмейшены и ерроры

const MESSAGE = {
    IS_DUPLICATE: 'This task already exists!',
    NOT_EXIST: 'The task you are trying to edit/delete does not exist.',
    SUCCESS: 'Your task has been added.',
    DELETED: 'Your task has been successfully deleted.',
    EDITED: 'Your task has been edited.'
};

//записываем задачи в виде массива объектов  
let toDoList = [ 
	{name: 'create an algorythm', status: STATUS.DONE, priority:PRIORITY.HIGH}, 
    {name: 'refactor the code', status: STATUS.IN_PROGRESS, priority:PRIORITY.LOW},
    {name: 'make a pull request', status: STATUS.BACKLOG, priority:PRIORITY.MEDIUM},
    {name: 'pay for the Internet ', status: STATUS.TO_DO, priority:PRIORITY.CRITICAL} 
];

//добавить задачу (повысить приоритет)
function addTask(name, status = STATUS.TO_DO, priority = PRIORITY.MEDIUM){
    const task = toDoList.find(task => task.name === name);
    if(task){
        console.log(MESSAGE.IS_DUPLICATE)
    } else{
        toDoList.push({name, status, priority})
        console.log(MESSAGE.SUCCESS)
    }
}

addTask('test task', 'In progress', 'Low'); //добавляет задачу
addTask('create an algorythm'); //ругается на дубликат

//отредактировать задачу

function changePriority(name, priority){
    const task = toDoList.find(task => task.name === name);
    if(task){
        task.priority = priority;
        console.log(MESSAGE.EDITED)
    } else{
        console.log(MESSAGE.NOT_EXIST);
    }
}

changePriority('create an algorythm', 'CRITICAL'); //изменяет приориет
changePriority('пппепепеапа'); //ругается на не существующую задачу

//удалить задачу

function deleteTask(name){
    const task = toDoList.find(task => task.name === name);
    if(task){
        toDoList = toDoList.filter(task => task.name !== name)
        console.log(MESSAGE.DELETED)

    } else{
        console.log(MESSAGE.NOT_EXIST)
    }
}

deleteTask('create an algorythm'); //удаляет задачу
deleteTask('дплдполполп'); //ругается на не существующую задачу

// чтение всего списка

function showAllTasks(){
    for (const task of toDoList) {
        console.log(task);
      }  
}

showAllTasks();