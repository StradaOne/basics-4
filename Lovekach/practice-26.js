const statuses = {
    IN_PROGRESS: 'In progress',
    DONE: 'Done',
}
const priorites = {
    LOW: 'low',
    HIGH: 'high',
}


const list = [
    { name: 'create a post', status: statuses.IN_PROGRESS, priority: priorites.LOW },
    { name: 'make a bed', status: statuses.IN_PROGRESS, priority: priorites.HIGH },
    { name: 'test', status: statuses.DONE, priority: 'high' },
];

function addObjectInArray(name, status, priority) {
    list.push({ name, status, priority });
}

function deleteObjectInArray(task) {
    const findName = list.findIndex(key => key.name === task);
    list.splice(findName,1);
    
}

function changeObjectInArray(task, status) {
    const changeObj = list.findIndex(key => key.name === task);
    list[changeObj].status = status;
}

function showObjectInArray() {
    list.forEach(list => {
        console.log(`name: ${list.name}, status: ${list.status}, priority: ${list.priority}`);
    })
}

addObjectInArray('go to the gym', statuses.IN_PROGRESS, 'high');
console.log(list);
addObjectInArray('go to the park', statuses.DONE, 'low');
console.log(list);

deleteObjectInArray('test');
console.log(list);
deleteObjectInArray('create a post');
console.log(list);


changeObjectInArray('create a post', statuses.DONE);
console.log(list);
changeObjectInArray('make a bed', statuses.DONE);
console.log(list);

showObjectInArray();



