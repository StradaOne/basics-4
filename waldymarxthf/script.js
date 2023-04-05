let toDoList = ['почитать', 'помыть посуду', 'помыть машину', 'посадить цветы', 'посадить жизнь'];

toDoList.push('покушать')
toDoList.shift()
toDoList.splice((Math.round(toDoList.length / 2) - 1), 1)

for (const task of toDoList) {
	console.log(task)
}