import {createCityBlock} from "./createCityBlock.js";

const locationsBlock = document.querySelector('.locations-block__locations');

export const createCitiesBlock = (arr) => {
    locationsBlock.textContent = '';
    arr.forEach((item) => {
        const newCity = createCityBlock(item);
        console.log(newCity)
        locationsBlock.append(newCity)
    })
    console.log('done')
}