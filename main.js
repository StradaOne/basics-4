
const toDoList = ['do houswork', 'do exercis', 'do building'];

let lastItem = toDoList.pop();
console.log(lastItem)
console.log(toDoList)

let itemsCount = toDoList.push('text messages')
console.log(toDoList)
console.log(itemsCount)

itemsCount = toDoList.shift();
console.log(itemsCount)
console.log(toDoList)

itemsCount = toDoList.unshift('new exersise')
console.log(itemsCount)
console.log(toDoList)

let newToDoList = toDoList.slice();
console.log(newToDoList === toDoList)
console.log(newToDoList)
console.log(toDoList)

let deleteItem = toDoList.splice(1, 1);
console.log(deleteItem)
console.log(toDoList)

toDoList.splice(1, 0, 'say hello')
console.log(toDoList)

for(let item of toDoList){
    console.log(item)
}
