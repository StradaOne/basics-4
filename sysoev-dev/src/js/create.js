export function createModal(type) {
  const titles = {
    settings: 'Настройки',
    confirm: 'Подтверждение',
    auth: 'Авторизация',
  };
  const labels = {
    settings: 'Имя в чате',
    confirm: 'Код:',
    auth: 'Почта:',
  };
  const buttonsText = {
    settings: '->',
    confirm: 'Войти',
    auth: 'Получить код',
  };

  const modal = document.createElement('div');
  modal.classList.add('modal');
  modal.innerHTML = `
  <div class="modal__header">
    <p class="modal__title">${titles[type]}</p>
    <button class="modal__btn-close">x</button>
  </div>
  <form class="modal__form" action="#">
    <label class="modal__form-label" for="modal__form-input">${labels[type]}</label>
    <input class="modal__form-input" placeholder="Стив" type="text" name="" id="modal__form-input">
    <button class="modal__form-btn" type="submit">${buttonsText[type]}</button>
</form>`;

  return modal;

  // const btnClose = modal.querySelector('.modal__btn-close');
  // btnClose.addEventListener('click', () => {
  //   modal.remove();
  // });

  //
}
