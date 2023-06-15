const PRIORITY = {
   HIGH : 'high',
   LOW : 'low' ,
}

const STATUS = {
   TODO : 'to do',
   IN_PROGRESS : 'in progress',
   DONE : 'done' ,
}

const list = [ 
	{name: 'create a post', status: STATUS.IN_PROGRESS, priority: PRIORITY.LOW}, 
  {name: 'test', status: STATUS.DONE, priority: PRIORITY.HIGH} 
];

function addTask(name, priority){
   // const isTaskInArray = list.map(item => item.name).includes(taskName);
   const isTaskInArray = list.find(item => item.name === name);

   if (isTaskInArray){
      console.log(`Задача "${name}" уже есть в списке`)
   } else {
      const newTask = {
         name ,
         status : STATUS.TODO ,
         priority ,
      }
      list.push(newTask);
      console.log(`Задача "${name}" добавлена`)
   }
}

function changeStatus(taskName, statusName){
   const isTaskInArray = list.findIndex(item => item.name === taskName);

   if(isTaskInArray!=-1){
      list[isTaskInArray].status = statusName;
      console.log(`Статус задачи "${taskName}" изменён на "${statusName}" `)
   } else {
      console.log(`Задачи "${taskName}" нет в списке`)
   }
}

function deleteTask (taskName) {
   let task = list.findIndex(item => item.name === taskName);
   if(task !== -1){
      list.splice(task,1);
      console.log(`Задача "${taskName}" удалена`)
   } else {
      console.log(`Задачи "${taskName}" нет в списке`)
   }
}

function showList () {
   let todo = '';
   let in_progress = '';
   let done = '';

   console.log('To Do:')
   list.forEach(item => {
      if (item.status === STATUS.TODO){
         todo += '\t' + item.name + '\n'
      }
   })

   if(todo == false) {
      console.log(todo + '\t-')
   }
   console.log(todo)

   console.log('In Progress:')
   list.forEach(item => {
      if (item.status === STATUS.IN_PROGRESS){
         in_progress += '\t' + item.name + '\n'
      }
   })

   if(in_progress == false) {
      console.log(in_progress + '\t-')
   }
   console.log(in_progress)

   console.log('Done:')
   list.forEach(item => {
      if (item.status === STATUS.DONE){
         done += '\t' + item.name + '\n'
      }
   })

   if(done == false) {
      console.log(done + '\t-')
   }
   console.log(done)
}

addTask('test',PRIORITY.HIGH);
addTask('to do the task',PRIORITY.HIGH);
addTask('to do the task2',PRIORITY.HIGH);

changeStatus('test111', STATUS.IN_PROGRESS);
changeStatus('test', STATUS.IN_PROGRESS);

deleteTask('Sleep');
deleteTask('test');

console.log(list);
showList();


