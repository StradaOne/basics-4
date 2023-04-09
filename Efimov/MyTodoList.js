const ToDoList = {
	list: {

	}, 
	changeStatus(tasc, status){
		if((tasc in this.list)){
			this.list[tasc] = status;
		} else {
			console.log("no such task yet");
		}
	},

	addTask(tasc, status = "To do"){
		if(!(tasc in this.list)){
			this.list[tasc] = status;
		} else {
			console.log("task is already there");
		}
	},

	deleteTask(tasc){
		if((tasc in this.list)){
			delete this.list[tasc];
		} else{
			console.log("no such task yet");
		}
	},


	showList(){
		console.log("To do:");
		for(tasc in this.list){
			if(this.list[tasc] === "To do"){
				console.log(`    ${tasc}`);
			}
		}
		console.log("In progress:");
		for (tasc in this.list){
			if(this.list[tasc] === 'In progress'){
					console.log(`    ${tasc}`);
			}
		}
		console.log("Done:");
		for (tasc in this.list){
			if(this.list[tasc] === 'Done'){
					console.log(`    ${tasc}`);
			}
		}
	}
}

ToDoList.addTask('have a walk');
ToDoList.addTask('loved');
ToDoList.addTask('write a post');
ToDoList.addTask('wma');
ToDoList.deleteTask('have a walk');
ToDoList.changeStatus("write a post", "Done");
ToDoList.changeStatus("wma", "In progress");
ToDoList.showList();
