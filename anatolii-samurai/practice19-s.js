const list = {
    "create a new practice task": "To do", 
      "make a bed": "To do", // задача "заправить кровать" в статусе "Готово"
      "write a post": "In progress",
  };
  
  function changeStatus(name,status){
      list[name] = status;
  }
  
  function addTask(name,status){
     list[name] = status;
  }
  
  function deleteTask(key) {
      delete list[key];
  }
  
  
  function showList() {
        console.log("To Do:");
        for (let key in list) {
            switch(list[key]){
                case "To do":
                    console.log(`\t ${key}`);
                    break;
                    default:
                console.log(`\t -`); 
                        break;  
            }
        }
        console.log("In progress:");
        for (let key in list) {
            switch(list[key]){
                case "In progress":
                    console.log(`\t ${key}`);
                    break;
                default:
                        console.log(`\t -`); 
                        break;  
                } 
            }
        
            console.log("Done:");
        for (let key in list) {
            switch(list[key]){
                case "Done":
                    console.log(`\t ${key}`);
                    break;
                default:
                        console.log(`\t -`); 
                        break;  
            }
        }
    }


    changeStatus("create a new practice task","Done");
  addTask("have a walk","In progress"); // добавляет новую задачу
  deleteTask("have a walk"); // удаляет задачу
  showList();  
 
  