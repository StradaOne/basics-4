export const createTask = (task) => {
  const taskItem = document.createElement("li");
  const taskCheckBoxContainer = document.createElement("div");
  const taskName = document.createElement("span");
  const taskButtonDelete = document.createElement("button");
  const taskItemScreen = document.createElement("div");
  const data = document.createElement("div");

  taskItem.classList.add("todo__item");
  if (task.done) {
    taskItem.classList.add("checked");
  }

  taskCheckBoxContainer.classList.add("todo__check");
  taskButtonDelete.classList.add("todo__btn-delete-item");
  taskItemScreen.classList.add("todo__item-screen");
  data.classList.add("data");

  taskItem.setAttribute("id", task.id);
  taskName.textContent = task.name;
  data.textContent = task.data;

  taskItem.append(data);
  taskItem.append(taskCheckBoxContainer);
  taskItem.append(taskName);
  taskItem.append(taskButtonDelete);
  taskItem.append(taskItemScreen);

  return taskItem;
};
