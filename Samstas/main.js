// create array
let toDoList = ["coding", "workout", "read"];

// create a new task
toDoList.unshift("morning stretch");
toDoList.push("meditation");
toDoList.splice(1, 0, "watch movie", "play games");

// delete task
toDoList.shift();
toDoList.pop();
toDoList.splice(1, 1);

//show tasks
for (const task of toDoList) {
  console.log(task);
}
