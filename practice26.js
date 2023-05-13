const STATUS = {
    INPROGRESS:'In progress',
    DONE:'Done',
    TODO:'To do'
};

const PRIORITY = {
    HIGH:'high',
    MIDDLE:'middle',
    LOW:'low'
};

const morningToDoList = [
      
];

    function addTask(name,status,priority){
       
        morningToDoList.push({name:name, status:status,priority:priority});
        
    }
    
    function changeStatus(name,status){
       for (let char of morningToDoList){
            if (char.name === name){
                char.status = status;
            }
       }

    }
    function changePriority(name,priority){
        for (let char of morningToDoList){
             if (char.name === name){
                 char.priority = priority;
             }
        }
 
     }

    function deleteTask(name){
        const indexName = morningToDoList.findIndex(item => item.name === name);
            morningToDoList.splice(indexName,1);
    }
   
    function showList(){
    function showListTasks(status){
        const sortStatus = morningToDoList.filter(task => task.status === status);
     
        //  , sortStatus);
        console.log(`${status}:\t`)
        for (let task of sortStatus) {
            
                console.log(`\t${task.name} - ${task.priority}`);
            
        }
    }
    showListTasks('Done');
    showListTasks('To do');
    showListTasks('In progress');
}
    addTask('сделать ToDo',STATUS.DONE,PRIORITY.LOW);
    addTask('использовать методы массивов',STATUS.TODO,PRIORITY.LOW);
    addTask('понять как использовать методы',STATUS.TODO,PRIORITY.LOW);
    addTask('сделать проверку',STATUS.TODO,PRIORITY.LOW);
    deleteTask('сделать проверку'); 
    changeStatus('понять как использовать методы',STATUS.INPROGRESS);
    changePriority('понять как использовать методы',PRIORITY.LOW);
    console.log(morningToDoList); 
    showList(); 

       
        











