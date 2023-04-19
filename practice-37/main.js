const minutesBlock = document.querySelector('.js-minutes'),
    secondsBlock= document.querySelector('.js-seconds'),
    hundredthsSecondBlock= document.querySelector('.js-hundredths-seconds'),
    btnStart= document.querySelector('.js-btn-start'),
    btnStop= document.querySelector('.js-btn-stop'),
    btnReset= document.querySelector('.js-btn-reset');

let interval;
let minutes = 0;
let seconds = 0;
let milliseconds = 0;

const startTimer = () => {
    milliseconds++;
    hundredthsSecondBlock.textContent = milliseconds;
    if (milliseconds > 99) {
        seconds++;
        secondsBlock.textContent = '0' + seconds;
        milliseconds = 0;
    }

    if(seconds > 9) {
        secondsBlock.textContent = seconds;
    }

    if(seconds > 59) {
        minutes++;
        minutesBlock.textContent = '0' + minutes;

        seconds = 0; 
        secondsBlock.textContent = '0' + seconds;
    }
    if (minutes > 9) {
        minutesBlock.textContent = minutes;
    }
};

btnStart.addEventListener('click', () => {
    clearInterval(interval);
    interval = setInterval(startTimer, 10);
});

btnStop.addEventListener('click', () => {
    clearInterval(interval);
});
    
btnReset.addEventListener('click', () => {
        clearInterval(interval);
        minutes = 0;
        seconds = 0;
        milliseconds = 0;

        minutesBlock.textContent = '00';
        secondsBlock.textContent= '00';
        hundredthsSecondBlock.textContent = '00';

});
    
