function showVerticalMessage(str){
  let upperStr = str[0].toUpperCase() + str.slice(1);

  if (str.length > 7) {
      upperStr = upperStr.slice(0, 6);
  }

  for (let char of upperStr) {
    console.log(char);
  }
}

showVerticalMessage('strada');
