const task = {
    changeStatus(nameTask, status) {
        if (this[nameTask] !== status) {
            switch (status) {
                case "To Do":
                    this[nameTask] = status;
                    break;
                case "In Progress":
                    this[nameTask] = status;
                    break;
                case "Done":
                    this[nameTask] = status;
                    break;
                default:
                    console.log(
                        "Не верное значение статуса. Используйте: To Do, In Progress, Done"
                    );
            }
        } else {
            console.log("Данный статус уже установлен");
        }

    },
    addTask(nameTask) {
        this[nameTask] = "To Do";
    },
    deleteTask(nameTask) {
        for (key in this) {
            if (key === nameTask) {
                delete this[key];
            }
        }
    },
    showList() {
        let ToDo = "";
        let Progress = "";
        let Done = "";
        for (nameTask in this) {
            if (this[nameTask] == "To Do") {
                ToDo += "    " + nameTask + "\n";
            }
            if (this[nameTask] === "In Progress") {
                Progress += "    " + nameTask + "\n";
            }
            if (this[nameTask] === "Done") {
                Done += "    " + nameTask + "\n";
            }
        }
        if (ToDo.length < 1) {
            console.log("в Todo ничего нет");
        }
        else {
            console.log("Todo:\n" + ToDo);
        }
        console.log((Progress.length < 1) ? "в Progress ничего нет" : "Progress\n" + Progress);
        console.log(Done.length < 1 ? "в Done ничего нет": "Done:\n" + Done);



    },

}
task.addTask("create a new practice task");
task.addTask("make a bed");
task.addTask("write a post");
task.addTask("Побить кота");
task.changeStatus("create a new practice task", "Done");
task.changeStatus("make a bed", "In Progress");

task.deleteTask("write a post");
task.showList();

