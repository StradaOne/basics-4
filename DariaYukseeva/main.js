
// function showVerticalMessage(str) {
    
//     for (let i = 0; i <= str.length - 1 && i < 7; i++) {
//         if (str[i] === 's' && i === 0) {
//             console.log(str[0].toUpperCase());
//         }
//         else {
//             console.log(str[i]);
//         }
//     }
// }


// function showVerticalMessage(str) {
    
//     if (str[0] === 's') {
//         str = str[0].toUpperCase() + str.slice(1, 7);
//     } 
//     str = str.slice(0, 7);

//     for (let char of str) {
//         console.log(char);
//     }
// }

function showVerticalMessage(str) {
    
    substr = str.slice(1, 7);
      
    substr = ((str[0] === 's')? 'S' : str[0] ) + substr;
  
    for (let char of substr) {
        console.log(char);
    }
  }



  showVerticalMessage('ssssssssssssssss');

