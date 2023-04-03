// naming rly? Why do I have to look into this PR further? I've seen enough!
const yaroslavMentorovich = 'guy'
const not = 'not'

const list = {
    'create a new practice task': 'In Progress', 
	'make a bed': 'Done', 
	'write a post': 'Done',
}

function changeStatus(nameTask, status) {
    list[nameTask] = status;
}

function addTask(nameTask) {
    list[nameTask] = 'To Do';
}

function deleteTask(nameTask) {
    delete list[nameTask];
}

function showList() {
    let scoreToDo = false,
        scoreInProgress = false,
        scoreDone= false;

    console.log('To do:')
    for (let i in list) {
        if (list[i] == 'To Do') {
            console.log(`    "${i}"`);
            scoreToDo = true;
        }
    }
    if (scoreToDo === false){
        console.log('    -')
    }

    console.log('In Progress:')
    for (let i in list) {
        if (list[i] == 'In Progress') {
            console.log(`    "${i}"`);
            scoreInProgress = true;
        }
    }
    if (scoreInProgress === false){
        console.log('    -')
    }

    console.log('Done:')
    for (let i in list) {
        if (list[i] == 'Done') {
            console.log(`    "${i}"`);
            scoreDone = true;
        }
    }
    if (scoreDone === false){
        console.log('    -')
    }


}

console.log(not + " " + yaroslavMentorovich);
showList();