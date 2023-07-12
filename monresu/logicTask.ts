export const statuses = {
  TODO: 'ToDo',
  DONE: 'Done',
}

export const priorities: Record<string, string> = {
  HIGH: 'high',
  LOW: 'low',
}

interface Task {
  name: string,
  priority: string,
  status: string
}

export const list: Task[] = [];

const isEmpty = (task: string) => { return !task.trim(); };

function isTaskExists(name: string): boolean {
  return list.map(t => t.name).indexOf(name) !== -1;
}

function indexOfTask(task: string): number {
  return list.findIndex(t => t.name === task);
}

function isStatusExists(status: string) {
  return Object.keys(statuses).includes(status);
}

/* Добавление задачи в массив */
export function addTask(taskName: string, status: string = statuses.TODO, priority: string = priorities.LOW) {
  try {
    if (isTaskExists(taskName)) {
      throw new Error('Такая задача уже есть!');
    }
    if (isEmpty(taskName)) {
      throw new Error('Вы пытаетесь добавить пустую задачу!');
    }
    const task = {
      name: taskName,
      status,
      priority
    };
    list.push(task);
  } catch(err: any) {
    if (err.name == 'Error') {
      console.log(err.message)
    }
  }
}

/* Удаление задачи из массива */
export function removeTask(task: string) {
  if (!isTaskExists(task)) {
    return;
  }
  const indexTask = indexOfTask(task);
  list.splice(indexTask, 1);
  return;
}

/* Изменение статуса задачи */
export function changeStatus(task: string, status: string) {
  if (!isTaskExists(task)) {
    console.log('Задачи нет и не было')
    return;
  }
  if (!isStatusExists(status)) {
    return;
  }
  const indexTask = indexOfTask(task);
  list[indexTask].status = status;
  return;
}
