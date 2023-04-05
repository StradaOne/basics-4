let tasks = ["Попить чай", "Английский", "Программирование", "Почистить зубы"];
const errorAdd = "Этот элемент уже в списке";
const errorDelete = "Такой задачи нет в списке";

function elemInArr(element, array) {
	for (let i = 0; i < array.length; i++) {
		if (array[i] === element) {
			return true
		}
	}
};
function addinendTask(name) {
	tasks.includes(name) ? console.log(errorAdd) : tasks.push(name);
};
function addinstartTask(name) {
	tasks.includes(name) ? console.log(errorAdd) : tasks.splice(0, 0, name);
};

function deleteTask(name) {
	if (elemInArr(name, tasks)) {
		for (let i = 0; i < tasks.length; i++) {
			if (tasks[i] == name) {
				tasks.splice(i, 1);
			}
		}
	} else {
		console.log(errorDelete);
	};
};

function showTasks() {
	console.log(tasks);
}

addinendTask("WTF1");
showTasks();
addinstartTask("WTF2");
showTasks();
addinendTask("WTF1");
deleteTask("Попить чай");
showTasks();
