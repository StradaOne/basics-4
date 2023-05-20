const DUPLICATE_TASK_TEXT = `Такая задача уже существует`;

function generateId() {
    return "id" + Math.random().toString(16).slice(2);
}

export class TaskModel {
    constructor() {
        this.list = [
            {
                id: generateId(),
                title: "create a new practice task",
                isDone: false,
                priority: "high",
            },
            {
                id: generateId(),
                title: "go to the training",
                isDone: false,
                priority: "low",
            },
            {
                id: generateId(),
                title: "do some exercises",
                isDone: false,
                priority: "high",
            },
            {
                id: generateId(),
                title: "write a post",
                isDone: true,
                priority: "low",
            },
        ]
    }

    getList() {
        return this.list;
    }

    changeStatus(taskId) {
        const task = this.list.find(item => item.id === taskId);
        if (task) {
            task.isDone = !task.isDone;
        }
    }

    addTask(title, priority) {
        const isDuplicate = this.list.find(item => item.title.toLowerCase() === title.trim().toLowerCase());
        if (isDuplicate) {
            return;
        }

        this.list.push({
            id: generateId(),
            title,
            isDone: false,
            priority
        });
    }

    deleteTask(taskId) {
        const taskIndex = this.list.findIndex(item => item.id === taskId);
        if (taskIndex !== -1) {
            this.list.splice(taskIndex, 1);
        }
    }
}