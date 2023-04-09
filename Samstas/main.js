// to do на МАССИВАХ
const taskStatus = {
  TO_DO: "To Do",
  IN_PROGRESS: "In Progress",
  DONE: "Done",
};

const list = [
  { name: "workout 10 min", status: taskStatus.IN_PROGRESS },
  { name: "read book 15 min", status: taskStatus.DONE },
  { name: "meditation 5 min", status: taskStatus.TO_DO },
];

// function change STATUS OF TASK
function changeStatus(task, status) {
  const taskIndex = list.findIndex((prop) => prop.name === task);
  if (taskIndex !== -1) {
    list[taskIndex].status = status;
  } else {
    console.log(`В списке такой задачи нет: '${task}'`);
  }
}

// function ADD TASK
function addTask(task) {
  if (!task || typeof task === "number") {
    console.log(
      `Пожалуйста введите название задачи таким образом 'Name of task'`
    );
    return;
  }

  const foundTask = list.find((taskName) => taskName.name === task);
  if (foundTask) {
    console.log(`Задача '${task}' уже есть в списке дел`);
  } else {
    list.push({ name: task, status: taskStatus.TO_DO });
  }
}

// function DELETE TASK
function deleteTask(task) {
  const taskIndex = list.findIndex((item) => item.name === task);
  if (taskIndex !== -1) {
    list.splice(taskIndex, 1);
  } else {
    console.log(`Задачи с таким именем '${task}' нет в списке`);
  }
}

// function SHOW TASKS
function showList() {
  const tasksByStatus = {
    [taskStatus.TO_DO]: [],
    [taskStatus.IN_PROGRESS]: [],
    [taskStatus.DONE]: [],
  };

  for (const task of list) {
    const status = task.status;
    tasksByStatus[status].push(task.name);
  }

  for (const status in tasksByStatus) {
    if (tasksByStatus[status].length === 0) {
      tasksByStatus[status] = [`\t-`];
    } else {
      tasksByStatus[status] = tasksByStatus[status].map(
        (task) => `\t"${task}"\n`
      );
    }
    console.log(`${status}: \n${tasksByStatus[status].join("")}`);
  }
}

addTask("wash the dishes");
addTask("homework");
changeStatus("workout 10 min", taskStatus.DONE);
deleteTask("wash the dishes");
addTask(979);
showList();
