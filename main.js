const UI_ELEMENTS = {
  IMG_BOX: document.querySelector('.img-box'),
};

function loadImage(src, callback) {
  const img = document.createElement('img');
  setTimeout(() => {
    img.src = src;
  }, 3000);
  console.log('Какой-то код');
  img.onload = () => callback(null, img);
  img.onerror = () => callback(new Error('Ошибка'));
}

function showError(error) {}

function callback(error, image) {
  if (error) {
    showError(error);
  }
  UI_ELEMENTS.IMG_BOX.append(image);
}

loadImage('https://avatars.githubusercontent.com/u/24270731?v=4', callback);

// // Синхронный колбэк
// function greeting(name) {
//   console.log(`Hello ${name}`);
// }

// function getName(callback) {
//   let name = 'Vadim';
//   callback(name);
// }

// getName(greeting);
