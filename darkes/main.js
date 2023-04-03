const LANG = {
   EN: 'en',
   RU: 'ru'
}

const MESSAGES = {
   [LANG.EN]: {
      EMPTY_NAME: 'Task name is Empty'
   },
   [LANG.RU]: {
      EMPTY_NAME: 'Имя задачи пустое'
   }
}

const STATUS = {
   TODO: 'To Do',
   DONE: 'Done',
   INPROGRESS: 'In Progress',
   TESTING: 'Testing'
}

const currentLang = LANG.RU

// легкость внесения изменией, давай добавим TESTING: 'Testing'

const list = {
   "create a new practice task": STATUS.INPROGRESS,
   "make a bed": STATUS.DONE,
   "write a post": STATUS.TODO,
}

function isTaskNameValid(task){
   if(!task){
      console.log(MESSAGES[currentLang].EMPTY_NAME);
      return false;
   }
   
   return true;
}

function isTaskStatusValid(status){   
   return Object.values(STATUS).includes(status);
}

function isTaskExist(task){
   return task in list;
}

function addTask(task, status = STATUS.TODO) {
   if(isTaskExist(task)){
      return;
   }
   
   if(!isTaskNameValid(task)){
      return;
   }

   if(!isTaskStatusValid(status)){
      console.log('Status is not valid')
      return;
   }
   
   list[task] = status;
}

function deleteTask(task) {
   if (task in list) {
      delete list[task];
   }
}

function changeStatus(task, status) {
   //дубль и сложна
   if (task in list
      && status === STATUS.DONE
      || status === STATUS.INPROGRESS
      || status === STATUS.TODO) {
      list[task] = status;
   }
}

function checkTask(status) {

   let checkData = '';

   for (const task in list) {
      if (list[task] === status) {
         checkData += '\t' + task + '\n';
      }
   }

   //а вот тут тернарник уже подойдет
   if (checkData) {
      console.log(`${status}: \n${checkData}`);
   } else {
      console.log(`${status}: \n\t -\n`);
   }
}

function showTask() {
   // отличная идея!, но нейминг checkTask?
   checkTask(STATUS.DONE);
   checkTask(STATUS.TODO);
   checkTask(STATUS.INPROGRESS);
   checkTask(STATUS.TESTING);
}

addTask('have a walk');
changeStatus("write a post", STATUS.DONE); //! use CONST
deleteTask('have a walk');
addTask('Test', STATUS.TESTING);
showTask();

// допилить и можно сделать UI agnostic
// накидать валидаций, добавить констант с меседжами
