const STATUSES = {
  TO_DO: "To do",
  IN_PROGRESS: "In progress",
  DONE: "Done",
};

const PRIORITIES = {
  HIGH: "High",
  MEDIUM: "Medium",
  LOW: "Low",
};

const ALERTS = {
  ADD_TASK: "Added the task:",
  DELETE_TASK: "Deleted the task:",
	CHANGE_STATUS: "Сhanged the status for the task:"
};

const ERRORS = {
	ADD_ERROR: "ERROR! Add a task name!",
	NO_SUCH_TASK_ERROR: "ERROR! There is no such task!",
	NO_SUCH_STATUS_ERROR: "ERROR! There is no such status! Available statuses: ",
	NO_SUCH_PRIORITY: "ERROR! There is no such priority! Available priorities: "
}

const toDo = [
  { name: "Clean up", status: STATUSES.TO_DO, priority: PRIORITIES.HIGH },
  { name: "Read", status: STATUSES.TO_DO, priority: PRIORITIES.HIGH },
  { name: "Watch a movie", status: STATUSES.IN_PROGRESS, priority: PRIORITIES.LOW },
  { name: "Sleep", status: STATUSES.DONE, priority: PRIORITIES.HIGH },
];

function addTask(task, priority) {
	if (task === false || typeof task === "number") {
		console.log(ERRORS.ADD_ERROR)
		return null
	} else {
		if (priority !== PRIORITIES.HIGH && priority !== PRIORITIES.MEDIUM && priority !== PRIORITIES.LOW ) {
			console.log(ERRORS.NO_SUCH_PRIORITY + ` ${PRIORITIES.HIGH}, ${PRIORITIES.MEDIUM}, ${PRIORITIES.LOW}.`)
		}
		toDo.push({ name: task, status: "To do", priority });
		console.log(ALERTS.ADD_TASK + ` "${task}".`);
	}
}

function changeStatus(task, status) {
	const taskIndex = toDo.findIndex((item) => item.name === task);
	if (taskIndex !== -1) {
		if (status !== STATUSES.TO_DO && status !== STATUSES.IN_PROGRESS && status !== STATUSES.DONE ) {
			console.log(ERRORS.NO_SUCH_STATUS_ERROR + ` ${STATUSES.TO_DO}, ${STATUSES.IN_PROGRESS}, ${STATUSES.DONE}.`)
		} else {
			toDo[taskIndex].status = status;
			console.log(ALERTS.CHANGE_STATUS + ` ${task}.`)
		}
	} else {
		console.log(ERRORS.NO_SUCH_TASK_ERROR)
		return null
	}
}

function deleteTask(task) {
  const taskIndex = toDo.findIndex((item) => item.name === task);
	if (taskIndex !== -1) {
		toDo.splice(taskIndex, 1);
		console.log(ALERTS.DELETE_TASK + ` "${task}".`);
	} else {
		console.log(ERRORS.NO_SUCH_TASK_ERROR)
		return null
	}
}

function showToDo() {
  console.log(`\n----- All To Do List -----\n`);

  let toDolist = "";
  let toDoStatus = "";
  let inProgressStatus = "";
  let doneStatus = "";

  for (const task of toDo) {
    if (task.status === "To do") {
      toDoStatus += `\t\t${task.name} - ${task.priority} priority\n`;
    }
    if (task.status === "In progress") {
      inProgressStatus += `\t\t${task.name} - ${task.priority} priority\n`;
    }
    if (task.status === "Done") {
      doneStatus += `\t\t${task.name} - ${task.priority} priority\n`;
    }
  }

	if (toDoStatus === "") {
		toDoStatus = "\t \t-\n";
	}
	if (inProgressStatus === "") {
		inProgressStatus = "\t \t-\n";
	}
	if (doneStatus === "") {
		doneStatus = "\t \t-\n";
	}

  toDolist = `To do:\n${toDoStatus}\nIn progress:\n${inProgressStatus}\nDone:\n${doneStatus}`;
  console.log(toDolist);
}

addTask(3, "High");
addTask('Have breakfast', "Low")
deleteTask("Read");
changeStatus("Watch a movie", 'Done')
changeStatus("Clean up", '')

showToDo();