import { UI_ELEMENTS } from "./module/ui_elements.js"

function constructorTaskUi(textInput, priorityTask) {
  const containerTask = document.createElement('div')
  const labelTask = document.createElement('label')
  const checkboxTask = document.createElement('input')
  const textTask = document.createElement('span')
  const closeTask = document.createElement('div')

  containerTask.setAttribute('class', 'task')
  checkboxTask.setAttribute('class', 'checkbox')
  checkboxTask.setAttribute('type', 'checkbox')
  textTask.setAttribute('class', 'task_text')
  textTask.textContent = textInput
  closeTask.setAttribute('class', 'button_close_task')
  closeTask.textContent = '×'

  priorityTask.appendChild(containerTask)
  containerTask.appendChild(labelTask)
  labelTask.appendChild(checkboxTask)
  labelTask.appendChild(textTask)
  containerTask.appendChild(closeTask)
}

UI_ELEMENTS.INPUT_FORM_HIGHT.addEventListener('submit', function (event) {
  event.preventDefault()
  constructorTaskUi(UI_ELEMENTS.INPUT_TEXT_HIGH.value, UI_ELEMENTS.PRIORITY_HIGH)
})

UI_ELEMENTS.INPUT_FORM_LOW.addEventListener('submit', function (event) {
  event.preventDefault()
  constructorTaskUi(UI_ELEMENTS.INPUT_TEXT_LOW.value, UI_ELEMENTS.PRIORITY_LOW)
})
