

export const loadCities = () => {
    const citiesData = localStorage.getItem('cities');
    if (citiesData) {
        return JSON.parse(citiesData);
    }
    return [
        {city: 'Amur'},
        {city: 'Samara'},
        {city: 'Bali'},
        {city: 'Dane'},
        {city: 'Kilo'},
        {city: 'Nur-Sultan'}
    ];
};

export const saveCities = (cities) => {
    localStorage.setItem('cities', JSON.stringify(cities));
};

export const saveMainCity = (cityName, temperature, temperatureSecond, Weather, Sunrise, Sunset) => {
    const data = {
        city: cityName,
        temperature: temperature,
        temperatureSecond,
        Weather,
        Sunrise,
        Sunset
    };
    localStorage.setItem('favoriteCityData', JSON.stringify(data));
}

export const loadMainCity = () => {
    const data = localStorage.getItem('favoriteCityData');
    return data ? JSON.parse(data) : null;
}