const statuses = {
  TODO: 'ToDo',
  DONE: 'Done',
  IN_PROGRESS: 'In progress',
}

const priority = {
  HIGH: 'high',
  LOW: 'low',
  TEST: 'test',
}

const errors = {
  taskIsNotExists: 'Задачи не существует',
  taskIsExists: 'Задача уже существует',
  priorityIsNotExists: 'Такого приоритета не существует',
  statusIsNotExists: 'Такого статуса не существует',
}

const messages = {
  changeStatus: 'Статус задачи изменён',
  changePriority: 'Приоритет задачи изменён',
  addTask: 'Задача добавлена',
  deleteTask: 'Задача удалена',
}

const list = [ 
	{name: 'create a post', status: statuses.IN_PROGRESS, priority: priority.LOW}, 
  {name: 'test', status: statuses.DONE, priority: priority.HIGH} 
];

const isEmpty = (task) => { return !task.trim(); };

function isTaskExists(task) {
  return list.map(goal => goal.name).includes(task);
}

function indexOfTask(task) {
  return list.findIndex(goal => goal.name === task);
}

function isPriorityExists(prior) {
  return Object.values(priority).includes(prior);
}

function isStatusExists(stat) {
  return Object.values(statuses).includes(stat);
}

function addTask(task, stat = statuses.TODO, prior = priority.LOW) {
  if (isTaskExists(task)) {
    console.log(errors.taskIsExists);
    return;
  }
  if (!isPriorityExists(prior)) {
    console.log(errors.priorityIsNotExists);
    return;
  }
  if (!isStatusExists(stat)) {
    console.log(errors.statusIsNotExists);
    return;
  }
  const goal = {
    name: task,
    status: stat,
    priority: prior
  };
  list.push(goal);
  console.log(messages.addTask)
}

function changeStatus(task, stat) {
  if (!isTaskExists(task)) {
    console.log(errors.taskIsNotExists);
    return;
  }
  if (!isStatusExists(stat)) {
    console.log(errors.statusIsNotExists);
    return;
  }
  const indexTask = indexOfTask(task);
  list[indexTask].status = stat;
  console.log(messages.changeStatus);
  return;
}

function changePriority(task, prior) {
  if (!isTaskExists(task)) {
    console.log(errors.taskIsNotExists);
    return;
  }
  if (!isPriorityExists(prior)) {
    console.log(errors.priorityIsNotExists);
    return;
  }
  const indexTask = indexOfTask(task);
  list[indexTask].priority = prior;
  console.log(messages.changePriority);
  return;
}

function deleteTask(task) {
  if (!isTaskExists(task)) {
    console.log(errors.taskIsNotExists);
    return;
  }
  const indexTask = indexOfTask(task);
  list.splice(indexTask, 1);
  console.log(messages.deleteTask);
  return;
}

function showList() {
  const priorities = Object.keys(priority); 

  const priorityLists = {}; 

  for (const p of priorities) {
    priorityLists[p] = list.filter(task => task.priority === priority[p]);
  }

  for (const stat in statuses) { 
    console.log(`------${stat}------`);
    let noTasks = true;
    for (const p of priorities) { 
      const taskList = priorityLists[p].filter(task => task.status === statuses[stat]); 
      if (taskList.length == 0) {
        continue;
      }
      noTasks = false;
      for (const task of taskList) { 
        console.log(`\t${task.name}: ${task.priority} priority`);
      }
    }
    if (noTasks) { // Если для данного статуса нет задач, выводим тире
      console.log('\t-');
    }
  }
}


addTask('Walk', statuses.IN_PROGRESS, priority.HIGH)
addTask('okau', statuses.TODO, priority.HIGH)
addTask('lol', statuses.TODO, priority.HIGH)
addTask('Go', statuses.TODO)
addTask('Eest')
addTask('KISS', statuses.IN_PROGRESS, priority.HIGH)
showList();
