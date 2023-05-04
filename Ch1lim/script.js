const form = document.querySelector('form');
const output = document.querySelector('.output');

form.addEventListener('submit', showGender)

async function showGender(e) {
    e.preventDefault();
    const firstName = document.querySelector('input').value;
    const serverUrl = 'https://api.genderize.io';
    const url = `${serverUrl}?name=${firstName}`;
    await fetch(url)
        .then(async (data) =>{
            let obj = await data.json();
            const li = document.createElement('li');
            li.textContent = `${obj.name}: ${obj.gender} `
            output.append(li)
        }).catch( () => alert('Что-то пошло не так '))
}
    
