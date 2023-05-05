import { UI_ELEMENTS, createTag, CLASS_GENDER } from './module/ui_elements.js'
import { showGender, API_LOG } from './module/api_gender.js'

export function render(result, gender) {
  const resultSpan = createTag('span')
  resultSpan.classList.add(gender)

  if (gender === CLASS_GENDER.UNKOWN) {
    resultSpan.textContent = API_LOG.GENDER_IS_NOT
  }

  if (gender !== CLASS_GENDER.UNKOWN) {
    resultSpan.textContent = result
  }

  UI_ELEMENTS.RESULT_CONTAINER.innerHTML = ''
  UI_ELEMENTS.RESULT_CONTAINER.append(resultSpan)
}

UI_ELEMENTS.INPUT_FORM.addEventListener('submit', (event) => {
  event.preventDefault()
  showGender(UI_ELEMENTS.INPUT_TEXT.value)
  UI_ELEMENTS.INPUT_TEXT.value = ''
})
