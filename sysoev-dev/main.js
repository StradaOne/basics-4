import { UI_ELEMENTS } from './js/ui.js';
import { createItem } from './js/create.js';
import { showItemInList } from './js/show.js';

export const PRIORITIES = {
  LOW: 'low',
  HIGH: 'high',
};

function formsSubmitHandler(event) {
  event.preventDefault();
  const isLowForm = event.target === UI_ELEMENTS.FORM_LOW;
  const isHighForm = event.target === UI_ELEMENTS.FORM_HIGH;
  const inputLowValue = UI_ELEMENTS.INPUT_LOW.value;
  const inputHighValue = UI_ELEMENTS.INPUT_HIGH.value;

  if (isHighForm) {
    const item = createItem(inputHighValue);
    showItemInList(item, PRIORITIES.HIGH);
  }

  if (isLowForm) {
    const item = createItem(inputLowValue);
    showItemInList(item, PRIORITIES.LOW);
  }
  event.target.reset();
}

UI_ELEMENTS.TODO.addEventListener('submit', formsSubmitHandler);
