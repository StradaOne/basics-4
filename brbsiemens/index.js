"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const UI_ELEMNTS = {
    FORM: document.querySelector('.form'),
    ADD_BTN: document.querySelector('.addNameBtn')
};
const input = document.querySelector('.inputName');
if (UI_ELEMNTS.FORM !== null) {
    UI_ELEMNTS.FORM.addEventListener('submit', (e) => {
        e.preventDefault();
        if (input !== null) {
            const value = input.value;
            genderizeName(value);
        }
    });
}
function genderizeName(input) {
    return __awaiter(this, void 0, void 0, function* () {
        const firstName = input;
        console.log(input);
        const serverUrl = 'https://api.genderize.io';
        const url = `${serverUrl}?name=${firstName}`;
        let response = yield fetch(url);
        let obj = yield response.json();
        alert(`${obj.name} is ${obj.gender}`);
    });
}
