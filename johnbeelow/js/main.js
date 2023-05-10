import { UI_ELEMENTS } from './module/ui_elements.js'
import { changeActiveButton } from './module/weather_config.js'
import { render } from './module/weather_render.js'
import { checkInput } from './module/utils_input.js'
import { API, API_LOG } from './module/api.js'

for (let button of UI_ELEMENTS.BUTTONS_ALL) {
  button.addEventListener('click', changeActiveButton)
}

UI_ELEMENTS.INPUT_FORM.addEventListener('submit', (event) => {
  event.preventDefault()
  getWeatherData(UI_ELEMENTS.INPUT_TEXT.value)
  UI_ELEMENTS.INPUT_FORM.reset()
})

export function getWeatherData(city) {
  if (!checkInput(city)) return

  const url = `${API.URL_SERVER}?q=${city}&appid=${API.KEY}`
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`${API_LOG.SERVER_ERROR}: ${response.status}`)
      }
      return response.json()
    })
    .then((data) => render(data))
    .catch((error) => console.error(error))
}
