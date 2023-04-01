'use strict';

const list = {
  'create a new practice task': 'In Progress',
  'make a bed': 'Done',
  'write a post': 'To Do',
};

function changeStatus(prop, status) {
  list[prop] = status;
}

const addTask = task =>
  task in list ? 'Property already exists!' : (list[task] = 'To Do');

const deleteTask = delTask =>
  delTask in list ? delete list[delTask] : 'property not found';

function showList() {
  const listArrayKeys = Object.keys(list);
  const listArrayValues = Object.values(list);

  for (let i = 0; i < listArrayKeys.length; i++) {
    const result = `${listArrayKeys[i]}: ${listArrayValues[i]}`;
    console.log(result);
  }
}

changeStatus('write a post', 'Done');
addTask('have a walk');
deleteTask('have a walk');
showList();