const submitBtn = document.getElementById("submit-button");
const listContainer = document.getElementById("list-container");
const inputBox = document.getElementById("input-box");

function addTask() {
  if (inputBox.value.trim() === "") {
    return false;
  } else {
    // создаю элемент ли с классом
    let li = document.createElement("li");
    li.classList.add("task-item");
    // создание чекбокса и класс
    let checkbox = document.createElement("input");
    checkbox.classList.add("checkbox");
    checkbox.setAttribute("type", "checkbox");
    // отрисовать чекбокс в html на экране
    li.appendChild(checkbox);
    // создание текста "p" с классом, и атрибут type='text'
    let p = document.createElement("p");
    p.classList.add("task-content");
    p.innerText = inputBox.value;
    // отрисовать текст 'p' в html на экране
    li.appendChild(p);
    // создание иконки для удаления
    let deleteIcon = document.createElement("i");
    deleteIcon.classList.add("fa-solid", "fa-xmark");
    // отрисовать иконку в html на экране
    li.appendChild(deleteIcon);

    listContainer.appendChild(li);
  }
  inputBox.value = "";
}

inputBox.addEventListener("keypress", function (event) {
  // If the key pressed is "Enter"
  if (event.keyCode === 13) {
    addTask();
  }
});
