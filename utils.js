function timeConverter(UNIX_timestamp){
  const a = new Date(UNIX_timestamp * 1000);
  const hour = a.getHours();
  const min = a.getMinutes();
  const time = hour + ':' + min ;
  return time;
}

export{timeConverter}