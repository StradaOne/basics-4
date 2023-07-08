function timeConverter(UNIX_timestamp){
  var a = new Date(UNIX_timestamp * 1000);
  var hour = a.getHours();
  var min = a.getMinutes();
  var time = hour + ':' + min ;
  return time;
}

export{timeConverter}