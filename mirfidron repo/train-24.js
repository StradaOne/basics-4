let toDoList = ['почитать', 'помыть посуду', 'помыть машину', 'посадить цветы'];
toDoList.push("помыться")
toDoList.shift()
toDoList.splice(2,0,"погулять")
for (const task of toDoList) {
    console.log(task)
}