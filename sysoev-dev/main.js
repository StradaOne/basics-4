// let promise = new Promise(function (resolve, reject) {
//   const result = 1 + 2;
//   resolve(result);
//   // reject('error');
// });

// promise.then(
//   result => {
//     console.log(result);
//   },
//   errror => {
//     console.log(errror);
//   }
// );

// promise.then(console.log);

// promise.then(null, error => {
//   console.log(error);
// });

// promise.catch(console.log);

// promise.then(result => {
//   console.log(result);
// });

// promise.finally(() => {
//   console.log('Promise выполнен');
// });

// function delay(ms) {
//   return new Promise(function (resolve, reject) {
//     setTimeout(() => {
//       resolve('Готово');
//     }, ms);
//   });
// }

// delay(3000).then(result => console.log(`Выполнилось через 3 секунды, результат: ${result}`));

// const btn = document.querySelector('.btn');

// function imgLoad(src) {
//   return new Promise(function (resolve, reject) {
//     const img = document.createElement('img');
//     img.src = src;
//     img.onload = () => {
//       resolve(img);
//     };
//     img.onerror = () => {
//       reject(new Error('Ошибка загрузки'));
//     };
//   });
// }

// btn.addEventListener('click', () => {
//   imgLoad('https://w.wallhaven.cc/full/ex/wallhaven-ex9gwo.png').then(
//     function (result) {
//       document.body.append(result);
//     },
//     function (error) {
//       alert(error);
//     }
//   );
// });

// setTimeout(() => {
//   console.log('3');
// }, 2000);

// console.log('1');

// setTimeout(function () {
//   console.log('2');
// }, 5000);

// console.log('3');

// setTimeout(function () {
//   console.log('4');
// }, 5000);
// setTimeout(function () {
//   console.log('5');
// }, 5000);

// let promise = new Promise(function (resolve, reject) {
//   setTimeout(() => {
//     resolve(10);
//   }, 500);
// });

// promise
//   .then(value => {
//     console.log(value);
//     console.log(typeof value);
//     return value;
//   })
//   .then(value => value * 5)
//   .then(value => {
//     console.log(value); //50
//   })
//   .finally(() => {
//     console.log('preloader');
//   });

function withPromise() {
  return new Promise(function (resolve, reject) {
    reject('OKK');
  });
}

withPromise()
  .then(value => {
    console.log(`Успех ${value}`);
  })
  .catch(value => {
    console.log(`Ошибка ${value}`);
  });
