const list = [ 
    {name: 'create a post', status: 'Progress', priority: 'low'}, 
    {name: 'test', status: 'Done', priority: 'high'},
    {name: 'create a new practice task', status: 'Progress', priority: 'high'}, 
    {name: 'make a bed', status: 'Done', priority: 'low'}, 
    {name: 'write a post', status: 'To Do', priority: 'low'}
];

//Меняем задачу и статусы
function changeStatus(name, status, priority) {
    list.forEach((element)=>{
        if (element.name === name){
            element.status = status;
            element.priority = priority; 
        }
        
    })
}

//Добавляем задачу
function addTask(name, status,priority){
    const task = {name, status, priority};
    list.push(task);
}

//Удаляем задачу
function deleteTask(name){ 
    const deleteTask = list.findIndex(task => task.name === name);
    if (deleteTask !== -1) {
        list.splice(deleteTask, 1);
    }
};

//Сортировка
function showList() {
    let hasProgress = false;
    console.log('Progress: ')
    for(let i = 0; i < list.length; i++) {
        if(list[i].status === 'Progress'){
            console.log(`\t${list[i].name} : ${list[i].priority}`);
            hasProgress = true;
        } 

    }

    if (!hasProgress){
        console.log(`\t-`)
    }

    let hasDone = false;
    console.log('Done: ')
    for(let i = 0; i < list.length; i++) {
        if(list[i].status === 'Done'){
            console.log(`\t${list[i].name} : ${list[i].priority}`);
            hasDone = true;
        }
    }

    if (!hasDone){
        console.log(`\t-`)
    }

    let hasTodo = false;
    console.log('To Do: ')
    for(let i = 0; i < list.length; i++) {
        if(list[i].status === 'To Do'){
            console.log(`\t${list[i].name} : ${list[i].priority}`)
            hasTodo = true; 
        }

    }
    if (!hasTodo){
        console.log(`\t-`)
    }

}

///,,,///
changeStatus('Plane ticket', 'ToDo', 'medium');
addTask('Plane ticket', 'Done', 'medium');
deleteTask('test');
showList();