/* eslint-disable no-restricted-syntax */
const toDoList = {
  list: {
    'create a new practice task': 'In Progress',
    'make a bed': 'Done',
    'write a post': 'Done',
    'drink a coffee': 'In Progress',
  },
  addTask(key) {
    this.list[key] = 'To Do';
  },
  changeStatus(key, value) {
    if (key in this.list) {
      this.list[key] = value;
    }
  },
  deleteTask(key) {
    delete this.list[key];
  },
  showList() {
    const noTask = '\t' + '-';
    console.log('To Do:');
    let i = 0;
    for (const task in this.list) {
      if (this.list[task] === 'To Do') {
        console.log(`\t${task}`);
        i += 1;
      }
    }
    if (i === 0) {
      console.log(noTask);
    }

    console.log('In progress:');
    i = 0;
    for (const task in this.list) {
      if (this.list[task] === 'In Progress') {
        console.log(`\t${task}`);
        i += 1;
      }
    }
    if (i === 0) {
      console.log(noTask);
    }

    console.log('Done:');
    i = 0;
    for (const task in this.list) {
      if (this.list[task] === 'Done') {
        console.log(`\t${task}`);
        i += 1;
      }
    }
    if (i === 0) {
      console.log(noTask);
    }
  },
};

toDoList.addTask('have a walk');
toDoList.changeStatus('write a post', 'In Progress');
toDoList.changeStatus('create a new practice task', 'Done');
toDoList.deleteTask('make a bed');
toDoList.deleteTask('have a walk');
toDoList.showList();
