const ToDo = [
    {name: 'create a post', status: 'In progress', priority: 'low'}, 
    {name: 'sleep', status: 'Done', priority: 'high'},
];

const Status = {
    Done: "Done",
    InProgress: "In progress",
	Todo: "To Do",
};

function addObject(a,b,c){ToDo.push({name: a, status: b, priority: c})};
function delObject(index,count){ToDo.splice(index,count)};
function changeObject(index,a,b,c){ToDo.splice(index,1,{name: a, status: b, priority: c})}

addObject('run','To Do','low') // добавляет объект и присваивает name,status,priority
addObject('to the rocking chair','Done','low')
addObject('play dota 2','In progress','high')
delObject(0,1) // удаляет объект, параметрами указывается index с которого удаляются элементы и count(количество) удаляемых объектов
changeObject(0,'lessons', 'Done', 'high') // заменяет объект, параметрами указывается index, который удаляем, a,b,c - значения слева направо

function showList(){
    console.log(`To Do:`);
    for (target in ToDo) {
        if (Status.Todo == ToDo[target].status) {console.log('  '+ ToDo[target].name)}}

    console.log(`Done:`);
    for (target in ToDo) {
        if (Status.Done == ToDo[target].status) {console.log('  '+ ToDo[target].name)}}

    console.log(`In progress:`);
    for (target in ToDo) {
        if (Status.InProgress == ToDo[target].status) {console.log('  '+ ToDo[target].name)}}

}
    
showList() //   To Do:
//                run
//              Done:
//                lessons
//                to the rocking chair
//              In progress:
//                play dota 2


// --- Для себя ---

// const statusToDo = ToDo.filter(obj => obj.status == 'To Do'); // проверка статуса To Do
// const statusDone = ToDo.filter(obj => obj.status == 'Done'); // проверка статуса Done
// const statusInProgress = ToDo.filter(obj => obj.status == 'In progress'); // проверка статуса In Progress
