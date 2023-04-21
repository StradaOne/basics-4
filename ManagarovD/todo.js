
const STATUS = {
    toDo:'To Do',
    progress:'In Progress',
    done:'Done',
}
//цвета для консоли
const COLOR = {  
    yellow: "\x1b[33m",
    cyan: "\x1b[36m",
    green: "\x1b[32m",
    reset: "\x1b[0m",
}

const todo = {
    list:{
        "create a new practice task":STATUS.progress,
        "make a bed":STATUS.done,
        "write a post":STATUS.toDo,
    },

    isKey (name) {                                          //проверка есть ли такой ключь в list
       return (this.list[name] !== undefined)?true:false;
    },

    changeStatus (name, statusList) {
        if (this.isKey(name)){
            this.list[name] = statusList;
            return true;
        }
        else return null;

    },

    addTask (name){
        if (!this.isKey(name)) {
            this.list[name] = STATUS.toDo;
            return true;
        }
        else return null;
    },

    deleteTask(name) {
        if (this.isKey(name)) {
            delete this.list[name];
            return true;
        }
        else return null;       
    },

    showList() {
        let flag;
        for (const nameStatus in STATUS) {
            if (STATUS[nameStatus] == STATUS.progress){
                console.log( COLOR.reset + STATUS[nameStatus] + ' :' + COLOR.reset);
            }
            else console.log(COLOR.yellow + STATUS[nameStatus] + ' :' + COLOR.reset);
            flag = 0;
            for(const nameList in this.list){
                if (this.list[nameList] == STATUS[nameStatus]){
                    console.log('       ' + COLOR.green + "\"" + nameList + "\"" + COLOR.reset);
                    flag++;
                }
            }
            if(!flag) console.log(COLOR.green + '       -' + COLOR.reset);
        }
    }
}


todo.showList();
console.log('---------------------------');
todo.addTask('make a todo');
console.log('todo.addTask(make a todo);');
todo.showList();
console.log('---------------------------');
todo.changeStatus('make a todo', STATUS.done);
todo.showList();
console.log('---------------------------');
todo.deleteTask('write a post')
todo.showList();