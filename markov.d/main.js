// console.log(98%9);
// console.log(2 > '3');
// console.log(2 > NaN);
// console.log(2 > undefined);
// console.log(undefined === undefined);
// console.log(undefined == undefined);
// console.log(undefined == NaN);
// console.log(NaN == 0);
// console.log(undefined == 0);
// console.log(null == 0);
// console.log(null < 0);
// console.log(null > NaN);
// console.log(null > undefined);
// console.log(null == undefined);
// console.log(null === undefined);
// console.log(null == 0);
// console.log(null === null);
// console.log(NaN == undefined);
// console.log(undefined < 2);
// let year = prompt('В каком году была опубликована спецификация ECMAScript-2015?', '');


// let company = prompt('Какое «официальное» название JavaScript?', '');

// if (company == 'ECMAScript'){
//     alert('Верно!');
// } else{
//     alert('Не знаете? ECMAScript!');
// }




// let result = prompt

// if (a + b < 4) {
//   result = 'Мало';
// } else {
//   result = 'Много';
// }

// function checkAge(age) {
//     let message = age < 18 ? "you are not allowed" : "you are welcome";
//     console.log(message);
// }

// checkAge(14)


// function calc(a, b, operation){
//     if (operation === 'add'){
//         return a + b;
//     } else if (operation === 'subtrack'){
//         return a - b;
//     } else
//     if (operation === 'multi'){return a * b;}
// }
// console.log(calc(4, 5, 'add'));

// console.log(calc(4, 5, 'subtrack'));

// let number = +prompt('Введите число между 0 и 3', '');
//     switch (number){
//         case 0:
//             alert('Вы ввели 0');
//         break;
    
//         case 1:
//             alert('Вы ввели 1');
//             break;    
//         case 2:
//         case 3:  
//              alert('Вы ввели число 2, а может 3');
//              break;    
            
        
//     }
function calc(a, b, operation){
    switch (operation){ 
        case 'add':
         return a + b;
        case 'subtrack':
         return a - b;
        case 'multi':
         return a * b;
        default:
          return 'Нет данных'

    }
}
console.log (calc(5, 9, "multi"))


