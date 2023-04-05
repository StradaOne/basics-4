const tasks = ["почитать", "помыть посуду", "помыть машину"];

const addTask = (arr, name) => {
  if (!name || name.trim() === "") {
    console.log("Имя задачи не может быть пустым.");
    return;
  }
  arr.push(name);

  console.log(`Задача "${name}" добавлена`);
};

const renameTask = (arr, name, reName) => {
  if (arr.indexOf(name) === -1) {
    console.log(
      `Задача которую вы хотите изменить, не найдена. 
Задача с именем "${reName}" будет добавлена в список задач без изменения старой задачи.`
    );
    addTask(arr, reName);
    return;
  }

  const index = arr.indexOf(name);

  arr.splice(index, 1, reName);

  console.log(`Задача "${name}" изменена на "${reName}"`);
};

const showAllTasks = (arr) => {
  for (const task of arr) {
    console.log(`//\t${task}`);
  }
};

const deleteTask = (arr, name) => {
  const index = arr.indexOf(name);
  if (index === -1)
    return `Задачи с именем "${name}" не существует. Или вы указали пустое значение`;

  arr.splice(index, 1);

  console.log(`Задача "${name}" удалена`);
};

addTask(tasks, "");
renameTask(tasks, "помыть машин", "погулять с собакой");
showAllTasks(tasks);
deleteTask(tasks, "помыть машину");
showAllTasks(tasks);
