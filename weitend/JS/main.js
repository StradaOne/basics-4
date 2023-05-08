// const tabNow = document.querySelector('#now');
// const tabDetails = document.querySelector('#details');
// const tabForecast = document.querySelector('#forecast');

const tabs = document.querySelectorAll('.tab');
const tabsClasses = ['now', 'details'];
const tabsHTML = [
    `<div class="weather__content-info-wrapper">
    <div class="weather__content-info-temp">14°</div>
    <img
      class="weather__content-info-img"
      src="./IMG/weatherIcon.png"
      alt="weather icon"
    />
    <div class="weather__content-box">
      <p class="weather__content-box-text">Aktobe</p>
      <img
        class="weather__content-box-img"
        src="./IMG/like.svg"
        alt="like icon"
      />
    </div>
    </div>`,
    `<p class="weather__details-title">Aktobe</p>
    <div class="weather__details-content">
      <p class="weather__details-text">Temperature: 14</p>
      <p class="weather__details-text">Feels like: 10</p>
      <p class="weather__details-text">Weather: Clouds</p>
      <p class="weather__details-text">Sunrise: 03:21</p>
      <p class="weather__details-text">Sunset: 18:54</p>
    </div>`,
]
window.addEventListener('click', (e) => {
    getTabs(e)
});

function getTabs(e) {
    for (let i = 0; i < tabsClasses.length; i++) {
        if (e.target.classList.contains(tabsClasses[i])) {
            const deleteElementIn = document.querySelector('.weather__content-info-wrapper');

            deleteElementIn.innerHTML = tabsHTML[i];

            for (let i = 0; i < tabs.length; i++) {
                if (tabs[i].classList.contains('on-tab')) {
                    tabs[i].classList.remove('on-tab')
                };
            };

            e.target.classList.add('on-tab');
        }
    };
};