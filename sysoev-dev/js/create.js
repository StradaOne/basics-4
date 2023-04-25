import { UI_ELEMENTS } from './ui.js';

export function createItem(taskText) {
  const item = document.createElement('li');
  item.classList.add('todo__item');
  item.append(UI_ELEMENTS.TEMPLATE.content.cloneNode(true));
  const taskName = item.querySelector('.todo__item-text');
  taskName.textContent = taskText;
  return item;
}
