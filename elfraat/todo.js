const STATUS = {
    TO_DO: 'To Do',
    IN_PROGRESS: 'In progress',
    DONE: 'Done'
}


const TO_DO_LIST = {
    list:{
        "create a new practice task": STATUS.IN_PROGRESS,
        "make a bed": STATUS.DONE,
        "write a post": STATUS.TO_DO
    },
    addTask(task){
        this.list[task] = STATUS.TO_DO;
    },
    deleteTask(task) {
        if (!(task in this.list)) {
            console.log('NO TASK FOR DELETE') ;
        } else {
            delete this.list[task];
        }
    },
    showList(){
        for (const task in this.list){
            console.log(`${task}: ${this.list[task]}`);
        }
    },
    changeStatus(task, status){
        if (!(task in this.list)){
            console.log('NO TASK FOR CHANGE')
        } else {
            this.list[task] = status;
        }
    },


};

TO_DO_LIST.addTask('do todo list');
TO_DO_LIST.deleteTask('make a bed');
TO_DO_LIST.addTask('write change status function');
TO_DO_LIST.changeStatus('do todo lister', STATUS.DONE);
TO_DO_LIST.addTask('commit and push pull request');
TO_DO_LIST.deleteTask('do todo listt');
TO_DO_LIST.changeStatus('do todo list',STATUS.IN_PROGRESS);
TO_DO_LIST.showList();

