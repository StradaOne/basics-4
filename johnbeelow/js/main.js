import { UI_ELEMENTS } from './module/ui_elements.js'
import { changeActiveButton } from './module/weather_logic.js'

for (let button of UI_ELEMENTS.BUTTONS_ALL) {
  button.addEventListener('click', changeActiveButton)
}

