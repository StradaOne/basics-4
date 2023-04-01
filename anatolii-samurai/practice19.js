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


function showList(){
  console.log("To do:");
  let i = 0;
  for (let key in list) {
    if(list[key] == "To do") {
    console.log(`\t ${key}`);  
      i++;}
    }
    if (i == 0) {
      console.log(`-`);
    }
    console.log("In progress:");
  let j = 0;
  for (let key in list) {
    if(list[key] == "In progress") {
    console.log(`\t ${key}`);  
      j++;}
    }
    if(j == 0){
      console.log(`-`);
    }

console.log("Done:");
  let k = 0;
  for (let key in list) {
    if(list[key] == "Done") {
    console.log(`\t ${key}`);  
      k++;
    }
    }
    if (k == 0){
      console.log(`-`);
    }
}

changeStatus("create a new practice task","Done");
addTask("have a walk","In progress"); // добавляет новую задачу
deleteTask("have a walk"); // удаляет зада
showList();


