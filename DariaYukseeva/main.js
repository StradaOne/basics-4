const changeBgBtn = document.querySelector('#change-bg-btn');
const bodyElement = document.querySelector('body');

bodyElement.setAttribute('data-color', '#7FFFD4');
const colorValue = bodyElement.getAttribute('data-color');

let timerId;
let bgChangingOn = true;

// При нажатии на кнопку меняемся фон body
changeBgBtn.addEventListener('click', () => {
    // если bgChangingOn верно, меняем фон на цвет, прописанный в атрибуте data-color, bgChangingOn меняем на false, останавливаем смену цветов (setInterval). Меняем надопись на кнопке
    if (bgChangingOn === true) {
        bodyElement.style.backgroundColor = colorValue;
        bgChangingOn = false;
        clearInterval(timerId);
        changeBgBtn.textContent = 'Изменить фон';
    }
    // если bgChangingOn false, вызываем функцию смены цвета, bgChangingOn меняем на true, меняем надпись на кнопке
    else {
        changeBackgroundColor();
        bgChangingOn = true;
        changeBgBtn.textContent = 'Остановить';
    }
    
    let bodyStyles = getComputedStyle(bodyElement);
    console.log(bodyStyles.backgroundColor);
})

// Функция смены цвета фона запускает setInterval через каждые 2 сек, который вызывает функцию генерации рандомного цвета и присваивает сгенерированный цвет фону body 
function changeBackgroundColor() {
    
    timerId = setInterval(() => {
        // Функция генерации рандомного цвета создаёт отдельные переменные для каждого спектра в 16-ричном формате, если генерируется число меньше 2 знаков, добавляется 0. Затем составляет из них цвет в формате hex 
        function randomColorGeneration() {
            let redInHex = (Math.floor(Math.random() * 256)).toString(16);
            let greenInHex = (Math.floor(Math.random() * 256)).toString(16);
            let blueInHex = (Math.floor(Math.random() * 256)).toString(16);
            const formatHex = (color) => `${color.length < 2 ? `${color}0` : color}`;
            return `#${formatHex(redInHex)}${formatHex(greenInHex)}${formatHex(blueInHex)}`
        }
        
        let randomColor = randomColorGeneration();
        bodyElement.style.backgroundColor = randomColor;
        
    }, 2000)
}


