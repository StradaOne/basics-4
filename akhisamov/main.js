let toDoList = ['проснуться', 'умыться', 'покушать', 'пойти на работу'];

toDoList.push('зайти в магазин');
toDoList.shift();

toDoList.splice(2, 1, 'Отдохнуть', 'Поспать');

for (const task of toDoList) {
    console.log(task);
}