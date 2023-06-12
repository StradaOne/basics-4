let delay = 1000;
let hour = 0;
let min = 0;
let sec = 0;

function showTime() {
    console.clear();
    console.log(`${hour}:${min}:${sec}`);
};
function timer(){
        if (sec === 59) {
            if (min === 59) {
                hour++;
                min=0;
            };
            min++;
            sec=0;
        };
        sec++;
        showTime();
        pause();
};
function start(){
    theTimer = setInterval(timer, delay);
};
function pause(){
    if (sec===9){
    clearInterval(theTimer);
    };
};

start();