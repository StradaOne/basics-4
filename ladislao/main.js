const STATUS_TO_DO = {
    TO_DO: 'To Do',
    IN_PROGRESS: 'in progress',
    DONE: 'done',
};// отдельная константа с объектом для повторяющихся значений

const toDoList = {// хранилище   
    list: {
        "to create to do list": STATUS_TO_DO.TO_DO, // имч задачи - ключ объекта значения - статусы
        "to open VScode": STATUS_TO_DO.DONE,
        "to relax": STATUS_TO_DO.TO_DO,
    },


    changeStatus (task, status) {// изменение статуса
        if (task in this.list && status in STATUS_TO_DO ) {// проверка на то, находится ли изменяемая задача в листе, и существует ли статус
            this.list[task] = STATUS_TO_DO[status];
            console.log('Статус ' +`${status}` + ' для статуса ' + `${task}` + ' успешно изменен');
        } else {
            console.log('Error!!!');
        }
        
        
    },

    addTask (task, status) {// добавление элементов
        if (typeof task ==='string'){
        this.list[task] = STATUS_TO_DO[status];
        console.log('Задача ' + `${task}` + ' со статусом ' + `${status}` + ' успешно добавлена')
        } else {
            console.log("Error of types!")
        };
    },

    deleteTask(task) {// удаление элементов
        delete this.list[task];
        console.log('Задача ' + `${task}` + ' была удалена');
    },

    showList() {// чтение элементов
        for (task in this.list){
            switch(this.list[task]){ 
            case STATUS_TO_DO.DONE:
                console.log('Done: ' + `${task},\n`);
                break;
            case STATUS_TO_DO.TO_DO:
                console.log('To Do: ' + `${task},\n`);
                break;
            case STATUS_TO_DO.IN_PROGRESS:
                console.log('In progress: ' + `${task},\n`);
                break;  
            default:
                console.log("Wrong information!");
            
        };
    }; 
}
}

/* toDoList.addTask("to open VScode", "Done");
 toDoList.deleteTask("to relax");
toDoList.addTask("to work hard", "In progress");
*/ 
toDoList.changeStatus("to open VScode", 'DONE' );// меняем статус
toDoList.changeStatus("to wash sneakers", 'IN_PROGRESS');// пример того, что ошибка задания нет
toDoList.changeStatus('to open VScode', 'Ofcourse');// попытка добавления статуса невходящего в ту ду - ошибка
toDoList.addTask("2", "IN_PROGRESS" ); // сторока с цифрой возможна
toDoList.addTask("to sleep", "IN_PROGRESS");// добавление обычной задачи
toDoList.deleteTask("2");// удаляем задачу
toDoList.addTask("to create a task in progress", 'IN_PROGRESS');// еще одна задача в прогрессе
toDoList.showList(); // вывод ту ду