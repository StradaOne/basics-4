
const list = {
    "create a new practice task": "in progress",
    "make a bed": "done",
    "write a post": "to do",
    "read the text": "in progress",
    "write the fuction": "to do",
    "have the food": "done",
}

function changeStatus(task, status){
    if(task in list){
        list[task] = status;
        console.log("status task changed")
    } else {
        console.log("task undefined")
    }
}

function addTask(task){
    if(task in list){
        console.log("task exists")
    } else {
        list[task] = "to do";
        console.log("list changed")
    }
}

function deleteTask(task){
    if(task in list){
        delete list[task];
        console.log("task delete")
    } else {
        console.log("task undefined")
    }
}

changeStatus("have the food", "to do")
addTask("have a walk")
deleteTask("have the food")

function showTask(obj, status){
    if(Object.keys(obj).length === 0){
        switch (status){
            case ("Todo"): console.log('Nothing is Todo')
                break;
            case ("In Progress"): console.log("Nothing is progress")
                break;
            case ("done"): console.log("Nothing is done")
        }
    } else {
        for(const key in obj){
            console.log(key + ': ' + status)
        }
    }
}

function showList(){
    const todo = {};
    const progress = {};
    const doneTask = {};
    for(const key in list){
        if(list[key] === "to do"){
            todo[key] = "to do";
        }
        if(list[key] === "in progress"){
            progress[key] = "in progress";
        }
        if(list[key] === "done"){
            doneTask[key] = "done";
        }
    }
    showTask(todo, "Todo")
    console.log("")
    showTask(progress, "In Progress")
    console.log("")
    showTask(doneTask, "done")
}

showList()






