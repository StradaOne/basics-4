const list = [ 
	{name: 'create a post', status: 'In progress', priority: 'low'}, 
  {name: 'test', status: 'Done', priority: 'high'} 
];

const STATUSES = {
	TODO: 'To Do',
	IN_PROGRESS: "In progress",
	DONE: 'Done'
}

const PRIORITIES = {
	HIGH: 'high',
	MEDIUM: 'medium',
	LOW: 'low'
}

const ERRORS = {
	TASK_NOT_EXIST: `❌ ERROR: Task not found!\n`,
	STATUS_NOT_EXIST: '❌ ERROR: Invalid status!\n',
	INVALID_PRIORITY: '❌ ERROR: Invalid priority!\n',
}

const DEFAULT = {
	DEFAULT_PROIRITY: PRIORITIES.HIGH,
	DEFAULT_STATUS: STATUSES.TODO
}

function _isExist(value, obj) {
	return Object.values(obj).includes(value)
}

//* Вспомогательная функция для проверки наличия значения в объекте.

function _isStringEmpty(str) {
	return /^\s*$/.test(str);
}

//* Вспомогательная функция для проверки пустой строки.

function _getTaskIndex(task) {
	return list.findIndex(element => element.name === task)
}

//* Вспомогательная функция для получения индекса задачи в массиве.

function isStatusExist(newStatus) {

	if(!_isExist(newStatus, STATUSES)) {
		console.log(ERRORS.STATUS_NOT_EXIST)
		return null
	}

	return newStatus
}

//* Проверяет, существует ли заданный статус и возвращает его.
//* Если статус не существует, выводится сообщение об ошибке и возвращается null.

function isPriorityExist(newPriority) {

	if (!_isExist(newPriority, PRIORITIES)) {
		console.log(ERRORS.INVALID_PRIORITY)
		return null
	}

	return newPriority
}

//* Проверяет, существует ли заданный приоритет и возвращает его. 
//* Если приоритет не существует, выводится сообщение об ошибке и возвращается null.

function changeStatus(task, newStatus) {
	const taskIndex = _getTaskIndex(task)

	if (taskIndex !== -1) {
		if (_isExist(newStatus, STATUSES)) {
			list[taskIndex].status = isStatusExist(newStatus)
		} else {
			console.log(ERRORS.STATUS_NOT_EXIST)
		}
	} else {
		console.log(ERRORS.TASK_NOT_EXIST)
	}
}

//* Функция, которая изменяет статус задачи с указанным именем на переданный новый статус. 
//* Она использует вспомогательную функцию isStatusExist, чтобы проверить, существует ли 
//* переданный статус, и выводит сообщение об ошибке, если статус не существует.

function changePriority(task, newPriority) {
	const taskIndex = _getTaskIndex(task)

	if (taskIndex !== -1) {
		if(_isExist(newPriority, PRIORITIES)) {
			list[taskIndex].priority = isPriorityExist(newPriority)
		} else {
			console.log(ERRORS.INVALID_PRIORITY)
		}
	} else {
		console.log(ERRORS.TASK_NOT_EXIST)
	}
}

//* Функция, которая изменяет приоритет задачи с указанным именем на переданный новый приоритет. 
//* Она использует вспомогательную функцию isPriorityExist, чтобы проверить, существует ли 
//* переданный приоритет, и выводит сообщение об ошибке, если приоритет не существует.

function addTask(name, status = DEFAULT.DEFAULT_STATUS, priority = DEFAULT.DEFAULT_PROIRITY) {

	if (_isStringEmpty(name)) {
		console.log('The task name is empty.')
		return;
	}

	if (_isStringEmpty(status)) {
		console.log('The task status is empty.')
		return;
	}

	if (_isStringEmpty(priority)) {
		console.log('The task priority is empty.')
		return;
	}

	if (!_isExist(status, STATUSES)) {
		console.log(ERRORS.STATUS_NOT_EXIST)
		return;
	}

	if (!_isExist(priority, PRIORITIES)) {
		console.log(ERRORS.INVALID_PRIORITY)
		return;
	}

	const task = {name, status, priority}
	list.push(task)
}

//* Добавляет новую задачу в массив list с переданным именем, статусом и приоритетом. 
//* Если какой-либо из переданных параметров отсутствует или недействителен, выводится сообщение об ошибке.


function deleteTask(task) {
	const taskIndex = _getTaskIndex(task)

	if (taskIndex !== -1) {
		list.splice(taskIndex, 1)
	} else {
		console.log(ERRORS.TASK_NOT_EXIST)
	}
}

//* Удаляет задачу с переданным именем из массива list. 
//* Если задача с переданным именем не найдена, выводится сообщение об ошибке.

function showList() {
	for (const status in STATUSES) {
		const filterList = list.filter(element => element.status === STATUSES[status])

		if (filterList.length === 0) {
			console.log(`${STATUSES[status]}:\n\t-`)
		} else {
			console.log(`${STATUSES[status]}:`)
			const tasks = filterList
			.map(element => `\t${element.name}: ${element.priority} priority`)
			.join('\n')

			console.log(tasks)
		}
	}
}

//* Выводит список всех задач с их приоритетами, разбитый по статусам.


changeStatus('create a post', 'Done')
addTask('hello')
changePriority('hello', 'low')
addTask('play')
changeStatus('play', 'Done')
deleteTask('play')
showList()