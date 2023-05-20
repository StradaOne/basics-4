import { TaskController } from "./components/taskController.js";

const highForm = document.querySelector('.high-tasks-form');
const highTasksInput = document.querySelector('.high-tasks-input');
const lowTasksForm = document.querySelector('.low-tasks-form');
const lowTasksInput = document.querySelector('.low-tasks-input');

const taskController = new TaskController();

highForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const taskText = highTasksInput.value;
    const priority = "high";
    taskController.addTask(taskText, priority);
    highTasksInput.value = '';
});

lowTasksForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const taskText = lowTasksInput.value;
    const priority = "low";
    taskController.addTask(taskText, priority);
    lowTasksInput.value = '';
});

taskController.init();