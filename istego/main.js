// На странице есть кнопка “Секундомер”. 
// При нажатии на кнопку необходимо запускать “секундомер” и выводить в консоль время каждую секунду. 
// Также необходимо предусмотреть возможность паузы / возобновления при нажатии на кнопку еще раз.
// Для решения этой задачи вам понадобится использовать функции setInterval и clearInterval для запуска и остановки таймера, их вы уже знаете

const btnTime = document.querySelector('.btn-time');
const btnReset = document.querySelector('.btn-reset');
const result = document.querySelector('.result');

let included = true;
let countTime = 1;
let timerId;

btnTime.addEventListener('click', startProgramm);

// Запуск программы
function startProgramm() {
    if (included) {
        startTime();
    } else {
        stopTime();
    }
}

// Запуск таймера
function startTime() {
    timerId = setInterval(() => {
        result.textContent = `${countTime++}`
    }, 1000);
    included = false;
    btnTime.style.backgroundColor = '#d4e114';
    btnTime.textContent = 'Pause';
    btnReset.addEventListener('click', resetTime);
    btnReset.removeAttribute("disabled");
    btnReset.style.backgroundColor = '#e04414';
}

// Остановка таймера
function stopTime() {
    clearInterval(timerId);
    included = true;
    btnTime.style.backgroundColor = '#8ee014';
    btnTime.textContent = 'Start';
}

// Сброс программы и значения
function resetTime() {
    stopTime();
    countTime = 1;
    btnReset.removeEventListener('click', resetTime);
    btnReset.setAttribute("disabled", "true");
    result.textContent = "-- : -- : --";
    btnReset.style.backgroundColor = '#acabab';
}