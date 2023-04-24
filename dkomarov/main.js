const buttonStart = document.querySelector("#btn-start");
const buttonStop = document.querySelector("#btn-stop");
const btnWrap = document.querySelector("#btnWrap");
const btnWrapStart = document.querySelector("#wrap-btn_start");
const btnWrapReset = document.querySelector("#wrap-btn_reset");
const hoursValue = document.querySelector("#value-hours");
const minutesValue = document.querySelector("#value-minutes");
const secondsValue = document.querySelector("#value-seconds");
const changeColorBtn = document.querySelector("#change-color");
const bgBody = document.querySelector("body");

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

changeColorBtn.addEventListener('click', () => {
    bgBody.style.backgroundColor = "#badc64"
    console.log("color")
})




