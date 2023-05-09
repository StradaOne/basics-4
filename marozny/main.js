const qS = (element) => document.querySelector(element);
const input = qS(".input-name");
const form = qS(".main-form");

async function showGender(event) {
    event.preventDefault()
    const firstName = input.value;
    const serverUrl = 'https://api.genderize.io';
    const url = `${serverUrl}?name=${firstName}`;
    try {
        let response = await fetch(url);
        if (response.ok) {
            let json = await response.json();
            console.log(json)
            alert(`${json.name} is ${json.gender}. Probability is ${json.probability * 100}%`);
         } else {
            throw new Error((await response.json()).error)
        }
    } catch(err) {
        alert(err);
    }
    form.reset();
}

form.addEventListener("submit", showGender);
