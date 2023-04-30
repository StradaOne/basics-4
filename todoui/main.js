let idNewDiv = 0;
function createInput(type, value, classInput) {
  const newInput = document.createElement("input");
  newInput.type = type;
  if (classInput != "") newInput.className = classInput;
  if (value != "") newInput.value = value;
  return newInput;
}
function addTask(classWriteTask, idNewDiv) {
  const parent = document.querySelector(classWriteTask);
  const newDiv = document.createElement("div");
  const checkBox = createInput("checkbox", "", "");
  const btnDelete = createInput("button", "x", "task");
  const newTask = createInput(
    "text",
    parent.firstElementChild.value,
    "textTask task"
  );
  newDiv.classList.add("addDiv");

  newDiv.id = idNewDiv;
  idNewDiv++;
  parent.insertAdjacentElement("afterend", newDiv);
  newDiv.insertAdjacentElement("afterbegin", checkBox);
  newDiv.insertAdjacentElement("beforeend", newTask);
  newDiv.insertAdjacentElement("beforeend", btnDelete);
  defaultTask(parent.firstElementChild.id);
  btnDelete.addEventListener("click", () => {
    deleteTask(newDiv.id);
  });
}
function deleteTask(id) {
  const element = document.getElementById(id);
  element.remove();
}
function defaultTask(idTask) {
  const task = document.getElementById(idTask);
  task.value = "";
}
const btnAddHighTask = document.getElementById("addHighTask");
btnAddHighTask.addEventListener("click", () => {
  addTask(".highDiv", idNewDiv);
});
const btnAddLowTask = document.getElementById("addLowTask");
btnAddLowTask.addEventListener("click", () => {
  addTask(".lowDiv", idNewDiv);
});
document
  .getElementById("highForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    addTask(".highDiv", idNewDiv);
  });
document.getElementById("lowForm").addEventListener("submit", function (event) {
  event.preventDefault();
  addTask(".lowDiv", idNewDiv);
});
