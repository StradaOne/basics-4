import { OPERATION } from './utilities.js';
import { MESSAGE } from './constants.js';

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

export { VALIDATION };