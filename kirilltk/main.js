
let timer = document.getElementById("timerBtn");
let stop = document.getElementById("stopTimer");
let drop = document.getElementById("stopTimer");
let hours = 0;
let minutes = 0;
let sec = 0;
let timerId;


function timer() {
    sec++;
    if (sec >= 60) {
        sec = 0;
        minutes += 1;
    };
    if (minutes >= 60) {
        minutes += 0;
        hours +=1;
    };
    console.log(`${hours}:${minutes}:${sec}`);
};
function startTimer() {
    timerId = setInterval(timer, 1000);

};
function pauseTimer() {
	clearInterval(timerId);

};
function dropTimer() {
	hours = 0;
	minutes = 0;
	sec = 0;
};
timer.addEventListener('click', startTimer);
stop.addEventListener('click', pauseTimer);
drop.addEventListener('click', dropTimer);