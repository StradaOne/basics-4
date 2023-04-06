'use strict';

let taskList = ['Take a class', 'Go to the gym ', 'Strada', 'Sleep',];

taskList.unshift('Wake up');
taskList.pop();

let firstTwoTask = taskList.slice(0, 2);
console.log(firstTwoTask);

let delTask = taskList.splice(2, 1);
console.log(delTask);

for (const task of taskList) {
    console.log(task);
}