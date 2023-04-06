let toDoArray = ["task1", "task2", "task3", "task4"];
let taskCount = toDoArray.length;
toDoArray[1] = "task99";
toDoArray.push = "task444";
console.log(toDoArray);

for (let task of toDoArray) {
  console.log(task);
}

let toDoArray1 = Array.of("task11", "task22", "task33", "task44");
const firstTask = toDoArray1[0];
const lastTaskD = toDoArray1.pop();
console.log(toDoArray1);

toDoArray1.splice(2, 2, "task69", "task70");
console.log(toDoArray1);

let toDoArray2 = new Array("task111", "task222", "task333", "task444");
const lastTask = toDoArray2[toDoArray2.length - 1];
toDoArray2.unshift = "task000";
const firstTaskD = toDoArray2.shift();

console.log(toDoArray2);

let secondThirdTasks = toDoArray2.splice(1, 2);
console.log(secondThirdTasks);
