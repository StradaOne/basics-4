const toDoList = ['погулять с собакой', 'помыть машину', 'почитать', 'прогуляться']; // массив

let addTask = toDoList.push('постирать вещи'); // добавление задачи в конец массива
let deleteTask = toDoList.splice(1,1); // удаление задачи

for (const task of toDoList) {  // вывод 
    console.log(task);
}