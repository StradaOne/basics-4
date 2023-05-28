
export const createCityBlock = (item) => {
    const newCity = document.createElement('div');
    const newCityTitle = document.createElement('span');
    const newCityButton = document.createElement('button');

    newCity.classList.add('locations-block__wrapper');
    newCityTitle.classList.add('locations-block__location');
    newCityTitle.textContent = item.city;
    newCityButton.classList.add('locations-block__button');
    newCityButton.setAttribute('data-city', item.city);

    newCity.append(newCityTitle, newCityButton)

    return newCity
}