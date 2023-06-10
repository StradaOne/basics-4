const ELEMENTS = {
    FORMHIGH: document.querySelector('.formHigh'),
    FORMLOW: document.querySelector('.formLow'),
    TEXTINPUTHIGH: document.querySelector('.text_input'),
    TEXTINPUTLOW: document.querySelector('.text_input_low'),
    HIGHLIST: document.querySelector('#high'),
    LOWLIST: document.querySelector('#low'),
};


const STATUS = {
    DONE: 'Done',
    TO_DO: 'ToDo', 
};

const PRIORITY = {
    HIGH: 'High',
    LOW: 'Low',
};

const list = [];

ELEMENTS.FORMHIGH.addEventListener('submit', (event) => {
    event.preventDefault();
    addTask(ELEMENTS.TEXTINPUTHIGH.value, PRIORITY.HIGH);
    ELEMENTS.TEXTINPUTHIGH.value = '';
})

ELEMENTS.FORMLOW.addEventListener('submit', (event) => {
    event.preventDefault();
    addTask(ELEMENTS.TEXTINPUTLOW.value, PRIORITY.LOW);
    ELEMENTS.TEXTINPUTLOW.value = '';
})

function addTask (name, priority) {
    const task = {name: name, STATUS: STATUS.TO_DO, PRIORITY: priority}
    if (name === '') {
        return 
    } else {
        list.push(task);
    }
    render();
}

function render() {
    ELEMENTS.HIGHLIST.innerHTML = '';
    ELEMENTS.LOWLIST.innerHTML = '';
    list.forEach(function(element) {
        if(element.PRIORITY === PRIORITY.HIGH) {
            addListTaskHigh(element);
        } else if(element.PRIORITY === PRIORITY.LOW) {
            addListTaskLow(element);
        }
    });
}

function idNumber() {
    let number = Date.now();
    return number;
}

function addListTaskHigh (item) {
    let newId = idNumber();
    const newDiv = document.createElement('div');
    newDiv.className = 'task_input task_input_label task';
    
    const label = document.createElement('label');
    label.className = 'label';
    label.textContent = item.name;

    label.setAttribute('for', `${newId}`);


    const checkBox = document.createElement('input');
    checkBox.type = 'checkbox';
    checkBox.className = 'checkbox';
    checkBox.setAttribute('id', `${newId}`);

    const button = document.createElement('button');
    button.className = 'btn';
    button.textContent = '+';
    
    newDiv.append(label);
    newDiv.prepend(checkBox);
    newDiv.append(button);

    ELEMENTS.HIGHLIST.append(newDiv);

    button.addEventListener('click', () => {
        deleteTask(item.name);
    })
}

function addListTaskLow (item) {
    let newId = idNumber();
    const newDiv = document.createElement('div');
    newDiv.className = 'task_input task_input_label task';
    
    const label = document.createElement('label');
    label.className = 'label';
    label.textContent = item.name;

    label.setAttribute('for', `${newId}`);


    const checkBox = document.createElement('input');
    checkBox.type = 'checkbox';
    checkBox.className = 'checkbox';
    checkBox.setAttribute('id', `${newId}`);

    const button = document.createElement('button');
    button.className = 'btn';
    button.textContent = '+';
    
    newDiv.append(label);
    newDiv.prepend(checkBox);
    newDiv.append(button);

    ELEMENTS.LOWLIST.append(newDiv);

    button.addEventListener('click', () => {
        deleteTask(item.name);
    })
}

function deleteTask(item) {
    let taskName = list.findIndex(task => task.name === item);
    list.splice(taskName, 1);
    render();
}
