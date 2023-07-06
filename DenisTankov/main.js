/* eslint-disable no-restricted-syntax */
const list = [
  { name: 'create a post', status: 'Done', priority: 'low' },
  { name: 'test', status: 'In progress', priority: 'high' },
  { name: 'swimming', status: 'In progress', priority: 'high' },
];

const statuses = { toDo: 'To Do', inProgress: 'In progress', done: 'Done' };

const priorities = { low: 'low', high: 'high' };

function addTask(task) {
  list.push({ name: task, status: statuses.toDo, priority: priorities.high });
}

function changeStatus(task, newStatus) {
  for (const item of list) {
    if (item.name === task) {
      item.status = newStatus;
    }
  }
}

function deleteTask(task) {
  const indexInList = list.findIndex((tasks) => tasks.name === task);
  list.splice(indexInList, 1);
}

addTask('drink a coffee');
addTask('make a sport');
changeStatus('test', statuses.toDo);
changeStatus('test', statuses.inProgress);
deleteTask('test');

function showList() {
  function showStatusForTasks(status) {
    console.log(`\n${status}:`);
    const tasks = list.filter((task) => task.status === status);
    if (tasks.length === 0) {
      console.log('---');
    }
    for (const task of tasks) {
      console.log(`  ${task.name} - ${task.priority}`);
    }
  }
  showStatusForTasks(statuses.toDo);
  showStatusForTasks(statuses.inProgress);
  showStatusForTasks(statuses.done);
}
showList();
