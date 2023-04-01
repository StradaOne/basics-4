const STATUS = {
  "In Progress": "In Progress",
  "To Do": "To Do",
  Done: "Done",
};
const list = {
  "create a new practice task": "In Progress",
  "make a bed": "Done",
  "write a post": "To Do",
};
function changeStatus(task, status) {
  if (task in list) list[task] = status;
}
function addTask(task) {
  list[task] = STATUS["In Progress"];
}
function deleteTask(task) {
  if (task in list) delete list[task];
}
function showTask(status) {
  let counter = 0;
  for (const task in list) {
    if (list[task] === status) {
      console.log(`\t${task}`);
      counter++;
    }
  }
  if (!counter) {
    console.log("\t-");
  }
}
function showStatus(status) {
  console.log(status + ":");
}
function showList() {
  showStatus(STATUS["To Do"]);
  showTask(STATUS["To Do"]);
  showStatus(STATUS["In Progress"]);
  showTask(STATUS["In Progress"]);
  showStatus(STATUS["Done"]);
  showTask(STATUS["Done"]);
}
addTask("tururu");
addTask("Clean the house");
changeStatus("write a post", STATUS["In Progress"]);
deleteTask("tururu");
changeStatus("Clean the house", STATUS["To Do"]);
showList();
