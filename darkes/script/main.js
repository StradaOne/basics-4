const getSelector = (css) => document.body.querySelector(css);

const ELEMENT = {
   FORM_HIGH: getSelector('.high-task'),
   INPUT_HIGH: getSelector('#input-high'),
   FORM_LOW: getSelector('.low-task'),
   INPUT_LOW: getSelector('#input-low')
};

const MESSAGE = {
   TASK_EXIST: 'Task already exists!',
   EMPTY: 'Value cannot be empty!'
};

const STATUS = {
   DONE: 'Done',
   TODO: 'To Do',
};

const PRIORITY = {
   LOW: 'low',
   HIGH: 'high'
};

const list = [];

const OPERATION = {
   CLEARS_INPUT: () => {
      ELEMENT.INPUT_HIGH.value = '';
      ELEMENT.INPUT_LOW.value = '';
   },

   CLEARS_TASKS: () => {
      const allTasks = document.querySelectorAll('.task');

      allTasks.forEach(elem => elem.remove());
   },

   FIND_TASK: (name) => {
      return list.find(task => task.name === name);
   }
};

const VALIDATION = {
   IS_TASK_EXIST: (name) => {
      if (OPERATION.FIND_TASK(name)) {
         console.log(MESSAGE.TASK_EXIST);
         OPERATION.CLEARS_INPUT();
         return false;
      }
      return true;
   },

   IS_VALUE_NON_EMPTY: (value) => {
      const isNonEmpty = value.trim() !== '';

      if (!isNonEmpty) {
         console.log(MESSAGE.EMPTY);
         OPERATION.CLEARS_INPUT();
         return false;
      }
      return true;
   }
};

function addTask(name, priority, status = STATUS.TODO) {
   const newTask = { name, priority, status };

   list.push(newTask);
};

function changeStatus(name, status) {
   OPERATION.FIND_TASK(name).status = status;
};

function removeTask(elem, name) {
   const getIndex = list.findIndex(task => task.name === name);

   list.splice(getIndex, 1);
   elem.parentNode.remove();
};

// This function creates an HTML element for a task.
function createTaskElement(task) {
   const checked = task.status === STATUS.DONE
      ? '<input id="change-box" class="radio-button" type="checkbox" checked>'
      : '<input id="change-box" class="radio-button" type="checkbox">';

   const html = `
     <div class="task">
       ${checked}
       <p for="change-box" class="task-text">${task.name}</p>
       <button id="button-delete" class="task-container__button task-container__button_45degrees"></button>
     </div>`;

   return html;
};

// Renders all task elements to the DOM.
function render(priority) {
   const sortedList = list.filter(task => task.priority === priority);

   sortedList.forEach(task => {
      const form = task.priority === PRIORITY.HIGH ? ELEMENT.FORM_HIGH
         : ELEMENT.FORM_LOW;

      form.insertAdjacentHTML('afterend', createTaskElement(task));

      const changeDiv = getSelector('#change-box');
      changeDiv.addEventListener('click', () => {
         if (task.status === STATUS.TODO) {
            changeStatus(task.name, STATUS.DONE);
            return;
         }
         changeStatus(task.name, STATUS.TODO);
      });

      const deleteDiv = getSelector('#button-delete');
      deleteDiv.addEventListener('click', () => {
         removeTask(deleteDiv, task.name);
      })
   });
};

// Displays tasks.
function showList() {
   OPERATION.CLEARS_TASKS();
   OPERATION.CLEARS_INPUT();

   render(PRIORITY.LOW);
   render(PRIORITY.HIGH);
};

// This block of code sets up event listeners for the high-priority form.
ELEMENT.FORM_HIGH.addEventListener('submit', (event) => {
   event.preventDefault();
   const highValue = ELEMENT.INPUT_HIGH.value;

   if (!VALIDATION.IS_VALUE_NON_EMPTY(highValue)) {
      return;
   }

   if (!VALIDATION.IS_TASK_EXIST(highValue)) {
      return;
   }

   addTask(highValue, PRIORITY.HIGH, STATUS.TODO);
   showList();
});

// This block of code sets up event listeners for the low-priority form.
ELEMENT.FORM_LOW.addEventListener('submit', (event) => {
   event.preventDefault();
   const lowValue = ELEMENT.INPUT_LOW.value;

   if (!VALIDATION.IS_VALUE_NON_EMPTY(lowValue)) {
      return;
   }

   if (!VALIDATION.IS_TASK_EXIST(lowValue)) {
      return;
   }

   addTask(lowValue, PRIORITY.LOW, STATUS.TODO);
   showList();
});