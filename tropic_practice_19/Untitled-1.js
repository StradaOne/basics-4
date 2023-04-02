const list = {
	"create a new practice task": "Progress", 
	"make a bed": "Done", 
	"write a post": "To Do"
};

function changeStatus(task, status) {
    list[task] = status

}

function addTask(task, status) {
    list[task] = status
}

function deleteTask(task) {
    delete list[task]
}

function showList() {
    let hasProgress = false;
    console.log('Progress: ')
    for(let listStatus in list) {
        if(list[listStatus] === 'Progress'){
            console.log(`\t${listStatus}`);
            hasProgress = true;
        } 
        
    }

    if (!hasProgress){
        console.log(`\t-`)
    }

    let hasDone = false;
    console.log('Done: ')
    for(let listStatus in list) {
        if(list[listStatus] === 'Done'){
            console.log(`\t${listStatus}`);
            hasDone = true;
        }
    }

    if (!hasDone){
        console.log(`\t-`)
    }
        
    let hasTodo = false;
    console.log('To Do: ')
    for(let listStatus in list) {
        if (list[listStatus] === 'To Do'){
            console.log(`\t${listStatus}`);
            hasTodo = true; 
        }

    }
    if (!hasTodo){
        console.log(`\t-`)
    }
  // console.log(list);
}

changeStatus('write a post', 'Done');
addTask('Door ', 'Done');
deleteTask('make a bed');
showList();