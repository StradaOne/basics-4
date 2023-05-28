import {createCityBlock} from "./createCityBlock.js";

const locationsBlock = document.querySelector('.locations-block__locations');

export const createCitiesBlock = (citiesSet) => {
    locationsBlock.textContent = '';
    citiesSet.forEach((item) => {
        const newCity = createCityBlock(item);
        locationsBlock.append(newCity)
    })
}