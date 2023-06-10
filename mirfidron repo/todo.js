const form = document.querySelector('.form');
const list = document.querySelector('.section-high');
const inp = document.querySelector('.input-plus');
const btn = document.querySelector('button-add');


const form2 = document.querySelector('.form-2');
const list2 = document.querySelector('.section-low');
const inp2 = document.querySelector('.input-plus-2');
const btn2 = document.querySelector('button-add-2');

const ToDo = [];

const Status = {
    Done: "Done",
	Todo: "To Do",
};

function addObject(a,b,c){ToDo.push({name: a, status: b, priority: c})};

function clearInput() {
    inp.value = '';
};

function clearInput2() {
    inp2.value = '';
};

function addTask(event) {
    event.preventDefault(); 
    try {
        if (inp.value == '') {
        throw new SyntaxError("Поле не может быть пустым");
          };  
        const newDiv = document.createElement('div');
        list.appendChild(newDiv);
        newDiv.classList.add("todo-list");
        newDiv.insertAdjacentHTML('afterbegin', `<div class="todo-box"><input class="checkbox" type="checkbox" name="todo" id=""><div class="space"><label class="todo-ht" for="todo">${inp.value}</label><button type="submit" class="button-del"><img class="del" src="del.jpg" alt=""></button></div></div>`);
        addObject(`${inp.value}`,'To Do', 'high');
        console.log(ToDo);
        const delDiv = newDiv.querySelector('.button-del');
        const checkbox = newDiv.querySelector('.checkbox');
        checkbox.addEventListener('change',() => {
            const check = checkbox.checked;
            if (check) {
                newDiv.style.backgroundColor = "#d0bdf4";
                const text = newDiv.textContent;
                const index = ToDo.findIndex(task => text == task.name);
                ToDo[index].status = "Done";
                console.log(ToDo)
        
            } else {
                newDiv.style.backgroundColor = "white";
                const text = newDiv.textContent;
                const index = ToDo.findIndex(task => text == task.name);
                ToDo[index].status = "To Do";
                console.log(ToDo)
            }
        });
        delDiv.addEventListener('click',() => {
            const text = newDiv.textContent;
            const index = ToDo.findIndex(task => text == task.name);
            ToDo.splice(index,1);
            list.removeChild(newDiv);
            console.log(ToDo);
        });
        clearInput();
    } catch(e) {
        alert(e.message);
        }
    
}

function addTask2(event) {
    event.preventDefault();
    try {
        if (inp2.value == '') {
        throw new SyntaxError("Поле не может быть пустым");
          };
        const newDiv = document.createElement('div');
        list2.appendChild(newDiv);
        newDiv.classList.add("todo-list");
        newDiv.insertAdjacentHTML('afterbegin', `<div class="todo-box"><input class="checkbox" type="checkbox" name="todo" id=""><div class="space"><label class="todo-ht" for="todo">${inp2.value}</label><button type="submit" class="button-del2"><img class="del2" src="del.jpg" alt=""></button></div></div>`);
        addObject(`${inp2.value}`,'To Do', 'low');
        const delDiv = newDiv.querySelector('.button-del2');
        const checkbox = newDiv.querySelector('.checkbox'); 
        checkbox.addEventListener('change',() => {
            const check = checkbox.checked;
            if (check) {
                newDiv.style.backgroundColor = "#d0bdf4";
                const text = newDiv.textContent;
                const index = ToDo.findIndex(task => text == task.name);
                ToDo[index].status = "Done";
                console.log(ToDo)
        
            } else {
                newDiv.style.backgroundColor = "white";
                const text = newDiv.textContent;
                const index = ToDo.findIndex(task => text == task.name);
                ToDo[index].status = "To Do";
                console.log(ToDo)
            }
        });
        delDiv.addEventListener('click',() => {
            const text = newDiv.textContent;
            const index = ToDo.findIndex(task => text == task.name);
            ToDo.splice(index,1);
            list2.removeChild(newDiv);
            console.log(ToDo);
        });
        clearInput2();
    } catch(e) {
        alert(e.message);
      } 
}


form.addEventListener('submit', addTask);

form2.addEventListener('submit', addTask2);