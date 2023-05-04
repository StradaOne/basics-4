const form = document.querySelector('form');
const inputName = form.querySelector('#inputName');
const btn = form.querySelector('#btn');
const resultUi = document.querySelector('.result-ui');
const preload = document.querySelector('.preload-wrapper');

const serverUrl = 'https://api.genderize.io';


form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const firstName = inputName.value;
    const url = `${serverUrl}?name=${firstName}`;

    try {
        preload.style.display = 'flex';
        const response = await fetch(url);
        const genderData = await response.json();
        
        if (genderData.gender) {
            resultUi.textContent = `${firstName} is ${genderData.gender}`;
            inputName.value = '';
            preload.style.display = 'none';
        } else {
            resultUi.textContent = `Не удалось определить пол`;
            preload.style.display = 'none';
        }
    } catch (error) {
        resultUi.textContent = 'Error: ' + error.message;
        preload.style.display = 'none';
    }
})