const highPriorityTasks = [];

const lowPriorityTasks = [];

const form = document.querySelector("#addTask");
const input = document.querySelector("#taskName");
const input2 = document.querySelector("#taskName2");

class Task {
  constructor(name, priority) {
    this.name = name;
    this.priority = priority;
    this.completed = false;
  }

  toggleCompleted() {
    this.completed = !this.completed;
  }
}
addTask(
  "Вот вам и супер интересная тема. Вы наверняка заметили что ваши файлы с кодом становятся все объемнее, что хочется вынести некоторые вещи куда-то за пределы основной программы.",
  "high"
);
addTask("Сверстать этот TODO list.", "high");
addTask("Начать делать задачу", "high");
addTask("Посмотреть ютубчик", "low");

function addTask(name, priority) {
  try{
    const task = new Task(name, priority);

    if (priority === "high") {
      highPriorityTasks.push(task);
    } else {
      lowPriorityTasks.push(task);
    }
    renderTasks();
  } catch (error) {
    console.error("Error while creating task:", error)
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const priority = document.querySelector(
    'input[name="priority"]:checked'
  ).value;
  const taskName = input.value.trim();
  input.value = "";

  if (taskName) {
    addTask(taskName, priority);
  }
});

function renderTasks() {
  const highPriorityList = document.querySelector("#high-priority #tasks");
  const lowPriorityList = document.querySelector("#low-priority #tasks");

  highPriorityList.innerHTML = "";
  lowPriorityList.innerHTML = "";

  for (const task of highPriorityTasks) {
    const newTask = createTaskElement(task);
    highPriorityList.appendChild(newTask);
  }

  for (const task of lowPriorityTasks) {
    const newTask = createTaskElement(task);
    lowPriorityList.appendChild(newTask);
  }
}

function createTaskElement(task) {
  try {
    const newTask = document.createElement("div");
    newTask.setAttribute("id", "task");
    newTask.innerHTML = `
      <form action="">
        <label>
          <input type="checkbox" ${task.completed ? "checked" : ""}>
          <span class="checkmark"></span>
          <p>
            ${task.name}
          </p>
        </label>
        <button class="deleteButton">x</button>
      </form>
    `;

    const checkbox = newTask.querySelector('input[type="checkbox"]');
    const deleteButton = newTask.querySelector(".deleteButton");

    checkbox.addEventListener("change", () => {
      task.toggleCompleted();
      renderTasks();
    });

    deleteButton.addEventListener("click", () => {
      if (task.priority === "high") {
        const index = highPriorityTasks.indexOf(task);
        highPriorityTasks.splice(index, 1);
      } else {
        const index = lowPriorityTasks.indexOf(task);
        lowPriorityTasks.splice(index, 1);
      }

      renderTasks();
    });

    return newTask;
  } catch (error) {
    console.error("Error while creating task element:", error);
  }
}

document.addEventListener("DOMContentLoaded", function() {
  const input = document.querySelector("#taskName");
  const form = document.querySelector("#addTask");
  
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    try {
      const priority = "high";
      const taskName = input.value.trim();
      input.value = "";
      if (taskName) {
        addTask(taskName, priority);
      } else {
        throw new SyntaxError("Данные неполны: нет имени");
      }
    } catch (e) {
      alert( "JSON Error: " + e.message );
    }
  });
});
document.addEventListener("DOMContentLoaded", function() {
  const input2 = document.querySelector("#taskName2");
  const form2 = document.querySelector("#addTask2");
  
  form2.addEventListener("submit", (event) => {
    event.preventDefault();
    try {
      const priority = "low";
      const taskName = input2.value.trim();
      input2.value = "";
      if (taskName) {
        addTask(taskName, priority);
      } else {
        throw new SyntaxError("Данные неполны: нет имени");
      }
    } catch (e) {
      alert( "JSON Error: " + e.message );
    }
  });
});