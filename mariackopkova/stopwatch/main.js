const minutesBlock = document.querySelector('.js-minutes'),
   secondsBlock = document.querySelector('.js-seconds'),
   hundredthsSecondBlock = document.querySelector('.js-hundredths-second'),
   btnStart = document.querySelector('.js-btn-start'),
   btnStop = document.querySelector('.js-btn-stop'),
   btnReset = document.querySelector('.js-btn-reset');

let interval = 0;
let minutes = 0;
let seconds = 0;
let milliseconds = 0;

const startTimer = () => {
   milliseconds++;


   if (milliseconds <= 99) {
      hundredthsSecondBlock.innerHTML = milliseconds;
   }
   if (milliseconds == 100) {
      hundredthsSecondBlock.innerHTML = '00';
   }
   if (milliseconds > 99) {
      seconds++;
      secondsBlock.innerHTML = '0' + seconds;

      milliseconds = 0;
   }
   if (seconds > 9) {
      secondsBlock.innerHTML = seconds;
   }
   if (seconds > 59) {
      minutes++;
      minutesBlock.innerHTML = '0' + minutes;

      seconds = 0;
      secondsBlock.innerHTML = '0' + seconds;
   }
   if (minutes > 9) {
      minutesBlock.innerHTML = minutes;
   }
}
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

   minutesBlock.innerHTML = '00';
   secondsBlock.innerHTML = '00';
   hundredthsSecondBlock.innerHTML = '00';
});
