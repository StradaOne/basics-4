const tasklist = {
list: {
"Create a new practice task": "In Progress",
"Make a bed":  "done",
"Write a post": "To Do",
},
changeStarus(name, status) {
    this.list[name] = status;
},
addTask(name, status,) {
    this.list[name] = status;
},
deleteTask(name) {
    delete this.list[name];
},
showlist() {
    console.log('To Do:');
    for(const name in this.list) {
        if(this.list[name] === 'To Do') {
            console.log(`\t${name}`);
        }
    } 
    console.log('done:');
    for(const name in this.list) {
        if(this.list[name] === 'done') {
            console.log(`\t${name}`);
        }
    }
    console.log('In Progress:');
    for(const name in this.list) {
        if(this.list[name] === 'In Progress') {
            console.log(`\t${name}`);
        }
    }
}
}
// tasklist.addTask('go home', 'let go');
tasklist.deleteTask('Make a bed');
// tasklist.changeStarus('Write a post','did');
tasklist.showlist();

