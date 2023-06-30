import { UI_ELEMENTS } from "./js/ui";

console.log(UI_ELEMENTS.SETTINGS_MODAL);

UI_ELEMENTS.BTN_SETTINGS.addEventListener("click", () => {
  UI_ELEMENTS.SETTINGS_MODAL.showModal();
});

UI_ELEMENTS.BTN_CLOSE_DIALOG.addEventListener("click", () => {
  UI_ELEMENTS.SETTINGS_MODAL.close();
});
