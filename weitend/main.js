const btn = document.querySelector('#btn');
let time = 0;
btn.addEventListener('click', () => {
    btn.classList.toggle('on')

    let id = setInterval(() => {
        if (btn.classList.contains('on')) {
            console.log(time);
            time++;
        } else {
            clearInterval(id)
        }
    }, 1000)
});