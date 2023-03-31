const list = {
	"Сделать зарядку": "In Progress", 
	"Умыться": "Done",
	"Сделать завтрак": "To Do",
}

function changeStatus(item, status) {
    if (!(item in list)) {
        console.log(`Ошибка в changeStatus ${item}: Нет такой задачи`);
    } else {
        list[item] = status;
    }
}

function deleteTask(item) {
    if (!(item in list)) {
        console.log(`Ошибка в deleteTask ${item}: Нет такой задачи`);
    } else {
        delete list[item];
    }
}

function addTask(item) {
    if (item in list) {
        console.log(`Ошибка в addTask ${item}: Такая задача уже есть`);
    } else {
        list[item] = "To Do"
    }
}

function showList() {
    let checkToDo = false;
    let checkInProg = false;
    let checkDone = false;
    console.log('To Do');
    for(const item in list) {
        if (list[item] == 'To Do') {
            console.log(`\t${item}`);
            checkToDo = true;
        }
    }
    if (!checkToDo) {
        console.log('\t-')
    }

    console.log('In Progress');
    for(const item in list) {
        if (list[item] == 'In Progress') {
            console.log(`\t${item}`);
            checkInProg = true;
        }
    }
    if (!checkInProg) {
        console.log('\t-')
    }

    console.log('Done');
    for(const item in list) {
        if (list[item] == 'Done') {
            console.log(`\t${item}`);
            checkDone = true;
        }
    } 
    if (!checkDone) {
        console.log('\t-')
    }
}

addTask('Покушать');
addTask('Покормить кошку');
changeStatus('Покушать', 'In Progress');
changeStatus('Сделать зарядку', 'Done');
changeStatus('Покормить кошку', 'In progress');
deleteTask('Сделать завтрак');

showList();

