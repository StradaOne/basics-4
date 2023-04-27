const btnAdd = document.querySelectorAll('.todo__add-img');
const input = document.querySelectorAll('.input');
const tasks = document.querySelectorAll('.tasks');
const form = document.querySelectorAll('form');

form.forEach(el => {
    el.addEventListener('submit', (e) => {
        for (let i = 0; i < form.length; i++) {
            if (e.target === form[i]) {
                e.preventDefault();
                addTask(input[i], tasks[i]);
            };
        };
    });
});

btnAdd.forEach(el => {
    el.addEventListener('click', (e) => {
        for (let i = 0; i < btnAdd.length; i++) {
            if (e.target === btnAdd[i]) {
                e.preventDefault();
                addTask(input[i], tasks[i]);
            };
        };
    });
});

function addTask(input, nodeTasks) {
    const value = input.value;

    const taskNode = `
        <div class="task">
          <div class="task__info">
            <input type="checkbox"/>
            <p class="task__text">${value}</p>
          </div>
          <img src="images/close-icon.svg" class="todo__del-img" />
        </div>`;

    nodeTasks.insertAdjacentHTML('afterbegin', taskNode);
    input.value = '';
    input.focus();
};