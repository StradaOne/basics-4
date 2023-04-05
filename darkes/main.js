const STATUS = {
   TODO: 'To Do',
   DONE: 'Done',
   INPROGRESS: 'In Progress'
}

const list = {
   "create a new practice task": STATUS.INPROGRESS,
   "make a bed": STATUS.DONE,
   "write a post": STATUS.TODO
}

function isTaskExist(task) {
   if (!(task in list)) {
      console.log('No tasks with the entered name.');
      return false;
   }
   return true;
}

function isTaskStatusValid(status) {
   if (!Object.values(STATUS).includes(status)) {
      console.log('Not valid name for status.');
      return false;
   }
   return true;
}

function isTaskNameValid(task) {
   if (!task) {
      console.log('Your task is Empty.');
      return false;
   }
   return true;
}

function addTask(task, status = STATUS.TODO) {
   if (!isTaskNameValid(task)) {
      return;
   }
   if (!isTaskStatusValid(status)) {
      return;
   }
   list[task] = status;
}

function deleteTask(task) {
   if (!isTaskNameValid(task)) {
      return;
   }
   if (!isTaskExist(task)) {
      return;
   }
   delete list[task];
}

function changeStatus(task, status) {
   if (!isTaskNameValid(task)) {
      return;
   }
   if (!isTaskExist(task)) {
      return;
   }
   if (!isTaskStatusValid(status)) {
      return;
   }
   list[task] = status;
}

function printTask(status) {
   let checkData = '';

   for (const task in list) {
      if (list[task] === status) {
         checkData += '\t' + task + '\n';
      }
   }
   checkData ? console.log(`${status}: \n${checkData}`)
      : console.log(`${status}: \n\t -\n`);
}

function showTask() {
   printTask(STATUS.DONE);
   printTask(STATUS.TODO);
   printTask(STATUS.INPROGRESS);
}

addTask('have a walk', STATUS.DONE);
changeStatus('write a post', STATUS.DONE);
deleteTask('have a walk');
showTask();