import { TaskListView } from "./taskListView.js";
import { TaskModel } from "./taskModel.js";

export class TaskController {
    constructor() {
        this.taskListView = new TaskListView();
        this.taskModel = new TaskModel();
    }

    init() {
        this.renderTasks();
    }

    renderTasks() {
        const list = this.taskModel.getList();
        this.taskListView.renderTasks(list);
        this.attachEventHandlers();
    }

    attachEventHandlers() {
        const checkboxes = document.querySelectorAll('.task-wrapper input[type="checkbox"]');
        const deleteButtons = document.querySelectorAll('.task-wrapper .delete-button');

        checkboxes.forEach((checkbox) => {
            checkbox.addEventListener('change', (e) => {
                const taskId = e.target.value;
                this.taskModel.changeStatus(taskId);
                this.renderTasks();
            });
        });

        deleteButtons.forEach((deleteButton) => {
            deleteButton.addEventListener('click', (e) => {
                const taskId = e.target.dataset.taskId;
                this.taskModel.deleteTask(taskId);
                this.renderTasks();
            });
        });
    }

    addTask(title, priority) {
        this.taskModel.addTask(title, priority);
        this.renderTasks();
    }
}