const btn = document.getElementById('tick-tock');
let data = 0,
    val = false;

function check() {
    (!val) ? val = true : val = false;
    tickTock();
}

function tickTock(){
    let timerId = setInterval(function(){
        if(!val) clearInterval(timerId)
        data++
        console.log('Кол-во проклятий:' + data)
    }, 1000);
}

btn.addEventListener('click', check);