let toDoList = ['сделать задание с массивами'];

function addTask(task) {
    toDoList.push(task); 
}

function deleteTask(task) {
    let deletedTask = toDoList.splice(toDoList.indexOf(task), 1);
    console.log(`Задача "${deletedTask}" удалена \n`);
}

function showToDoList() {
    for (const task of toDoList) {
        console.log(task);
    }
    console.log('\n');
}

addTask('составить план тренировки');
addTask('провести тренировку');
addTask('позаниматься английским');
addTask('поcмотреть фильм');
showToDoList();

deleteTask('поcмотреть фильм')
showToDoList();
