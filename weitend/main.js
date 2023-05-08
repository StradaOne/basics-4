const form = document.querySelector('.form');
const input = document.querySelector('.input');
const btn = document.querySelector('.btn')

const names = [];

btn.addEventListener('click', async (e) => {
    e.preventDefault()
    const firstName = input.value;
    const serverUrl = 'https://api.genderize.io';
    const url = `${serverUrl}?name=${firstName}`;

    await sendData(url);
    renderName();
    input.value = '';
    input.focus()
});

async function sendData(url) {
    const response = await fetch(url)
        .then(response => response.json())
        .then(obj => names.push(obj));

        return response;
};

function renderName() {
    const parentNode = document.querySelector('.result');
    parentNode.innerHTML = ''

    for (let i = 0; i < names.length; i++) {
        const result = `
        <div class="name">
            <p class="name__text">${names[i].name} is ${names[i].gender}</p>
        </div>`

        parentNode.insertAdjacentHTML('afterbegin', result);

    };
};

