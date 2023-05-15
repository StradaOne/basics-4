function getTargetTime(data, sun) {
   const localTimezoneOffset = new Date().getTimezoneOffset() * 60 * 1000;
   const targetTimezoneOffset = data.timezone * 1000 || data.city.timezone * 1000;
   const targetTime = new Date(sun * 1000 + localTimezoneOffset + targetTimezoneOffset);
   return targetTime.toLocaleTimeString('ru-RU', {
      hour: '2-digit',
      minute: '2-digit'
   });
};

function getTargetDay(data, date) {
   const localTimezoneOffset = new Date().getTimezoneOffset() * 60 * 1000;
   const targetTimezoneOffset = data.city.timezone * 1000;
   const targetTime = new Date(date * 1000 + localTimezoneOffset + targetTimezoneOffset);
   return targetTime.getDate() + ' ' + targetTime.toLocaleString('en', {
      month: 'long'
   });
};

export { getTargetDay, getTargetTime};