const PRIORITY = {
   LOW: 'low',
   HIGH: 'high'
};

const STATUS = {
   INPROGRESS: 'In Progress',
   DONE: 'Done',
   TODO: 'To Do',
};

const ERROR = {
   NO_TASK: 'No tasks with the entered name.',
   NOT_STATUS: 'Not valid name for status.',
   NOT_PRIORITY: 'Not valid name for priority.',
   EMPTY: 'Your task is Empty.'
};

const list = [
   { name: 'create a new practice task', status: STATUS.INPROGRESS, priority: PRIORITY.HIGH },
   { name: 'make a bed', status: STATUS.DONE, priority: PRIORITY.LOW },
   { name: 'write a post', status: STATUS.TODO, priority: PRIORITY.LOW }
];

function isTaskExist(nameTask) {
   if (!findTask(nameTask)) {
      console.log(ERROR.NO_TASK);
      return false;
   }
   return true;
};

function isTaskStatusValid(statusTask) {
   if (!Object.values(STATUS).includes(statusTask)) {
      console.log(ERROR.NOT_STATUS);
      return false;
   }
   return true;
};

function isTaskPriorityValid(priorityTask) {
   if (!Object.values(PRIORITY).includes(priorityTask)) {
      console.log(ERROR.NOT_PRIORITY);
      return false;
   }
   return true;
};

function isTaskNameValid(nameTask) {
   if (!nameTask) {
      console.log(ERROR.EMPTY);
      return false;
   }
   return true;
};

function findTask(nameTask) {
   return list.find(task => task.name === nameTask);
}

function addTask(nameTask, statusTask = STATUS.TODO, priorityTask = PRIORITY.LOW) {
   if (!isTaskNameValid(nameTask)) {
      return;
   }

   if (!isTaskStatusValid(statusTask)) {
      return;
   }

   if (!isTaskPriorityValid(priorityTask)) {
      return;
   }

   const newTask = { name: nameTask, status: statusTask, priority: priorityTask };
   list.push(newTask);
};

function deleteTask(nameTask) {
   if (!isTaskExist(nameTask)) {
      return;
   }

   const getIndex = list.findIndex(task => task.name === nameTask);
   list.splice(getIndex, 1);
};

function changeStatus(nameTask, statusTask) {
   if (!isTaskExist(nameTask)) {
      return;
   }

   if (!isTaskStatusValid(statusTask)) {
      return;
   }

   findTask(nameTask).status = statusTask;
};

function changePriority(nameTask, priorityTask) {
   if (!isTaskExist(nameTask)) {
      return;
   }

   if (!isTaskPriorityValid(priorityTask)) {
      return;
   }

   findTask(nameTask).priority = priorityTask;
};

function printTask(status) {
   const sortedList = list.filter(task => task.status === status);
   let checkData = '';

   sortedList.forEach(task => {
      checkData += `\n\t${task.name} | ${task.priority}`;
   });

   checkData ? console.log(`${status}: ${checkData}\n`)
      : console.log(`${status}: \n\t -\n`);
};

function showTask() {
   printTask(STATUS.TODO);
   printTask(STATUS.INPROGRESS);
   printTask(STATUS.DONE);
};

addTask('have a walk', STATUS.DONE);
changeStatus('write a post', STATUS.DONE);
changePriority('write a post', PRIORITY.HIGH);
deleteTask('have a walk');
showTask();