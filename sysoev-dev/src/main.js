import { UI_ELEMENTS, createModal } from './js/ui';
function modalShow() {}

UI_ELEMENTS.btnSettings.addEventListener('click', () => {
  createModal('settings');
  console.log(typeof UI_ELEMENTS.btnSettings.name);
});
