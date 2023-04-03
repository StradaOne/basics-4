//константы со статусами найс, нейминг ОК
const TASK_STATUS = {
   TO_DO: 'todo',
   IN_PROGRESS: 'In Progress',
   DONE: 'Done',
}

// лист как отдельный сторадж как и требовалось по ТЗ
// но выше есть константы стоит их использовать, а что если TO_DO => 1?
const list = {
   "create a new practice task": TASK_STATUS.IN_PROGRESS,
   "make a bed": TASK_STATUS.DONE,
   "write a post": "To Do",
}

function changeStatus(task, status) {
   // Можно отказаться от else как вариант
   if (task in list) {
      list[task] = status;
   } else {
      console.log(`В списке нет задачи '${task}'`)
   }
}

function addTask(task) {
   // проверка на непустую задачу? validatonFn?
   // тоже что и выше, но отрефачил
   if (task in list) {
      console.log(`Задача '${task}' уже есть в списке дел`);
      return;
   }

   list[task] = TASK_STATUS.TO_DO
}

function deleteTask(task) {
   if (task in list) {
      delete list[task];
   } else {
      console.log(`Задачи с именем '${task}' нет списке дел`)
   }
}

function showList() {
   // нейминг, с большой буквы не надо
   // все что повторяеться можно вынести в функцию раз,два,три
   let To_Do = '';
   let In_Progress = '';
   let Done = '';
   // раз
   for (const prop in list) {
      if (list[prop] === TASK_STATUS.TO_DO) {
         To_Do += `\t"${prop}"\n`;
      }
   }
   // два
   for (const prop in list) {
      if (list[prop] === TASK_STATUS.IN_PROGRESS) {
         In_Progress += `\t"${prop}"\n`;
      }
   }
   // три
   for (const prop in list) {
      if (list[prop] === TASK_STATUS.DONE) {
         Done += `\t"${prop}"\n`;
      }
   }

   if (To_Do === '') {
      To_Do = `\t-`
   }

   if (In_Progress === '') {
      In_Progress = `\t-`
   }

   if (Done === '') {
      Done = `\t-`
   }
   console.log(`To do:\n${To_Do}`);
   console.log(`In Progress:\n${In_Progress}`);
   console.log(`To do:\n${Done}`);
}
addTask('learn 1');
addTask('learn 2');
addTask('learn 3');
addTask('learn 4');
addTask('learn 5');
addTask('learn 6');
changeStatus('create a new practice task', TASK_STATUS.DONE);
deleteTask('learn 6');
showList()

//нравиться, но можно практить навык декомпозиции