const form = document.querySelector("form");
const result = document.querySelector("#result");
const input = document.querySelector(".input")

form.addEventListener("submit", async function(e){
    e.preventDefault();
    const inputResult = input.value;
    const serverURL = "https://api.genderize.io";
    const url = `${serverURL}?name=${inputResult}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        const gender = data.gender;
        result.textContent = `${inputResult} is ${gender}`;
    } catch (error) {
        console.error("Ошибка");
        
    }
})