// список задач
const toDo = {
    'make a bed' : 'done',
    'bake pancakes' : 'done',
    'go out for groceries' : 'in progress',
    'buy contacts' : 'to do',
    'make a brief for work' : 'in progress',
    'walk a dog' : 'to do',
    'feed a cat' : 'to do',
    'ride a whale' : 'to do',
};
// метод выводящий ошибку
function error(){
    console.log('AN ERROR OCURED!\n');
}
// метод для проверки одного из статусов на наличие в нем задач
function emptyCheck(status){
    let i = 0;
    for (task in toDo){
        if (toDo[task] === status) {i++}
    }
    if (i===0) {
        return true;
    } else {return false};
};
// метод для добавления задачи
function addTask(thetask, status){
    // проверка статуса задачи на корректность
    if (status==='to do' || status==='done' || status==='in progress') {
        toDo[thetask] = status;
        console.log('task added! ( ' + thetask + ' -> ' + status + ' )\n');
    } else {
        error();
    };
};
// метод для удаления задачи
function delTask(thetask){
    for (task in toDo) {
        // проверка наличия такой задачи
        if (task === thetask) {
            delete toDo[thetask];
            console.log('task deleted! ( ' + thetask + ' )\n');
            return;
        } else {continue};
    }
    error();
};
// метод для смены статуса задачи
function changeStatus(thetask, status) {
    // проверка наличия такой задачи
    if (thetask in toDo){
        // проверка статуса задачи на корректность
        if (status==='to do' || status==='done' || status==='in progress') {
            toDo[thetask] = status;
            console.log('status changed! ( ' + thetask + ' -> ' + status + ' )\n');
        } else {
            error();
        };
    } else {error()};
}
// метод для вывода в консоль списка задач с одним статусом
function showTaskWithStatus(status) {
    console.log(status + ' :');
    if (emptyCheck(status)){
        console.log('                ' + 'nothing in here!');
    } else {
        for (task in toDo){
            if (toDo[task] === status) {
                console.log('                ' + task);
            };
        };
    };
    console.log('');
};
// метод для вывода всего списка
function showList(){
    showTaskWithStatus('to do');
    showTaskWithStatus('in progress');
    showTaskWithStatus('done');
};

showList(); // изначальный список
changeStatus('walk a dog', 'in progress'); // меняем статус задачи
changeStatus('walk dog', 'in progress'); // меняем статус задачи с ошибкой в задаче
changeStatus('walk a dog', 'inprogress'); // меняем статус задачи с ошибкой в статусе
addTask('pay for delivery', 'in progress'); // добавляем задачу
addTask('pay for delivery', 'in progres'); // добавляем задачу с ошибкой
delTask('make a bed'); // удаляем задачу
delTask('bake pancakes'); // удаляем задачу
delTask('walk a dog'); // удаляем задачу
delTask('walk dog'); // удаляем задачу с ошибкой
showList(); // измененный список
