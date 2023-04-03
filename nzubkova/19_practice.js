//Вам нужно реализовать список с задачами и четыре возможных действия с элементами этого списка: чтение, добавление, изменение, удаление.

//ADD NEW TASK (option 1)

const todolist = {
	"create a new practice task": "In Progress", 
	"make a bed": "Done",
	"write a post": "Done",
    "learn js": "To Do",
}

todolist["take a break"] = "In Progress"; //add new
console.log(todolist);


//ADD NEW TASK (option 2)


const todolist = {
	"create a new practice task": "In Progress", 
	"make a bed": "Done",  
	"write a post": "Done",
    "learn js": "To Do",
	addTask
}
function addTask(key, value) {  
}
todolist.addTask('NEW task', 'ASAP');//add new
console.log(todolist);


//UPDATE TASK

const todolist = {
	"create a new practice task": "In Progress", 
	"make a bed": "Done", // задача "заправить кровать" в статусе "Готово"
	"write a post": "Done",
    "learn js": "To Do",
}

todolist["learn js"] = "DONE"; //update
console.log(todolist);


//DELETE TASK


const todolist = {
	"create a new practice task": "In Progress", 
	"make a bed": "Done", // задача "заправить кровать" в статусе "Готово"
	"write a post": "Done",
    "learn js": "To Do",
}

delete todolist["learn js"]; //delete
console.log(todolist);


//SHOW ALL LIST


const todolist = {
	"create a new practice task": "In Progress", 
	"make a bed": "Done", // задача "заправить кровать" в статусе "Готово"
	"write a post": "Done",
    "learn js": "To Do",
}

function showList() {
} 
console.log(todolist); 

  