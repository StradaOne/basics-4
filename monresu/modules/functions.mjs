export async function getData(URL) {
  try {
    const response = await fetch(URL);
    let ans = await response.json();
    return ans;
  } catch (error) {
    throw new Error(await response.json().error);
  }
}

export function timeConverterTime(UNIX_timestamp) {
  const date = new Date((UNIX_timestamp) * 1000);
  const normalTime = date.toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit', 
    timeZone: 'UTC', 
    hour12: false 
  });
  return normalTime;
}

export function timeConverterDay(UNIX_timestamp) {
  const date = new Date((UNIX_timestamp) * 1000);
  const normalTime = date.toLocaleString("en-GB", {
    day: 'numeric', 
    month: 'long',
    timeZone: 'Europe/London',
  });
  return normalTime;
}

export function cityExistsInCache(cache, name) {
  const now = new Date().getHours();
  const cityExist = cache.find(item => item.data.name.toLowerCase() === name) !== undefined;
  let dateGood = false;
  for (let i = 0; i < cache.length; i++) {
    if (cache[i].time === now && cache[i].data.name.toLowerCase() === name) {
      dateGood = true;
      break;
    }
  }
  return [cityExist, dateGood];
}

export function findIndexCityInCache(cache, name) {
  name = name.toLowerCase();
  const index = cache.findIndex(item => item.city === name);
  return index;
}

export function saveToLocalStorage(key, val) {
  localStorage.setItem(key, JSON.stringify(val))
}

export const findCityIndex = (list, name) => {
  name = name.toLowerCase();
  return list.findIndex(c => c.name === name);
}

export const isEmpty = cityName => cityName.trim();

