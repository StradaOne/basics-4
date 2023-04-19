const time = {
    hour: document.querySelector('#hour'),
    minute: document.querySelector('#minute'),
    second: document.querySelector('#second')
}

const buttons = {
    buttonStart: document.querySelector('#buttonStart'),
    buttonStop: document.querySelector('#buttonStop'),
    buttonReset: document.querySelector('#buttonReset')
}

let timeInterval;

buttons.buttonStart.addEventListener('click', start);
buttons.buttonStop.addEventListener('click', stop);
buttons.buttonReset.addEventListener('click', reset);

function start() {
    timeInterval = setInterval(function() {
        const dateNow = new Date();
        const timeNow = dateNow.getTime();
        const seconds = Math.floor((timeNow / 1000) % 60);
        const minutes = Math.floor((timeNow / (1000 * 60)) % 60);
        const hours = Math.floor((timeNow / (1000 * 60 * 60))% 24) + 3;
        time.hour.textContent = addNull(hours);
        time.minute.textContent = addNull(minutes);
        time.second.textContent = addNull(seconds);
    }, 1000);
}

function addNull(item) {
    if (item < 10) {
        return item = '0' + item;
    } else {
        return item;
    }
}

function stop() {
    clearInterval(timeInterval);
}

function reset() {
    stop();
    time.hour.textContent = '00';
    time.minute.textContent = '00';
    time.second.textContent = '00';
}