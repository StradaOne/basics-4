const btn = document.querySelector('.btn');
const bdy = document.querySelector('bdy');
const value = btn.getAttribute('data-color');
let flag = 1;
document.body.style.background = `${value}`;

function col () {
    if (flag == 1) {
        document.body.style.backgroundColor = 'black';
        flag = 2;
    } else {
        document.body.style.backgroundColor = '#61bfee';
        flag = 1;
    }
};

function give () {
    let info = btn.textContent;
    return info
}

btn.addEventListener ('click', col, give);
console.log(value)
