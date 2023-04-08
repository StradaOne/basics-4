let toDoList = ["Пойти на работу", "Закрыть задачи по проектам", "Покушать"];

toDoList.push("Встретить жену после работы");

console.log(toDoList);

toDoList.shift();
console.log(toDoList);

for (let task of toDoList){
    console.log(task);
}