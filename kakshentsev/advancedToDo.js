const progress = "In Progress";
const done = "Done";
const toDo = "To Do";
const invalidData = "We ask you to enter valid data";
const statuses = [progress, done, toDo];
const priorities = ["low", "mid", "high"];

const list = [
  {
    task: "create a new practice task",
    status: progress,
    priority: "low",
  },
  { task: "make a bed", status: progress, priority: "low" },
  { task: "write a post", status: progress, priority: "high" },
];

function checkStatus(status) {
  if (statuses.includes(status)) return true;
  return false;
}

function checkPriority(prioritiy) {
  if (priorities.includes(prioritiy)) return true;
  return false;
}

function checkData(status, prioritiy) {
  if (checkStatus(status) && checkPriority(prioritiy)) {
    return true;
  }
  return false;
}

function addTask(task, status, priority) {
  if (checkData(status, priority)) {
    list.push({
      task: task,
      status: status,
      priority: priority,
    });
    return true;
  }
  console.log(invalidData);
  return false;
}

function changeStatus(task, status) {
  if (!checkStatus) return null;

  let newTask = list.findIndex((name) => name.task === task);
  if (newTask) {
    list[newTask].status = status;
    return true;
  } else {
    console.log(invalidData);
    return false;
  }
}

function deleteTask(task) {
  let completedTask = list.findIndex((name) => name.task === task);
  if (completedTask !== -1) {
    list.splice(completedTask, 1);
    return true;
  }
  console.log(invalidData);
  return false;
}

function showList() {
  const highPriority = list.filter((name) => name.priority === "high");
  if (highPriority !== -1) {
    console.log("Rather, do them:");
    highPriority.forEach((name) => console.log(name.task));
  } else {
    console.log("No urgent tasks");
  }
  console.log();

  const midPriority = list.filter((name) => name.priority === "mid");
  if (midPriority !== -1) {
    console.log("Tasks you need to complete:");
    midPriority.forEach((name) => console.log(name.task));
  } else {
    console.log("You have already completed all non-urgent tasks");
  }
  console.log();

  const lowPriority = list.filter((name) => name.priority === "low");
  if (lowPriority !== -1) {
    console.log("Don't forget about them:");
    lowPriority.forEach((name) => console.log(name.task));
  } else {
    console.log("You don't have simple tasks");
  }
  console.log();
}

deleteTask("some task");
showList();
