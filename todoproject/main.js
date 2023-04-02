const todotask = "To Do";
const donetask = "Done";
const inprogress = "In progress";

const todoList = {
  list: {
    "go to the gym": donetask,
    "Learn English": todotask,
    "Home work": inprogress
  },
};

function changeStatus(name, status) {
  if (status === todotask || status === donetask || status === inprogress) {
    if (name in todoList.list) {
      todoList.list[name] = status;
    } else {
      console.log('Такой задачи нет в списке!');
    };
  } else {
    console.log('Введите корректный статус!');
  };
};
function addTask(name) {
  if (name in todoList.list) {
    console.log('Эта задача уже есть в списке!');
  } else {
    todoList.list[name] = todotask;
  };
};

function deleteTask(name) {
  if (name in todoList.list) {
    delete todoList.list[name];
  } else {
    console.log('Такой задачи нет в списке!');
  };
};
function showList() {
  let strToDo = '';
  let strInProgress = '';
  let strDone = '';

  for (const name in todoList.list) {
    if (todoList.list[name] === todotask) {
      strToDo +=name + ':' + todoList.list[name] + '\n';
    } else if (todoList.list[name] === donetask) {
      strDone += name + ':' + todoList.list[name] + '\n';
    } else {
      strInProgress +=name + ':' + todoList.list[name] + '\n';
    };
  };
  strToDo !== '' ? console.log(strToDo): console.log('Nothing is To Do');
  strDone !== '' ? console.log(strDone): console.log('Nothing is Done');
  strInProgress !== '' ? console.log(strInProgress): console.log('Nothing in progress');;
};



deleteTask("Learn English");
addTask("Walk white my frends");
addTask("Walk white my frends");
changeStatus("Walk white my frends", donetask);
changeStatus("Home work", todotask);
changeStatus("Home work", "Hello");
changeStatus("Home work", donetask);
addTask("Cinema time");
showList();




