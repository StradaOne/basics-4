const PRIORITY = ['low', 'medium', 'high'];
const STATUS = ['ToDo', 'In progress', 'Done'];

const list = [
    {name: 'create a post', status: STATUS[0], priority: PRIORITY[0]}, 
    {name: 'test', status: STATUS[2], priority: PRIORITY[2]},
];

function changingValInObjList(key1, key2, num) {
    for (let i in list) {
        for (let k in list[i]){
            if (list[i][k] == key1) list[i][key2] = num;
        }
    }
}


function changeStatus(name, numStatus) {
    if (!name.trim()) return console.log(' Не задан name')
    if (+numStatus > 2 || +numStatus < 0) { 
        return console.log('Задайте правельный статус цифрой \n ToDo: 0 \n In progress: 1 \n Done: 2');
    }
    numStatus = STATUS[+numStatus];

    changingValInObjList(name, "status", numStatus);
    
}

function changePriority(name, numPriority) {
    if (!name.trim()) return console.log(' Не задан name')
    if (+numPriority > 2 || +numPriority < 0) { 
        return console.log('Задайте правельный приоритет цифрой \n low: 0 \n medium: 1 \n high: 2');
    }
    numPriority =  PRIORITY[+numPriority];

    changingValInObjList(name, "priority", numPriority);
}

function deleteTask(name) {
    let indexName = list.findIndex( task => task.name === name);
    list.splice(indexName, 1);
    
}

function addTask(name) {
    let task = {name: name, status: STATUS[0], priority: PRIORITY[0] }
    list.push(task);
}

function outputForShowlist(num) {
    let score = false;
    for (let i in list) {
        for (let k in list[i]){
            if (list[i][k] == STATUS[num] ) {
                console.log('\t' + list[i].name + ': ' + list[i].priority)
                score = true;
            }
        }
    }
    if(!score) console.log('\t-')
}

function showList() {
    console.log('ToDo:')
    outputForShowlist(0);

    console.log('In progress:')
    outputForShowlist(1);

    console.log('Done:')
    outputForShowlist(2);
}

showList()
