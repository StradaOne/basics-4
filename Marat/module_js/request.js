import Cookies from 'js-cookie';
import axios from 'axios';
import { storage } from './storage';
import { da } from 'date-fns/locale';
import { main } from './variables';

const url1 = "https://edu.strada.one/api/user";
const url2 = "https://edu.strada.one/api/user/me";

// Функция для отправления кода на почту
export async function codeToEmail(event) {
    event.preventDefault();
    const email = document.querySelector(".autorisation").value;
    console.log(email);
    try {
        const response = await fetch('https://edu.strada.one/api/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        });
        if (response.ok) {
            const data = await response.json();
            console.log('Код отправлен на почту')
        }
        else {
            console.log('Запрос откланен');
        }
    } catch (error) {
        console.error('Error: ', error)
    }
}
export async function checkToken(token) {
    try {
        const response = await fetch(url2, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
        if (!response.ok) {
            throw new Error("Неверный код");
        }
        
        const data = await response.json();

        console.log('data = ', data)
        return data;
    } catch (e) {
        console.log(e.message);
        return false;
    }
}

export async function changeName(name) {
    try {
        const response = await fetch(url1, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${Cookies.get('token')}`
            },
            body: JSON.stringify({ name: name })
        });

        if(response.ok){
            main.modal_input_settings.value = name;
        }
        const data = await response.json();
        console.log('data.name = ', data.name)
        

    } catch (error) {
        console.log(error.message)

    }
}

export async function getMessage() {
    const token = Cookies.get('token');
    console.log('token = ', token)
    const responce = await fetch('https://edu.strada.one/api/messages/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
    });

    const data = await responce.json();
    return data
}


