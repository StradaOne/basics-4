import UI_ELEMENTS from "./module/ui_elements";
import renderDate from "./module/ui_renders";

UI_ELEMENTS.INPUT_FORM.addEventListener('submit', (event) => {
  event.preventDefault()
  renderDate(UI_ELEMENTS.INPUT_DATE.value)
})