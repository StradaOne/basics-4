const form = document.querySelector('.genderize')
const inputForm = document.querySelector('.input')
const gender = document.querySelector('.gender')
const showForm = document.querySelector('.showForm')
const refreshBtn = document.querySelector('.refreshBtn')
const appUI = document.querySelector('.form')

const serverUrl = 'https://api.genderize.io'

function showGender(person) {
    appUI.classList.add('hide')
    showForm.classList.remove('hide')
    if(person.gender){
        gender.textContent = person.gender
    } else {
        gender.textContent = 'Имя введено не верно'
    }

}

async function genderize(url){
    let response = await fetch(url)
    let person = await response.json()  
    showGender(person)
}

form.addEventListener('submit', (evt) => {
    evt.preventDefault()
    const firstName = inputForm.value
    const url = `${serverUrl}?name=${firstName}`;
    genderize(url)

})


refreshBtn.addEventListener('click', ()=> {
    location.reload();
})