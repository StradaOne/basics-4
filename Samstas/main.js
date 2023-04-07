const taskStatus = {
  TO_DO: "To Do",
  IN_PROGRESS: "In Progress",
  DONE: "Done",
};

const list = {
  "workout 10 min": taskStatus.IN_PROGRESS,
  "read book 15 min": taskStatus.DONE,
  "meditation 5 min": taskStatus.TO_DO,
};

function changeStatus(task, status) {
  task in list
    ? (list[task] = status)
    : console.log(`В списке такой задачи нет: '${task}'`);
}

function addTask(task) {
  if (!task || typeof task === "number") {
    console.log(
      'Пожалуйста, введите название задачи таким образом - "убрать дома"'
    );
    return;
  }

  task in list
    ? console.log(`Задача '${task}' уже есть в списке дел`)
    : (list[task] = taskStatus.TO_DO);
}

function deleteTask(task) {
  task in list
    ? delete list[task]
    : console.log(`Задачи с таким именем  ${task} нет в списке`);
}

function showList() {
  const tasksByStatus = {
    [taskStatus.TO_DO]: "",
    [taskStatus.IN_PROGRESS]: "",
    [taskStatus.DONE]: "",
  };

  for (const task in list) {
    const status = list[task];
    tasksByStatus[status] += `\t"${task}"\n`;
  }

  for (const status in tasksByStatus) {
    if (tasksByStatus[status] === "") {
      tasksByStatus[status] = `\t-`;
    }
    console.log(`${status}: \n${tasksByStatus[status]}`);
  }
}

addTask("wash the dishes");
addTask("homework");
changeStatus("workout 10 min", taskStatus.DONE);
deleteTask("wash the dishes");
addTask(979);
showList();
