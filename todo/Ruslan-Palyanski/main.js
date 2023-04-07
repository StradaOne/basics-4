
const ERROR_MESSAGE = {
    thereIsTask: 'There is the task',
    thereIsNotTask: 'There is not the task',
}

const statusTask = {
    inProgress: 'In progress',
    done: 'Done',
    toDo: 'To Do',
};

const priorityTask = {
    low: 'low',
    medium: 'medium',
    high: 'high',
}

let list = [ 
	{name: 'create a post', status: statusTask.inProgress, priority: priorityTask.low},
    {name: 'test', status: statusTask.done, priority: priorityTask.high},
    {name: 'write a post', status: statusTask.toDo, priority: priorityTask.medium},
    {name: 'make a bed', status: statusTask.done, priority: priorityTask.low}
];

function changeStatus(name, status){
    const task = list.find(task => task.name === name);
    if(task){
        task.status = status;
    } else{
        console.log(ERROR_MESSAGE.thereIsTask);
    }
}

function addTask(name, status = statusTask.toDo, priority = priorityTask.low){
    const task = list.find(task => task.name === name);
    if(task){
        console.log(ERROR_MESSAGE.thereIsTask)
    } else{
        list.push({name, status, priority})
    }
}

function deleteTask(name){
    const task = list.find(task => task.name === name);
    if(task){
        list = list.filter(task => task.name !== name)
    } else{
        console.log(ERROR_MESSAGE.thereIsNotTask)
    }
}

const toDo = `To do: \n create a new practice task \n make a bed`;

function showList(){
    let toDo = ``;
    let inProgress = ``;
    let done = ``;
    list.forEach(task => {
        if(task.status === statusTask.toDo){
            toDo += ` \n\t ${task.name}`;
        }
        if(task.status === statusTask.inProgress){
            inProgress += ` \n\t ${task.name}`;
        }
        if(task.status === statusTask.done){
            done += ` \n\t ${task.name}`;
        }
    })
    if(toDo === ''){
        console.log(`To do: \n\t -`)
    } else {
        console.log(`To do: ${toDo}`)
    }
    if(inProgress === ''){
        console.log(`In progress: \n\t -`)
    } else {
        console.log(`In progress: ${inProgress}`)
    }
    if(done === ''){
        console.log(`Done: \n\t -`)
    } else {
        console.log(`Done: ${done}`)
    }
}

changeStatus("write a post", "Done") // меняет статус задачи
addTask('have a walk'); // добавляет новую задачу
// addTask('write the text'); // добавляет новую задачу
deleteTask('have a walk'); // удаляет задачу
showList(); // показывает список всех задач