async function getData(name) {
    const serverUrl = 'http://api.openweathermap.org/data/2.5/weather';
    const cityName = name;
    const apiKey = 'afc9f2df39f9e9e49eeb1afac7034d35';
    const url = `${serverUrl}?q=${cityName}&appid=${apiKey}`;
    try {
      const data = await fetch(url)
        .then(res => res.json())
      if ((data.message)) {
        throw new Error('Название города введено неправильно');
      } else {
        return data;
      };
    } catch (err) {
      alert(err)
    }
  };

function timeConverter(unixTime) {
    const time = new Date(unixTime * 1000);

    const hours = time.getHours();
    const minutes = time.getMinutes();

    return `${hours}:${minutes}`;
};

function tempConverter(kel) {
    return Math.floor(kel - 273);
};

export { timeConverter, tempConverter, getData };