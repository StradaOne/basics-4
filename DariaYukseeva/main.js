const stopwatchBtnStart = document.getElementById('stopwatch-btn-start');
const stopwatchBtnStop = document.getElementById('stopwatch-btn-stop');
const stopwatchBtnReset = document.getElementById('stopwatch-btn-reset');

const stopwatch = {
    hour: 0,
    min: 0,
    sec: 0,
}

let stopwatchStatus = false;
let startTime = 0;
let savedTimeBeforePause = 0;
let timeId;

// Запускаем отсчёт времени, запоминаем таймстамп старта и вызываем функцию вывода в консоль каждую секунду
function startCount() {
    if (stopwatchStatus === false) {
        stopwatchBtnStart.className = 'active';
        stopwatchBtnStop.className = 'nonactive';
        startTime = Date.now();
        timeId  = setInterval(() => {
            stepTime();
            refreshStopwatchDisplay();
            
        }, 1000)
        stopwatchStatus = true;
    }      
}

// Останавливаем секундомер, высчитываем и сохраняем время с начала старта в секундах. Обнуляем время старта
function stopCount() {
    clearInterval(timeId);

    let currentTime = Date.now();
    let timeInSec = Math.floor((currentTime - startTime)/1000);
    
    savedTimeBeforePause = timeInSec + savedTimeBeforePause;
    startTime = 0;
    stopwatchStatus = false;
    stopwatchBtnStart.className = 'nonactive';
    stopwatchBtnStop.className = 'active';
}

// Изменяем время секундомера с учётом сохранённого времени до паузы
function stepTime() {
    let currentTime = Date.now();
    let time = (currentTime - startTime)/1000 + savedTimeBeforePause;

    stopwatch.sec = Math.round(time % 60);
    stopwatch.min = Math.floor(time / 60);
    stopwatch.hour = Math.floor(time / 3600);
}

// Если значение секунд и минут меньше 10, то добавляем к нему 0 в вывод. Выводим секундомер в консоль
function refreshStopwatchDisplay() {
    let out = [];
    for (let key in stopwatch) {
        if (stopwatch[key] < 10) {
            stopwatch[key] = `0${stopwatch[key]}`;
        }
        else {
            stopwatch[key] = stopwatch[key];
        }
        out.push(stopwatch[key]);
    }
    
    document.querySelector('.out').innerHTML = out.join(':');
}

// Останавливаем отсчёт и сбрасываем показания секундомера
function resetCount() {
    stopCount();
    
    savedTimeBeforePause = 0;
    stopwatch.sec = 0;
    stopwatch.min = 0;
    stopwatch.hour = 0;
    
    refreshStopwatchDisplay()
    stopwatchBtnStart.className = 'nonactive';
    stopwatchBtnStop.className = 'nonactive';
}


stopwatchBtnStart.addEventListener('click', startCount);
stopwatchBtnStop.addEventListener('click', stopCount);
stopwatchBtnReset.addEventListener('click', resetCount);


