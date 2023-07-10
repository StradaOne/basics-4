import Cookies from "js-cookie";
import { presentTime, currentTime } from "./module_js/data";
import { main } from "./module_js/variables";
import { checkToken, changeName, getMessage } from "./module_js/request";
import { codeToEmail } from "./module_js/request";



main.seting_button.addEventListener('click', function () {
    main.modal_settings.showModal();
});
main.close_settings.addEventListener('click', function () {
    main.modal_settings.close();
});
main.close_autorisation.addEventListener('click', function () {
    main.modal_autorisation.close();
});

main.enter_code.addEventListener("click", function (event) {
    event.preventDefault();
    main.modal_autorisation.close();
    main.modal_confirmation.showModal();

});
function generatorTemplate(messagee, name, time, flag) {
    let clone = main.template.content.cloneNode(true);
    let li = clone.querySelectorAll("li");
    const spanText = li[0].querySelector(".message_text");
    const spanTime = li[0].querySelector(".message_time");

    spanText.textContent = name + ': ' + messagee;
    spanTime.textContent = time;

    if (flag === "message_my") {
        main.message_my.appendChild(clone);
        li[0].classList.add('my');
    }
    else if(flag === "message_you"){
        console.log("gg");
        main.message_my.appendChild(clone);
        li[0].classList.add('you');
    }


}
const token = Cookies.get("token");
let socked = new WebSocket(`wss://edu.strada.one/websockets?${token}`);
main.form.addEventListener("submit", function (event) {
    event.preventDefault();
    main.message_my.innerHTML = "";
    console.log("socked = ", socked);
    socked.send(JSON.stringify({ text: main.input_message.value }));
    

   
    // generatorTemplate(main.input_message.value, main.modal_input_settings.value, presentTime(), "message_my");
});
socked.onclose = function () {
    console.log("Соединение закрыто.");
    socked = new WebSocket(`wss://edu.strada.one/websockets?${token}`);
};
socked.onerror = function () {
    console.log("Ошибка веб-сокета.");
};
socked.onmessage = function (event) {
    const data = JSON.parse(event.data);
    console.log("onsubmit data = ", data);
    const messageText = data.text;
    const messageName = data.user.name;
    const time = data.createdAt;
    generatorTemplate(messageText, messageName, currentTime(time));
    // render();
};

main.modal_content_main.addEventListener('submit', function (event) {
    event.preventDefault();
    changeName(main.modal_input_settings.value, Cookies.get("token"));
    main.modal_autorisation.close();

})


main.get_code.addEventListener("click", codeToEmail);


main.form_confirmation.addEventListener('submit', async function (event) {
    event.preventDefault();
    try {
        const code = document.querySelector(".code");
        console.log(code.value)
        const token = checkToken(code.value);
        console.log(token);
        Cookies.set('token', code.value);
        if (token) {

            main.modal_confirmation.close();
            main.modal_autorisation.close();
        }
    } catch (error) {
        console.log('ОШИБКА');

    }

})

// let startMessageIndex = 300;
let startIndex = 0;
let limit = 20;
async function render() {
    main.message_my.innerHTML = "";
    let index = startIndex + limit
    let data = await getMessage();
    console.log("limit = ", limit)
    const newHistory = data.messages.splice(startIndex , index);
    console.log(newHistory.length, "++++");
    for (let i = newHistory.length - 1; i >= 0; i--){
        const message = newHistory[i];
        if (message.user.email == "maratmirzabalaev@gmail.com" || message.user.name == main.modal_input_settings) {
            generatorTemplate(message.text, message.user.name, currentTime(message.createdAt), "message_my");
        }
         else { 
            generatorTemplate(message.text, message.user.name, currentTime(message.createdAt), "message_you"); 
        }
        
    }
    limit += 20;
    
    // console.log("data.text = ", message.text);
    // console.log("data.name = ", message.user.name);
}
main.message_content.addEventListener("scroll", function(){
    if(main.message_content.scrollTop === 0){
        render();
        console.log("+");
    }
})
document.addEventListener("DOMContentLoaded", render())

