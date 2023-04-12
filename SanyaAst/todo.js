const defaultPriority = {
    LOW : 'low',
    MEDIUM : 'medium',
    HIGH : 'high'
};

const defaultStatus = {
    TO_DO :'To Do',
    IN_PROGRESS : 'In progress',
    DONE : 'Done'
};

const list = [ 
	{name: 'create a post', status: 'In progress', priority: 'low'}, 
    {name: 'test', status: 'Done', priority: 'high'},
    {name: 'sleep', status: 'To Do', priority: 'medium'},
];

function checkList (task) {
    return list.findIndex(item => item.name == task ) 
};

function addTask (task) {
    if (checkList(task) == -1) {
        list.push({
            name: task,
            status: defaultStatus.TO_DO,
            priority: defaultPriority.LOW
        })
    } else {
        console.log('task already added');
    }
};

function deleteTask (task) {
    if (checkList(task) !== -1) {
        return list.splice(matchCheck(task), 1);
    } else {
        console.log('task has been deleted');
    }
};

function changeStatus(task, newStatus) {
    if (checkList(task) !== -1) {
        return list[checkList(task)].status = newStatus;
    } else {
        console.log('no have task')
    }
};

function changePriority(task, newPriority) {
    if (checkList(task) !== -1) {
        return list[checkList(task)].priority = newPriority;
    } else {
        console.log('no have task')
    }
};

function showList () {
    console.log('To Do:')
    list.forEach(item => {
        if (item.status == defaultStatus.TO_DO) {
            console.log(`\t-${item.name} приоритет ${item.priority}`);
        }
    });
    console.log('In progress:')
    list.forEach(item => {
        if (item.status == defaultStatus.IN_PROGRESS) {
            console.log(`\t-${item.name} приоритет ${item.priority}`);
        }
    });
    console.log('Done:')
    list.forEach(item => {
        if (item.status == defaultStatus.DONE) {
            console.log(`\t-${item.name} приоритет ${item.priority}`);
        }
    });

}

changeStatus('create a post', 'Done')
changePriority('create a post', 'high')
addTask('помыться')
showList();