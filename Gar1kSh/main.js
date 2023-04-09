const STATUS = {
  TO_DO: "To Do",
  IN_PROGRESS: "In Progress",
  DONE: "Done",
};

const PRIORITY = {
  HIGH: "High",
  LOW: "Low",
};

const messages = {
  errors: {
    wrongEditTask: `This task doesn\'t exist:\n `,
    wrongDeleteTask: `This task doesn\'t exist:\n `,
  },
  alerts: {
    alertEntryTask: `This task already in ToDo.`,
    alertAddedTask: `This task added:`,
    alertEditedTask: `This task edited:\n`,
    alertDeletedTask: `This task deleted:`,
  },
};

const ToDoList = [
  { name: "Create a post", status: STATUS.TO_DO, priority: PRIORITY.LOW },
  { name: "Test", status: STATUS.IN_PROGRESS, priority: PRIORITY.HIGH },
  { name: "Swimming", status: STATUS.TO_DO, priority: PRIORITY.LOW },
  { name: "Learning language", status: STATUS.TO_DO, priority: PRIORITY.HIGH },
];

const entryInToDoList = (entryTask) => {
  return ToDoList.find(
    (nameTask) => nameTask.name.toLowerCase() === entryTask.toLowerCase()
  );
};

const indexNameToDo = (indexName) => {
  return ToDoList.findIndex(
    (nameTask) => nameTask.name.toLowerCase() === indexName.toLowerCase()
  );
};

const addTaskToDo = (nameTask, status, priority) => {
  const entryTask = entryInToDoList(nameTask);
  const statusIncludes = ToDoList.includes(status);
  const priorityIncludes = ToDoList.includes(priority);
  if (entryTask !== undefined && statusIncludes && priorityIncludes) {
    console.log(messages.alerts.alertEntryTask);
  } else {
    ToDoList.push({
      name: nameTask,
      status: status,
      priority: priority,
    });
    console.log(`${messages.alerts.alertAddedTask}\n\t${nameTask}`);
  }
};

const editStatusToDo = (nameTask, statusNew, priorityNew) => {
  const entryTask = entryInToDoList(nameTask);
  const indexToDo = indexNameToDo(nameTask);
  if (indexToDo < 0) {
    console.log(`${messages.errors.wrongEditTask}${nameTask} `);
    return null;
  }
  ToDoList[entryTask] = {
    name: nameTask,
    status: statusNew,
    priority: priorityNew,
  };
  ToDoList.splice(indexToDo, 1, ToDoList[entryTask]);
  console.log(`${messages.alerts.alertEditedTask}\t${nameTask}`);
};

const deleteTaskToDo = (nameTask) => {
  const indexToDo = indexNameToDo(nameTask);
  const entryTask = entryInToDoList(nameTask);
  if (indexToDo >= 0 && entryTask) {
    console.log(`${messages.alerts.alertDeletedTask}\n\t${nameTask}`);
    ToDoList.splice(indexToDo, 1);
  } else {
    console.log(`${messages.errors.wrongDeleteTask}${nameTask}`);
  }
};

const showTodoList = () => {
  for (const task in STATUS) {
    let check = true;
    console.log(`${STATUS[task]}`);

    ToDoList.filter((status) => status.status === STATUS[task]).map((task) => {
      if (task) {
        console.log(`\t${task.name}: ${task.priority} priority;`);
        check = false;
      }
    });

    if (check) {
      console.log(`\t -`);
    }
  }
};

addTaskToDo("test doing", STATUS.DONE, PRIORITY.HIGH);
showTodoList();
editStatusToDo("Swimming", STATUS.TO_DO, PRIORITY.HIGH);
showTodoList();
deleteTaskToDo("test doing");
showTodoList();
