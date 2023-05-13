import {getElement, high, low, formHigh, formLow, listItem} from './elements.js';
import {STATUS, PRIORITY, ERROR} from './constants.js';
import {showElements, showElement, deleteElemntsUi} from './utilitiesUi.js';

let data = [
    {prioritу: PRIORITY.HIGH, status: STATUS.UNCHECKED, task: 'This is super interesting theme. You know you fils whith code become big, you want takeout some things somewere from main program.'},
    {prioritу: PRIORITY.HIGH, status: STATUS.CHECKED, task: 'Make this TODO list'},
    {prioritу: PRIORITY.HIGH, status: STATUS.UNCHECKED, task: 'Start to do task'},
    {prioritу: PRIORITY.LOW, status: STATUS.UNCHECKED, task: 'Watch YouTube'},
];

function addTask(event){
    event.preventDefault();
    try{
        const formData = new FormData(event.target);
        const task = formData.get('task');
        if(task === ''){
            throw new Error(ERROR.EMPTY)
        } 
        let newData;
        newData = data.filter((item) => {
            if(item.task === task){
                return true;
            }
        })
        if(newData.length !== 0){
            throw new Error(ERROR.DUPLICATE)
        }
        if(event.target.className === 'form-high'){
            data.push({prioritу: PRIORITY.HIGH, status: STATUS.UNCHECKED, task})
            event.target.reset()
            render()
        }
        if(event.target.className === 'form-low'){
            data.push({prioritу: PRIORITY.LOW, status: STATUS.UNCHECKED, task})
            event.target.reset()
            render()
        }
    } catch(err){
        alert(err)
    }
}

function changeData(event){
    if(event.target.className === 'item-btn'){
        const taskText = event.target.previousElementSibling.textContent;
        data = data.filter((item) => {
            return item.task !== taskText;
        })
        render()
    }
    if(event.target.className === 'item-checkbox unchecked'){
        const taskText = event.target.nextElementSibling.textContent;
        data = data.map((item) => {
                if(item.task === taskText){
                    item.status = 'checked';
                    return item;
                } else {
                    return item;
                }
            })
        render()
    }
    if(event.target.className === 'item-checkbox checked'){
        const taskText = event.target.nextElementSibling.textContent;
        data = data.map((item) => {
            if(item.task === taskText){
                item.status = 'unchecked';
                return item;
            } else {
                return item;
            }
        })
        render()
    }
}

function render(){
    deleteElemntsUi()
    showElements(data)
}

render()

formHigh.addEventListener('submit', addTask)
formLow.addEventListener('submit', addTask)
listItem.addEventListener('click',changeData)


