
const quSel = (el) => document.querySelector(el),
blockHighTasks = quSel('.ToDo_high_block_tasks'),
blockLowTasks  = quSel('.ToDo_low_block_tasks'),
formHigh = quSel('.ToDo_high_input'),
formLow = quSel('.ToDo_low_input'),
btnHigh = quSel('.ToDo_high_task_delete');

const STATUS = { inProgres: 'In progress', done: 'Done'},   
PRIORITY = {low:'low', high: 'high'};

const {inProgres, done} = STATUS,
{low, high} = PRIORITY;


const list = [
    {text: 'create a post', status: inProgres, priority: low}, 
    {text: 'test', status: done, priority: high},
]

formHigh.addEventListener('submit', {handleEvent: createTaskUI, priority: 'high'});      
blockHighTasks.addEventListener('click', {handleEvent: getTargetBtn, priority: 'high'});
blockHighTasks.addEventListener('change', {handleEvent: getTargetCheck, priority: 'high'});



formLow.addEventListener('submit', {handleEvent: createTaskUI, priority: 'low'}); 
blockLowTasks.addEventListener('click', {handleEvent: getTargetBtn, priority: 'low'});
blockLowTasks.addEventListener('change', {handleEvent: getTargetCheck, priority: 'low'});

function createTaskUI(e){
    e.preventDefault();
    
    const TaskText = quSel(`#${this.priority}-input`).value;
    
    quSel(`.ToDo_${this.priority}_block_tasks`).insertAdjacentHTML('beforeend',
    `<div class="ToDo_${this.priority}_task">
    <label class="ToDo_${this.priority}_task_check">
    <input class="ToDo_${this.priority}_task_check_inp" type="checkbox" ></input>
    </label>
    <div class="ToDo_${this.priority}_task_text">${TaskText}</div>
    <button class="ToDo_${this.priority}_task_delete"></button>
    </div>`
    );
    
    list.push({text: TaskText , status: inProgres, priority: this.priority})
}

function getTargetBtn(e){
    const target = e.target;
    
    if (target.classList.contains(`ToDo_${this.priority}_task_delete`) == false) return;
    
    deleteTaskUI(target, this.priority)
}

function deleteTaskUI(target, priority){
    const text = target.parentNode.querySelector(`.ToDo_${priority}_task_text`).textContent,
    indexText = list.findIndex( task => task.text === text);
    target.parentNode.remove()
    
    list.splice(indexText, 1);
    
}

function getTargetCheck(e){
    const target = e.target;
    if (target.classList.contains(`ToDo_${this.priority}_task_check_inp`) == false) return;
    
    if (target.checked){
        changeStatusUI(target, this.priority, true);
    } else {
        changeStatusUI(target, this.priority, false);
    }
}

function changeStatusUI(target, priority, complete){
    const text = target.parentNode.parentNode.querySelector(`.ToDo_${priority}_task_text`).textContent,
    indexText = list.findIndex( task => task.text === text );
    
    if (complete) {
        target.parentNode.parentNode.classList.add('bc_grey')
        list[indexText].status = done;
    } else {
        target.parentNode.parentNode.classList.remove('bc_grey')
        list[indexText].status = inProgres;
    }
}

render()

function render(){
    quSel('.ToDo_high_block_tasks').innerHTML = '';
    quSel('.ToDo_low_block_tasks').innerHTML = '';  
    list.forEach(function(item){
        let checkbox = '',
            classBlock = '';
        if ((item.status) === 'Done') {
            checkbox = "checked ='checked'";
            classBlock = 'bc_grey'
        }

        quSel(`.ToDo_${item.priority}_block_tasks`).insertAdjacentHTML('beforeend', `
        <div class="ToDo_${item.priority}_task ${classBlock}">
            <label class="ToDo_${item.priority}_task_check">
                <input class="ToDo_${item.priority}_task_check_inp" type="checkbox" ${checkbox} ></input>
            </label>
            <div class="ToDo_${item.priority}_task_text">${item.text}</div>
            <button class="ToDo_${item.priority}_task_delete"></button>
        </div>
        `)
    })
}

function addTaskList(text, priority = low) {
    if (priority != low || priority != high ) return console.log(`Введите приоритет low или high, 
    при пропруске этого аргумента автоматом ставится low`)
    let task = {text: text, status: inProgres, priority: priority }
    list.push(task);
    render()
}

function deleteTaskList(text) {
    let index = list.findIndex( task => task.text === text);
    if (index === -1) return console.log('Такой таски не обнаружено')
    list.splice(index, 1);
    render()
}

function changePriorityTask(text, priority) {
    if (priority != low || priority != high ) return console.log('Введите приоритет low или high')
    let index = list.findIndex( task => task.text === text);
    if (index === -1) return console.log('Такой таски не обнаружено')
    index.priority = priority;
    render()
}

console.log(`Доступные консольные команды:
deleteTaskList("text")
addTaskList("text", "priority")
changePriorityTask("text", "priority")
`)









