import { PRIORITIES } from '../main.js';
import { UI_ELEMENTS } from './ui.js';

export function showItemInList(item, priority) {
  if (priority === PRIORITIES.HIGH) {
    UI_ELEMENTS.LIST_HIGH.append(item);
  } else if (priority === PRIORITIES.LOW) {
    UI_ELEMENTS.LIST_LOW.append(item);
  }
}
