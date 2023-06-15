const IMG_DIR = './assets/';

const WEATHER_TYPES = {
   'drizzle': 'clouds.png',
   'thunderstorm': 'thunderstorm.png',
   'rain': 'drizzle.png',
   'snow': 'snow.png',
   'mist': 'atmosphere.png',
   'smoke': 'atmosphere.png',
   'haze': 'atmosphere.png',
   'dust': 'atmosphere.png',
   'fog': 'atmosphere.png',
   'sand': 'atmosphere.png',
   'ash': 'atmosphere.png',
   'squall': 'atmosphere.png',
   'tornado': 'atmosphere.png',
   'clear': 'clear.png',
   'clouds': 'clouds.png'
}

function getWeatherImage(weatherType, weatherIcon) {
   if (weatherIcon.endsWith('n')) {
      return IMG_DIR + 'night_' + WEATHER_TYPES[weatherType];
   }
   return IMG_DIR + WEATHER_TYPES[weatherType];
}

export function showWeatherImage(data) {
   const weatherIcon = data.weather[0].icon;
   const weatherType = data.weather[0].main.toLowerCase();
   return getWeatherImage(weatherType, weatherIcon);
};