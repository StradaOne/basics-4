function showVerticalMessage(message) {
  let resultStr = '';

  if (message[0] === 's') {
    message = 'S' + message.slice(1);
  }

  for (let i = 0; i < message.length; i++) {
    if (i < 7) {
      resultStr += message[i] + '\n';
    } else {
      break;
    }
  }

  console.log(resultStr);
}

showVerticalMessage('stradafasf');
showVerticalMessage('stradafsdfsdfdsf');
showVerticalMessage('test');
showVerticalMessage('qwertyuiop');
showVerticalMessage('strada');
