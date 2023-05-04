import {name, form} from './modules/getElements.js'

form.addEventListener('submit', (event) => {
    event.preventDefault()
    genderize()
})

function genderize() {
    try{
        if(!name.value) {
            throw Error('Пустая строка.Введите имя!!!')
        }
        getGender()
        name.value = '';
    } catch(e) {
        alert(e.message)
    }
}

async function getGender() {
    const serverUrl = 'https://api.genderize.io';
    const firstName = name.value
    const url = `${serverUrl}?name=${firstName}`;
    const response = await fetch(url)
    const list = await response.json()
    alert(`${list.name} is ${list.gender}`)
}
