import {buttonStart, buttonStop, btnWrap, btnWrapStart, btnWrapReset, changeColorBtn} from './modules/buttons.js';
import {hoursValue, minutesValue, secondsValue, bgBody} from './modules/numbers.js';



let timer;
let hrs = 0;
let min = 0;
let sec = 1;

function runTimer() {
    timer = setTimeout(function run() {
        console.log(`hrs: ${hrs} min: ${min} sec: ${sec}`);
        hoursValue.textContent = hrs.toString().padStart(2, '0');
        minutesValue.textContent = min.toString().padStart(2, '0');
        secondsValue.textContent = sec.toString().padStart(2, '0');
        sec++;

        if (sec >= 60) {
            console.log(min);
            min++
            sec = 0;
        };

        if (min >= 60) {
            hrs++
            console.log(hrs);
            min = 0;
            sec = 0;
        }
        timer = setTimeout(run, 1000);
    }, 1000)
};

buttonStart.addEventListener('click', () => {
    runTimer();
    buttonStart.classList.add('hidden');
    buttonStop.classList.remove('hidden');
});

buttonStop.addEventListener('click', () => {
    clearTimeout(timer)
    buttonStart.classList.remove('hidden');
    buttonStop.classList.add('hidden');
    btnWrap.classList.remove('hidden');
    buttonStart.classList.add('hidden');
});

function buttonClickReset() {
    sec = (secondsValue.textContent = "00") ? 0 : false;
    min = (minutesValue.textContent = "00") ? 0 : false;
    hrs = (hoursValue.textContent = "00") ? 0 : false;

};

function randomBgColor() {
    const colors = ["#badc64", "#ff5f47", "#ffd747", "#e3ff47", "#477bff", "7847ff", "af47ff", "ff74dc", "e23b4f"];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    bgBody.style.backgroundColor = randomColor;
    console.log("color");
}

function bgColorSetInt() {
    let timer = setInterval(() => {
        randomBgColor();
    }, 2000);
    setTimeout(() => {
        clearInterval(timer);
    }, 10000);
}


btnWrapStart.addEventListener('click', () => {
    runTimer();
    btnWrap.classList.add('hidden');
    buttonStop.classList.remove('hidden');
});

btnWrapReset.addEventListener('click', () => {
    buttonClickReset();
    btnWrap.classList.add('hidden');
    buttonStart.classList.remove('hidden');
});

changeColorBtn.addEventListener('click', bgColorSetInt);




