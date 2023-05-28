import { ELEMENT, getSelector } from "./modules/elements.js";
import { STATUS, PRIORITY } from "./modules/constants.js";
import { VALIDATION } from "./modules/validations.js";
import { OPERATION } from "./modules/utilities.js";
import { getLocalStorage, setLocalStorage } from "./modules/localStorage.js";

export let list = [];

function Task(name, priority) {
   this.name = name;
   this.status = STATUS.TODO;
   this.priority = priority;
}

function addTask(name, priority) {
   list.push(new Task(name, priority));
   setLocalStorage('myList', list);
};

function changeStatus(name, status) {
   OPERATION.FIND_TASK(name).status = status;
   setLocalStorage('myList', list);
};

function removeTask(elem, name) {
   list = list.filter(item => item.name !== name);
   setLocalStorage('myList', list);
   elem.parentNode.remove();
};

// This function creates an HTML element for a task.
function createTaskElement(task) {
   const newDiv = document.createElement('div');
   const newInput = document.createElement('input');
   const textTask = document.createElement('p');
   const newButton = document.createElement('button');

   task.status === STATUS.DONE ? newInput.checked = true
      : newInput.checked = false;

   newDiv.classList.add('task');
   newInput.classList.add('radio-button');
   newInput.type = 'checkbox';
   newInput.id = 'change-box';
   textTask.classList.add('task-text');
   textTask.textContent = task.name;
   newButton.classList.add('task-container__button');
   newButton.classList.add('task-container__button_45degrees');
   newButton.id = 'button-delete';

   newDiv.append(newInput, textTask, newButton)

   return newDiv;
};

// Renders all task elements to the DOM.
function render(priority) {
   const storedData = getLocalStorage('myList')
   list = storedData ? JSON.parse(storedData) : [];

   const sortedList = list.filter(task => task.priority === priority);

   sortedList.forEach(task => {
      const form = task.priority === PRIORITY.HIGH ? ELEMENT.FORM_HIGH
         : ELEMENT.FORM_LOW;

      form.after(createTaskElement(task));

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

document.addEventListener('DOMContentLoaded', () => {
   showList();
});