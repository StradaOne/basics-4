const TODO = 'To Do'
const IN_PROGRESS = "In Progress"
const DONE = 'Done'

//добавил строки в константу

const list = {
	"create a new practice task": TODO, 
	"make a bed": IN_PROGRESS,
	"write a post": DONE,
}

function changeStatus(task, newCondition) {
	if (!(task in list)) {
		console.log(`Задача '${task}' не найдена 🚫\n`)
		return
	}
	if (list[task] === newCondition) {
		console.log(`Новое состояние '${newCondition}' уже присвоено задаче '${task}' ⚠\n`);
		return;
	}
	list[task] = newCondition
}

//функция которая меняет статус задачи, также добавлена валидация на существоваение задачи, 
//и также если если мы пытаемся поменять один и тот же статус у задачи, то нам выдается ошибка

function addTask(newTask) {
	list[newTask] = TODO
}

//функция добавления задачи

function deleteTask(task) {
	if(task in list) {
		delete list[task]
	} else {
		console.log(`Задачи '${task}' не существует 🚫\n`)
	}
}

function showList(list) {
	const statuses = [TODO, IN_PROGRESS, DONE];

	for (const status of statuses) {
		let hasTasks = false;

		console.log(`${status}:`);
		for (const task in list) {
			if (list[task] === status) {
				console.log(`\t${task}`);
				hasTasks = true;
			}
		}

		if (!hasTasks) {
			console.log('\t-');
		}
	}

	return null;
}




changeStatus("create a new practice task", "In Progress")
changeStatus("make a bed", "In Progress")
addTask('hello my name')
deleteTask("make a bedв")
deleteTask("write a post")
showList(list)