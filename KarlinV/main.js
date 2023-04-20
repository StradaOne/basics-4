const STATUS = {
  WAITING: "Waiting",
  IN_PROGRESS: "In Progress",
  DONE: "Done",
};

const PRIORITY = {
  LOW: "low",
  MEDIUM: "medium",
  HIGH: "high",
};

const tasks = [
  {
    name: "Приготовить завтрак/обед/ужин",
    status: STATUS.DONE,
    priority: PRIORITY.LOW,
  },
  {
    name: "Выполнить уборку в комнате/квартире",
    status: STATUS.DONE,
    priority: PRIORITY.HIGH,
  },
  {
    name: "Почитать книгу/посмотреть фильм",
    status: STATUS.DONE,
    priority: PRIORITY.MEDIUM,
  },
  {
    name: "Погулять на свежем воздухе",
    status: STATUS.DONE,
    priority: PRIORITY.MEDIUM,
  },
  {
    name: "Выучить несколько новых слов или фраз на английском языке",
    status: STATUS.DONE,
    priority: PRIORITY.MEDIUM,
  },
  {
    name: "Сделать зарядку или небольшую тренировку",
    status: STATUS.IN_PROGRESS,
    priority: PRIORITY.LOW,
  },
  {
    name: "Написать список задач на завтра",
    status: STATUS.WAITING,
    priority: PRIORITY.HIGH,
  },
];

const checkingValues = (data, value) => {
  let result = "";

  if (Array.isArray(data)) {
    result = data.some((task) => task.name === value);
  } else {
    result = Object.values(data).includes(value);
  }

  return result;
};

const addTask = (name, priority = PRIORITY.LOW) => {
  if (!name.trim()) {
    console.error("Некорректный ввод");
    return;
  }

  if (checkingValues(tasks, name)) {
    console.error(`Задача "${name}" уже существует`);
    return;
  }

  const task = {
    name: name,
    status: STATUS.WAITING,
    priority: checkingValues(PRIORITY, priority) ? priority : PRIORITY.LOW,
  };
  tasks.push(task);
  console.log(`Задача "${name}" успешно добавлена`);
};

const deleteTask = (name) => {
  if (!checkingValues(tasks, name)) {
    console.error(`Задачи "${name}" не существует`);
    return;
  } 
  
  const index = tasks.findIndex((task) => task.name === name);
  tasks.splice(index, 1);
  console.log(`Задача "${name}" успешно удалена`);  
};

const changeStatus = (name, status) => {
  if (!checkingValues(tasks, name)) {
    console.error(`Задачи "${name}" не существует`);
    return;
  }

  if (!checkingValues(STATUS, status)) {
    console.error(`Такого значения не существует`);
    return;
  }

  const task = tasks.find((task) => task.name === name);
  task.status = status;
  console.log(`Статус задачи "${name}" изменен на "${status}"`);
};

const changePriority = (name, priority) => {
  if (!checkingValues(tasks, name)) {
    console.error(`Задача "${name}" не существует`);
    return;
  }

  if (!checkingValues(PRIORITY, priority)) {
    console.error(`Такого значения не существует`);
    return;
  }

  const task = tasks.find((task) => task.name === name);
  task.priority = priority;
  console.log(`Приоритет задачи "${name}" изменен на "${priority}"`);
};

const filteringTask = (arr, options) => {
  const newArr = [...arr];
  const filteredArr = newArr.filter((item) => item.status === options.value);
  return sortingByPriority(filteredArr, options.reverse);
};

const sortingByPriority = (arr, reverse = false) => {
  const newArr = [...arr];
  const sortedArr = newArr.sort((a, b) => {
    if (a.priority === b.priority) {
      return 0;
    } else if (a.priority === PRIORITY.HIGH) {
      return reverse ? 1 : -1;
    } else if (a.priority === PRIORITY.MEDIUM) {
      if (b.priority === PRIORITY.HIGH) {
        return reverse ? -1 : 1;
      } else if (b.priority === PRIORITY.LOW) {
        return reverse ? 1 : -1;
      } else {
        return -1;
      }
    } else {
      return reverse ? -1 : 1;
    }
  });

  return sortedArr;
};

const showListTasks = (reverse = false) => {
  Object.values(STATUS).forEach((value) => {
    console.log(value);
    filteringTask(tasks, { value: value, reverse: reverse }).forEach((task) => {
      console.log(`\t${task.name}\t\t${task.priority}`);
    });
    console.log(`\r`);
  });
};

deleteTask("Написать список задач на завтр");
addTask("Купить продукты для завтрака", "high");
addTask("Купить продукты для завтрака");
changePriority("Купить продукты для завтрака", "low");

// Если в функцию showListTasks() передать параметр true
// список будет отсортирован от не срочного к срочному
// по умолчанию сортируется от срочного к не срочному
showListTasks(true);
