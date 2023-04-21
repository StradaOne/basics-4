const btn = document.querySelector('.btn');
const bdy = document.querySelector('bdy');
const colors = ['red', 'blue', 'green', 'orange', 'black', 'white', 'aqua', '#61bfee'];

let bdyColor = document.body.style.backgroundColor;

function random() {
    return Math.floor(Math.random() * colors.length);
}


function randomColor() {
    setInterval(() => document.body.style.backgroundColor = colors[random()], 100);
}

btn.addEventListener('click', randomColor)





