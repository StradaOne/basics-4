const todotask = "To Do";
const donetask = "Done";
const inprogress = "In progress";
const lowS = "low";
const highS = "high";

const list = [
  { name: "go to the gym", status: donetask, priority: lowS },
  { name: "Learn English", status: todotask, priority: highS },
  { name: "Home work", status: inprogress, priority: lowS },
];

function changeStatus(newname, newstatus) {
  if (
    newstatus === todotask ||
    newstatus === donetask ||
    newstatus === inprogress
  ) {
    let found = list.find((e) => e.name === newname);
    let foundIndex = list.findIndex((e) => e.name === newname);
    let oldPriority = list[foundIndex].priority;
    if (found) {
      list[foundIndex] = {name: newname, status: newstatus, priority: oldPriority};
    } else {
      console.log("Такой задачи нет в списке!");
    }
  } else {
    console.log("Введите корректный статус!");
  }
}

function addTask(newname, newstatus, newpriority) {
  let found = list.find((e) => e.name === newname);
  if (found && ( newstatus === todotask ||
    newstatus === donetask ||
    newstatus === inprogress) ) {
    console.log("Эта задача уже есть в списке!");
  } else {
    if (newpriority === lowS || newpriority === highS) {
        list.push({name: newname, status: newstatus, priority: newpriority});
    } else {
        console.log("Некорректная приоритетность");
    };
  }
}

function deleteTask(newname) {
    let found = list.find((e) => e.name === newname);
    let foundIndex = list.findIndex((e) => e.name === newname);
    if (found) {
        list.splice(foundIndex, 1);
    } else {
        console.log("Такой задачи нет в списке!");
    }
}
function showList() {
    console.log(list);
}


deleteTask("Learn English");
addTask("Watch blue lock", "Done", "low");
changeStatus("Watch blue lock", inprogress);
changeStatus("Home work", donetask);
showList();
deleteTask("cecla,cel");

