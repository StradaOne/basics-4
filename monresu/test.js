
const list = {
  'create a new practice task': 'In progress',
  'make a bed': 'Done',
  'write a post': 'To Do',
};
for (const name in list) {
  if (list[name] === 'Done') {
    console.log(name + ' ' + 'Done');
  } else if (list[name] === 'In progress') {
    console.log(name + ' ' + 'In progress');
  } else if (list[name] === 'To Do') {
    console.log(name + ' ' + 'To Do');
  }
};
changeStatus(name, status) {
  list[name] = status;
}
addTask(name, status){
  list[name] = status;
}
deleteTask(name, status){
  delete [name];
}
//  let showList = (status);

//  switch (showList) {
//   case 
//  }



console.log('create a new practice task' in list);