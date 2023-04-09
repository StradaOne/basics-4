const list = [
    {name: "помыть кота", status: "To do"},
    {name: "Сдать ИГЭ по борьба", status: "Done"},
    {name: "побить кота", status: "In progress"}
];
const Todo = {Todo: "To do", Done: "Done", inProgress: "In progress"};

function addTask(name){
    list.push({name: name, status: "To do"});
}
function deleteTask(name){
    const findIndex = list.filter(user => user.name === name);
    list.splice(findIndex, 1);
}

function changeStatus(name, status){
    for(const user of list){
        if(user.name === name){
            user.status = status;
        }
    }
}

function showList(){
    function showListTask(status){
        const statuses = list.filter(user => user.status === status);
        console.log(`${status}:\t`);
        for(let user of statuses){
            console.log(`\t${user.name}`);
        }

    }
    showListTask("To do");
    showListTask("Done");
    showListTask("In progress");
}
showList();