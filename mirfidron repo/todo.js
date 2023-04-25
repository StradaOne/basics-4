const form = document.querySelector('.form');
const list = document.querySelector('.section-high');
const inp = document.querySelector('.input-plus');
const btn = document.querySelector('button-add');


const form2 = document.querySelector('.form-2');
const list2 = document.querySelector('.section-low');
const inp2 = document.querySelector('.input-plus-2');
const btn2 = document.querySelector('button-add-2');

function clearInput() {
    inp.value = '';
}

function clearInput2() {
    inp2.value = '';
}

function addTask(event) {
    event.preventDefault();   
    const newDiv = document.createElement('div');
    list.appendChild(newDiv);
    newDiv.classList.add("todo-list");
    newDiv.insertAdjacentHTML('afterbegin', `<div class="todo-box"><input type="checkbox" name="todo" id=""><div class="space"><label class="todo-ht" for="todo">${inp.value}</label><button type="submit" class="button-del"><img class="del" src="del.jpg" alt=""></button></div></div>`);
    clearInput();
}

function addTask2(event) {
    event.preventDefault();
    const newDiv = document.createElement('div');
    list2.appendChild(newDiv);
    newDiv.classList.add("todo-list");
    newDiv.insertAdjacentHTML('afterbegin', `<div class="todo-box"><input type="checkbox" name="todo" id=""><div class="space"><label class="todo-ht" for="todo">${inp2.value}</label><button type="submit" class="button-del"><img class="del" src="del.jpg" alt=""></button></div></div>`);
    clearInput2();  
}


form.addEventListener('submit', addTask);

form2.addEventListener('submit', addTask2);