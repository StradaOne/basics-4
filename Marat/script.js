import Cookies from "js-cookie";
import { presentTime, currentTime } from "./module_js/data";
import { main } from "./module_js/variables";
import { checkToken, changeName, getMessage } from "./module_js/request";
import { codeToEmail } from "./module_js/request";
import { storage } from "./module_js/storage";
import { da } from "date-fns/locale";



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

    if (flag == "message_my") {
        main.message_my.appendChild(clone);
    }
    else {
        console.log("gg");
        main.message_you.appendChild(clone);
    }


}
const token = Cookies.get("token");
const socked = new WebSocket(`wss://edu.strada.one/websockets?${token}`);
main.form.addEventListener("submit", function (event) {
    event.preventDefault();

    setTimeout(function () {
        // main.message_my.innerHTML = "";
        console.log("socked = ", socked);
        socked.send(JSON.stringify({ text: main.input_message.value }));
        socked.onclose = function () {
            console.log("Соединение закрыто.");
        };
        socked.onerror = function () {
            console.log("Ошибка веб-сокета.");
        };
        // render();
    }, 2000)
    // generatorTemplate(main.input_message.value, main.modal_input_settings.value, presentTime(), "message_my");
});
socked.onmessage = function (event) {
    const data = JSON.parse(event.data);
    console.log("onsubmit data = ", data);
    const messageText = data.text;
    const messageName = data.user.name;
    const time = data.createdAt;
    generatorTemplate(messageText, messageName, currentTime(time));
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


async function render() {
    let data = await getMessage();
    console.log(data);
    for (let i in data.messages) {
        if (data.messages[i].user.email == "maratmirzabalaev@gmail.com") {
            generatorTemplate(data.messages[i].text, data.messages[i].user.name, currentTime(data.messages[i].createdAt), "message_my");
        }

        else {
            generatorTemplate(data.messages[i].text, data.messages[i].user.name, currentTime(data.messages[i].createdAt));
        }


    }



    console.log("data.text = ", data.messages[0].text);
    console.log("data.name = ", data.messages[0].user.name);
}
document.addEventListener("DOMContentLoaded", render())

