// input
const inputBox = document.getElementById("input-box");
// list of tasks
const listContainer = document.getElementById("list-container");

function addTask() {
  if (inputBox.value === "") {
    alert("Please write something");
  } else {
    //creating tag li
    let li = document.createElement("li");
    li.innerHTML = inputBox.value;
    // show on display: appendChild()
    listContainer.appendChild(li);
    // creating cancel button
    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    li.appendChild(span);
  }

  inputBox.value = "";
  saveData()
}

// function for pressing ENTER to edd task
inputBox.addEventListener("keypress", function (event) {
  // If the key pressed is "Enter"
  if (event.keyCode === 13) {
    addTask();
  }
});

// DELETE OR MAKE CHECKED TASK 
listContainer.addEventListener("click", function (e) {
  if (e.target.tagName === "LI") {
    e.target.classList.toggle("checked");
    saveData()
  } else if (e.target.tagName === "SPAN") {
    e.target.parentElement.remove();
    saveData()
  }
}, false);

// SAVE TASKS DATA 
function saveData() {
  localStorage.setItem('data', listContainer.innerHTML)
}

// SHOW SAVED TASKS 
function showTask() {
  listContainer.innerHTML = localStorage.getItem('data')
}

showTask()