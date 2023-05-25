import { createTag, UI_ELEMENTS } from './module/ui_elements.js'
import {
  STATUS,
  PRIORITY,
  toDoList,
  addTask,
  changeStatus,
  deleteTask,
} from './module/todo_program.js'

function constructorTaskUi(name, status, priority) {
  const containerTask = createTag('div')
  const labelTask = createTag('label')
  const statusTask = createTag('input')
  const textTask = createTag('span')
  const deleteTaskButton = createTag('button')

  containerTask.classList.add('task')
  statusTask.classList.add('checkbox')
  statusTask.type = 'checkbox'
  textTask.classList.add('task_text')
  textTask.textContent = name
  deleteTaskButton.classList.add('button_close_task')
  deleteTaskButton.textContent = '×'

  priority.appendChild(containerTask)
  containerTask.appendChild(labelTask)
  labelTask.appendChild(statusTask)
  labelTask.appendChild(textTask)
  containerTask.appendChild(deleteTaskButton)

  if (status === STATUS.DONE) {
    statusTask.setAttribute('checked', true)
    render()
  }

  deleteTaskButton.addEventListener('click', () => {
    deleteTask(name)
    render()
  })

  statusTask.addEventListener('change', () => {
    status = statusTask.checked 
    try {
      changeStatus(name, status)
    } catch (error) {
      console.error('Извините, возникла ошибка в смене статуса:', error.stack);
    }
  })
}

function render() {
  UI_ELEMENTS.PRIORITY_HIGH.innerHTML = ''
  UI_ELEMENTS.PRIORITY_LOW.innerHTML = ''

  for (let taskFind of toDoList) {
    if (taskFind.priority === PRIORITY.HIGH) {
      constructorTaskUi(
        taskFind.name,
        taskFind.status,
        UI_ELEMENTS.PRIORITY_HIGH
      )
    }

    if (taskFind.priority === PRIORITY.LOW) {
      constructorTaskUi(
        taskFind.name,
        taskFind.status,
        UI_ELEMENTS.PRIORITY_LOW
      )
    }
  }
}

UI_ELEMENTS.INPUT_FORM_HIGHT.addEventListener('submit', (event) => {
  event.preventDefault()
  addTask(UI_ELEMENTS.INPUT_TEXT_HIGH.value, STATUS.IN_PROGRESS, PRIORITY.HIGH)
  render()
})

UI_ELEMENTS.INPUT_FORM_LOW.addEventListener('submit', (event) => {
  event.preventDefault()
  addTask(UI_ELEMENTS.INPUT_TEXT_LOW.value, STATUS.IN_PROGRESS, PRIORITY.LOW)
  render()
})
