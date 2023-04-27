
const hagh = document.querySelector('.high');
const low = document.querySelector('.low');
const formHigh = document.querySelector('.form-high');
const formLow = document.querySelector('.form-low');

const data = [
    {prioritу: 'HIGH', status: 'unchecked', task: 'This is super interesting theme. You know you fils whith code become big, you want takeout some things somewere from main program.'},
    {prioritу: 'HIGH', status: 'checked', task: 'Make this TODO list'},
    {prioritу: 'HIGH', status: 'unchecked', task: 'Start to do task'},
    {prioritу: 'LOW', status: 'unchecked', task: 'Watch YouTube'},
];

function makeElement(prioritу, status = 'unchecked', task){
    if(prioritу === 'HIGH'){
        hagh.insertAdjacentHTML('beforeEnd',`<div class="list-item">
            <div class="item-checkbox ${status}"></div>
            <div class="item-text">${task}</div>
            <div class="item-btn"></div>
        </div>`)
    }
    if(prioritу === 'LOW'){
        low.insertAdjacentHTML('beforeEnd',`<div class="list-item">
            <div class="item-checkbox ${status}"></div>
            <div class="item-text">${task}</div>
            <div class="item-btn"></div>
        </div>`)
    }
}

function showElements(data){
    data.forEach(item => {
        makeElement(item.prioritу, item.status, item.task)
    });
}

showElements(data)

function addTask(event){
    event.preventDefault();
    const formData = new FormData(event.target)
    const task = formData.get('task');
    if(event.target.className === 'form-high'){
        makeElement('HIGH', 'unchecked', task)
    }
    if(event.target.className === 'form-low'){
        makeElement('LOW', 'unchecked', task)
    }
}

formHigh.addEventListener('submit', addTask)
formLow.addEventListener('submit', addTask)


