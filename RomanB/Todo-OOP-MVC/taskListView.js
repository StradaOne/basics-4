
export class TaskListView {
    constructor() {
        this.tasksContainer = document.querySelector('.high-tasks-container');
        this.lowTasksContainer = document.querySelector('.low-tasks-container');
    }

    renderTasks(list) {
        this.tasksContainer.innerHTML = '';
        this.lowTasksContainer.innerHTML = '';

        list.forEach(task => {
            const taskElement = this.renderTask(task);
            if (task.priority === 'low') {
                this.lowTasksContainer.append(taskElement);
            } else {
                this.tasksContainer.append(taskElement);
            }
        });
    }

    renderTask(task) {
        const { title, id, isDone } = task;

        const taskWrapper = document.createElement('div');
        taskWrapper.classList.add('task-wrapper');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = id;
        checkbox.name = 'checkbox';
        checkbox.value = id;
        checkbox.checked = isDone;

        const label = document.createElement('label');
        label.htmlFor = id;

        const checkboxWrapper = document.createElement('span');
        checkboxWrapper.classList.add('checkbox-wrapper');

        const checkboxCustom = document.createElement('span');
        checkboxCustom.classList.add('checkbox-custom');

        const taskText = document.createElement('span');
        taskText.classList.add('task-text');
        taskText.textContent = title;

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete-button');
        deleteButton.textContent = 'X';
        deleteButton.dataset.taskId = id;

        label.appendChild(checkboxWrapper);
        checkboxWrapper.appendChild(checkboxCustom);
        label.appendChild(taskText);

        taskWrapper.appendChild(checkbox);
        taskWrapper.appendChild(label);
        taskWrapper.appendChild(deleteButton);

        if (isDone) {
            taskText.classList.add('text-through');
        }

        return taskWrapper;
    }
}