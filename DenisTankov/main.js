/* eslint-disable no-unused-expressions */
function showVerticalMessage(str) {
  let result = '';
  (str.startsWith('s')) ? result += (`${str[0].toUpperCase()}\n`) : result += `${str[0]}\n`;

  for (let i = 1; i <= 6; i += 1) {
    result += (`${str[i]}\n`);
  }
  return result;
}

console.log(showVerticalMessage('stradaaaaaa'));
