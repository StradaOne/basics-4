
function getElement(selector) {
    return document.querySelector(selector);
}
function getElements(selector) {
    return document.querySelectorAll(selector);
}

const highPriorityTasks = getElement('.tasks-high-priority');
const lowPriorityTasks = getElement('.tasks-low-priority');

const submitBtn = getElements('.btn-adding');
const inputAddingTask = getElements('.adding-input');

const submitBtnHandler = (event) => {
    console.log(event.target);
    event.preventDefault();
    if (event.target === submitBtn[0]) {
        createNewTask(highPriorityTasks, inputAddingTask[0].value);
        return inputAddingTask[0].value = '';

    }
    else if (event.target === submitBtn[1]) {
        createNewTask(lowPriorityTasks, inputAddingTask[1].value);
        return inputAddingTask[1].value = '';
    }
}

submitBtn.forEach(btn => btn.addEventListener('click', submitBtnHandler));

function createNewTask(priorityTasksBlock, taskValue) {
    
    priorityTasksBlock.insertAdjacentHTML('beforeend', `<div class="task-item task-high-priority">
        <label>
            <input type="checkbox" class="input-checkbox">
            <div class="task-text">
                ${taskValue}
            </div>
        </label>
        <button class="btn-task-delete"></button>
    </div>`)
}

