let toDoLits = [
    {name: "Make an app", progress: "In progress", priority: "High"},
    {name: "Drink coffee", progress: "Done", priority: "Low"},
    {name: "Find new client", progress: "In progress", priority: "High"},
    {name: "Have a breakfast", progress: "In progress", priority: "High"}
]


function addTask(name, progress, priority) {
    toDoLits.push({name, priority, progress});
}




function changeStatus (name, progress) {
    let taskIndex = toDoLits.findIndex(array => array.name == name);
    toDoLits[taskIndex].progress = progress
}



function deleteTask(name) {
    let taskIndex = toDoLits.findIndex(array => array.name == name);
    toDoLits.splice(taskIndex, taskIndex);
}

function showList() {
    let tasksInProgress = [];
    let tasksDone = [];
    for (const task of toDoLits){
        switch(task.progress) {
            case "In progress":
                tasksInProgress.push(task);
                break;
            case "Done":
                tasksDone.push(task);
                break;
        }
    }
    console.log("Tasks in progress:")
    tasksInProgress.forEach(task => {
        console.log(`\t` + task.name + ": " + task.priority);
    })
    console.log("Tasks have done:")
    tasksDone.forEach(task => {
        console.log(`\t` + task.name + ": " + task.priority);
    })
}

addTask("new task", "In progress", "Low");
console.log(toDoLits);

changeStatus("Find new client", "Done");
console.log(toDoLits);

deleteTask("new task");
console.log(toDoLits);

showList();


// changeStatus("write a post", "Done") // меняет статус задачи
// addTask('have a walk'); // добавляет новую задачу
// deleteTask('have a walk'); // удаляет задачу
// showList(); // показывает список всех задач