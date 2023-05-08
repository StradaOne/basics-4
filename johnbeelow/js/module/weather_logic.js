import { UI_ELEMENTS, CLASS } from './ui_elements.js'

export function changeActiveButton(event) {
  const buttonClicked = event.target

  UI_ELEMENTS.BUTTONS_ALL.forEach((button) => {
    if (buttonClicked === button) {
      button.classList.add(CLASS.ACTIVE_BUTTON)
    }
    if (buttonClicked !== button) {
      button.classList.remove(CLASS.ACTIVE_BUTTON)
    }
  })

  changeTabView(buttonClicked)
}

export function changeTabView(buttonClicked) {
  const tabButton = buttonClicked.dataset.tab

  UI_ELEMENTS.TABS_WEATHER.forEach((element) => {
    const tab = element.dataset.tab
    if (tab === tabButton) {
      element.classList.remove(CLASS.INACTIVE_TAB)
      element.classList.add(CLASS.ACTIVE_TAB)
    }
    if (tab !== tabButton) {
      element.classList.remove(CLASS.ACTIVE_TAB)
      element.classList.add(CLASS.INACTIVE_TAB)
    }
  })
}
