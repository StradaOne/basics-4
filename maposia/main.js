const form = document.querySelector('.genderize')
const inputForm = document.querySelector('.input')
const gender = document.querySelector('.gender')

const serverUrl = 'https://api.genderize.io'

function showGender(person) {
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

