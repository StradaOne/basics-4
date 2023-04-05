const TASK_LIST = ['изучить теорию', 'сделать практику','сделать коммит','запушить задачу'];

const lastItem = TASK_LIST.pop();
const taskCount = TASK_LIST.length;
const taskDelete = TASK_LIST.splice(0,1);
TASK_LIST.splice(3,0,'use splice for add task','use array method');
console.log(lastItem);
console.log(taskCount);
console.log(taskDelete);

for (const task of TASK_LIST){
    console.log(`* ${task}`)
}