const PRIORITY = {
  LOW: 'low',
  HIGH: 'high',
}
  
const STATUS = {
  TODO: 'To Do',
  INPROGRESS: 'In Progress', 
  DONE: 'Done'
}
  
const list = [
  {name: 'create a post', status: 'In Progress', priority: 'low'},
  {name: 'test', status: 'Done', priority: 'high'},
]
  
function addTask (task) {
  list.push({'name': task})
}
  
function deleteTask (task) {
  let index = list.findIndex(item => item.name === task)
  list.splice(index, 1)
}
  
function changeStatus (task, status) {
  let index = list.findIndex(item => item.name === task)
  switch (status) {
    case STATUS.TODO: 
    list[index].status = STATUS.TODO
    break
    case STATUS.INPROGRESS: 
    list[index].status = STATUS.INPROGRESS
    break
    case STATUS.DONE: 
    list[index].status = STATUS.DONE
    break
  }
}

function changePriority (task, priority) {
  let index = list.findIndex(item => item.name === task)
  switch (priority) {
    case PRIORITY.LOW: 
    list[index].priority = PRIORITY.LOW
    break
    case PRIORITY.HIGH: 
    list[index].priority = PRIORITY.HIGH
    break
  }
}
 
function showList () {
  for (const status in STATUS) {

    console.log(`${STATUS[status]}:`)
    
    let arr = list.filter(element => 
      element.status === STATUS[status])
    
    arr.forEach(element => {
      console.log(`\t${element.name} (.Y.) ${element.priority}`)
    })
    
    if (!arr.length) console.log('\t -')
}   


}
  
  
addTask('123')
addTask('Do smth doable')

deleteTask('create a post')

changeStatus('Do smth doable', STATUS.TODO)
changeStatus('test', STATUS.DONE)
changeStatus('123', STATUS.DONE)
changeStatus('Do smth doable', STATUS.INPROGRESS)

changePriority('Do smth doable', PRIORITY.HIGH)
changePriority('123', PRIORITY.LOW)

showList()

// Проверки не делал, т.к. в ТЗ их не было
// Считаю что в этом скрипте выводить в консоль стоит только лист