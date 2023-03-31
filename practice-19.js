const IN_PROGRESS = 'In Progress';
const DONE = 'Done';
const TO_DO = 'To Do';
const NOTHING = '';


const taskForToday = {
    list: {
        'Create a new practice task': 'In Progress',
        'Make a bed': 'Done',
        'Write a post': 'To Do',
        'Have a breakfast': 'To Do',
        'Go to gym': '',
        'Read the book': 'In Progress',
    },
    changeStatus(key, status) {
        this.list[key] = status;

    },

    addTask(key) {
        this.list[key] = DONE;
    },

    deleteTask(key) {
        delete this.list[key];
    },

    showList() {
        for (const key in taskForToday.list) {
            if (taskForToday.list[key] == TO_DO) {
                console.log(`${key} : ${taskForToday.list[key]}`);
            }
        } console.log();
        for (const key in taskForToday.list) {
            if (taskForToday.list[key] == IN_PROGRESS) {
                console.log(`${key} : ${taskForToday.list[key]}`);
            }

        } console.log();
        for (const key in taskForToday.list) {
            if (taskForToday.list[key] == DONE) {
                console.log(`${key} : ${taskForToday.list[key]}`);
            }
        } console.log();
        for (const key in taskForToday.list) {
            if (taskForToday.list[key] == NOTHING) {
                console.log('Nothing is Done');
            }

        }
    }
}

taskForToday.changeStatus('Write a post', 'Done');
console.log(taskForToday.list);
taskForToday.changeStatus('Make a bed', 'In Progress');
console.log(taskForToday.list);

taskForToday.addTask('Have a walk');
console.log(taskForToday.list);
taskForToday.addTask('Go to the cinema');
console.log(taskForToday.list);


taskForToday.deleteTask('Create a new practice task');
console.log(taskForToday.list);
taskForToday.deleteTask('Write a post');
console.log(taskForToday.list);

taskForToday.showList();




