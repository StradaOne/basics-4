let form = document.querySelector(".form");
let tmpl = document.querySelector(".tmpl");
let contentBox = document.querySelector(".content-box");
let EMAIL = document.querySelector(".input__email");
let formAut = document.querySelector(".autoriz");
let btnAut = document.querySelector(".button_autoriz");

form.addEventListener("submit", addMessege);

function addMessege(event) {
    event.preventDefault();
    const inp = document.querySelector(".input")
    const elem = document.createElement('div');
    contentBox.appendChild(elem);
    elem.classList.add("message", "message_sent", "message_my");
    elem.append(tmpl.content.cloneNode(true));
    elem.querySelector(".text").innerHTML = `${inp.value}`;
    inp.value = "";                                     
}

btnAut.addEventListener("click", btnAutEnd)

async function btnAutStart(email) {
    let url = "https://edu.strada.one/api/user";
    let response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8' 
        },
        body: JSON.stringify({email})
    });
    let result = await response.json();
    console.log(email)
}

async function btnAutEnd(event) {
    event.preventDefault()
    const email = EMAIL.value;
    await btnAutStart(email);
    EMAIL = '';
}
