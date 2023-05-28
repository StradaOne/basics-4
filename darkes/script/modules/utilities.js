import { list } from '../main.js'
import { ELEMENT } from './elements.js';

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

export { OPERATION };