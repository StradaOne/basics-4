const STATUS = {
    TODO: "To Do",
    DONE: "Done",
    IN_PROGRESS: "In Progress"
};

const todoList = {
    "walking a dog": STATUS.TODO,
    "meditation": STATUS.TODO,
    "watch a film": STATUS.IN_PROGRESS
};

function addTask(name) {
    if (typeof name === "string") {
        todoList[name] = STATUS.TODO;
    } else {
        console.log("Введите задачу")
    };
};

function changeTask(name, status) {
    if (name in todoList) {
        todoList[name] = status;
    } else {
        console.log("Такой задачи нет в списке")
    };
};

function deleteTask(name) {
    if (name in todoList) {
        delete todoList[name];
    };
};


function defStatus(status) {
    if (!(todoList === null)) {
        let count = 0;
        let key;
        for (key in todoList) {
            if (todoList[key] === status) {
                switch (status) {
                    case STATUS.TODO:
                        console.log(`To Do: \n \t ${key}`);
                        break;
                    case STATUS.DONE:
                        console.log(`Done: \n \t ${key}`);
                        break;
                    case STATUS.IN_PROGRESS:
                        console.log(`In Progress: \n \t ${key}`);
                        break;
                };
                count++;
            };  
        };

        if (todoList[key] !== status && count === 0) {
            console.log(`${status}\n \t -`);
        };
    };
};


function showList() {
    defStatus(STATUS.DONE);
    defStatus(STATUS.TODO);
    defStatus(STATUS.IN_PROGRESS);


};

addTask("reading book");
addTask("Hello World")
changeTask("reading book", STATUS.TODO);
changeTask("Hello World", STATUS.IN_PROGRESS)
deleteTask("walking a dog");


showList();