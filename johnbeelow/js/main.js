import { UI_ELEMENTS } from './module/ui_elements.js'
import { changeActiveButton } from './module/weather_config.js'
import { getWeatherData } from './module/waether_data.js'

for (let button of UI_ELEMENTS.BUTTONS_ALL) {
  button.addEventListener('click', changeActiveButton)
}

UI_ELEMENTS.INPUT_FORM.addEventListener('submit', (event) => {
  event.preventDefault()
  getWeatherData(UI_ELEMENTS.INPUT_TEXT.value)
  UI_ELEMENTS.INPUT_FORM.reset();
})

