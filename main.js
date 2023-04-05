let toDoList = ['Preparation by work', 'Work', 'Learning JS', 'Cooking eat on all day'];

function showArrayToDo() {
    for (task of toDoList) {
        console.log(task);
    }
}

function differentOperationArrayToDo() {
    toDoList.splice(1, 1);
    toDoList.splice(1, 0, 'Training');
    toDoList.pop();
    toDoList.shift();
    toDoList.unshift('Preparation last work');
    toDoList.push('By eat in canteen');
}

console.log('\nThis is first array:\n');

showArrayToDo();

console.log('\nThis is second array:\n');

differentOperationArrayToDo();

showArrayToDo();

console.log();