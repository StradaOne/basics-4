import { UI_ELEMENTS } from './ui.js';
import { STATUSES, deleteTask, changeStatus } from '../main.js';

export function createItem(taskText, taskStatus) {
  const item = document.createElement('li');
  item.classList.add('todo__item');
  item.append(UI_ELEMENTS.TEMPLATE.content.cloneNode(true));
  const taskName = item.querySelector('.todo__item-text');
  const btnChangeStatus = item.querySelector('.todo__item-checkbox');
  btnChangeStatus.addEventListener('click', () => {
    changeStatus(taskText);
  });
  const btnDelete = item.lastElementChild;
  btnDelete.addEventListener('click', () => {
    deleteTask(taskText);
  });
  taskName.textContent = taskText;
  if (taskStatus === STATUSES.DONE) {
    const checkbox = item.querySelector('.todo__item-checkbox-input');
    checkbox.checked = true;
    item.classList.add('todo__item--completed');
  }
  return item;
}
