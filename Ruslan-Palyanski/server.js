
import {storage} from "./storage.js";

const serverData = {
    serverUrl: 'http://api.openweathermap.org/data/2.5/weather',
    apiKey: 'f660a2fb1e4bad108d6160b7f58c555f',
    // 'f660a2fb1e4bad108d6160b7f58c555f'
    // 'afc9f2df39f9e9e49eeb1afac7034d35'
    serverImg: 'https://openweathermap.org/img/wn/',
    serverForecastUrl: 'http://api.openweathermap.org/data/2.5/forecast',
}

function createUrl(serverUrl, cityName, apiKey){
    return `${serverUrl}?q=${cityName}&appid=${apiKey}`;
}

function createLoader(){
    const loader = document.createElement('div');
    loader.classList.add('loader')
    loader.textContent = 'loading';
    document.body.prepend(loader)
}

function removeLoader(){
    const loader = document.querySelector('.loader');
    loader.remove()
}

async function getData(city){
    createLoader()
    const cityName = city;
    
    const url = createUrl(serverData.serverUrl, cityName, serverData.apiKey);

    async function getData(){
        try {
            const response = await fetch(url);
            return await response.json();
        } catch(err){
            console.log(err)
        }
    }

    const data = await getData();
   


    const forecastUrl = createUrl(serverData.serverForecastUrl, cityName, serverData.apiKey);

    async function getData1(){
        try{
            const response = await fetch(forecastUrl);
            return await response.json();
        } catch(err){
            console.log(err)
        }
    }

    const data1 = await getData1();

    async function getAllData(){
        const dataAll = [data, data1];
        try{
            return await Promise.all(dataAll).then(data => data);
        } catch(err){
            console.log(err)
        } finally{
            removeLoader()
        }
    }

    return await getAllData();
}

export {serverData, getData};