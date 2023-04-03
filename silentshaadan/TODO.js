// глобальный флаг точно не нужен, 
// вывод не работает

let flag = 0;
const statusList = {
    "Todo": "To Do",
    "In Progress": "In Progress",
    "Done": "Done"
};
const toDo = {
    list: {
        "create a new practice task": "In Progress",
        "make a bed": "Done",
        "write a post": "To Do",
    },
    changeStatus(nameTDL, statusTDL) {
        nameTDL in this.list ? this.list[nameTDL] = statusTDL : false;
    },
    addTask(nameTDL) {
        this.list[nameTDL] = statusList["Todo"];
    },
    deleteTask(nameTDL) {
        delete this.list[nameTDL];
    },
    showList() {
        for (let keySL in statusList) {
                console.log(`${keySL}:`);
            for (let keyTDL in this.list) {
                toDo.list[keyTDL] === statusList[keySL] ? showKeyIncFlag(keyTDL) : false;
            }
            showEmptyStatusZeroFlag()
        }
    }
};
function showKeyIncFlag(keyTDL) {
    console.log(`\t"${keyTDL}"`);
    ++flag; 
};
function showEmptyStatusZeroFlag() {
    flag === 0 ? console.log(`\t-`) : false;
    flag = 0;
};
toDo.showList(); // показывает список всех задач
toDo.changeStatus("write a post", statusList["Done"]); // меняет статус задачи
toDo.addTask('have a walk'); // добавляет новую задачу
toDo.showList(); // показывает список всех задач
toDo.deleteTask('have a walk'); // удалаяет задачу
toDo.showList(); // показывает список всех задач
