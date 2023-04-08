const STATUS = {
  INPROGRESS: "In Progress",
  TODO: "To Do",
  DONE: "Done",
};
const PRIORITY = { LOW: "low", HIGH: "high" };
const list = [
  { name: "create a post", status: STATUS.INPROGRESS, priority: PRIORITY.LOW },
  { name: "test", status: STATUS.DONE, priority: PRIORITY.HIGH },
];
function changeStatus(task, status) {
  list.find((number) => {
    if (number.name === task) {
      number.status = status;
    }
  });
}
function addTask(task, priority) {
  if (!list.find((list) => list.name === task))
    list.push({ name: task, status: STATUS.INPROGRESS, priority: priority });
}
function deleteTask(task) {
  list.find((number) => {
    if (number.name === task) {
      list.splice(number, 1);
    }
  });
}
function showListWithStatus(status) {
  const filteredList = getListWithStatus(status);
  if (!filteredList.length) {
    console.log("\t-");
    return;
  }
  filteredList.forEach((list) =>
    console.log(`\t${list.name}\tpriority: ${list.priority}`)
  );
}
function showStatus(status) {
  console.log(status + ":");
}
function getListWithStatus(status) {
  return list.filter((list) => list.status === status);
}
function showList() {
  showStatus(STATUS.DONE);
  showListWithStatus(STATUS.DONE);
  showStatus(STATUS.INPROGRESS);
  showListWithStatus(STATUS.INPROGRESS);
  showStatus(STATUS.TODO);
  showListWithStatus(STATUS.TODO);
}

changeStatus(list[1].name, STATUS.INPROGRESS);
deleteTask(list[1].name);
addTask("lallala", PRIORITY.LOW);
changeStatus(list[1].name, STATUS.TODO);
addTask("lallala", PRIORITY.LOW);
showList();
