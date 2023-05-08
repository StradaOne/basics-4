import { UI, getWeather, } from './modules/index.mjs';

UI.navBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    for (let i = 0; i < UI.navBtns.length; i++) {
      UI.navBtns[i].classList.remove('active-btn');
    }
    btn.classList.add('active-btn');
  })
});

UI.formFind.addEventListener('submit', getWeather);

UI.locationsListBtns.addEventListener('click', event => {
  const locationsBtnNode = event.target.textContent;

})
