function isTaskNameValid(str) {
   if (!str) {
      console.log('Your task is Empty.');
      return false;
   }
   return true;
}

function showVerticalMessage(str) {
   let maxLength = 7;
   let newStr = '';

   if(!isTaskNameValid(str)) {
      return;
   }

   (str.startsWith('s')) ? newStr += str[0].toUpperCase()
      : newStr += str[0];
   (str.length > maxLength) ? newStr += str.slice(1, maxLength)
      : newStr += str.slice(1);

   for (const char of newStr) {
      console.log(char);
   }
}

showVerticalMessage('strada');