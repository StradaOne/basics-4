export function timeConvert(time, timezone){
   const newDate = new Date((time + timezone)*1000);

    const localDate = newDate.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      timezone: 'UTC',
   });
   return localDate;
}
export function dateConvert(time, timezone){
   const newDate = new Date((time + timezone)*1000);

    const localDate = newDate.toLocaleString("en-GB", {
      day: 'numeric',
      month: 'long',
      timezone: 'UTC',
   });
   return localDate;
}
