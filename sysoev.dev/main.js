const url = 'https://api.sampleapis.com/countries/countries';
const itemBox = document.querySelector('.item-box');

async function getData(url) {
  const response = await fetch(url);
  if (response.ok) {
    const data = await response.json();
    showResult(data);
  }
}

function showResult(data) {
  data.forEach(element => {
    const item = document.createElement('div');
    item.classList.add('item');
    console.log(element);
    item.textContent = `'${element.abbreviation}' ${element.name}`;
    itemBox.append(item);
  });
}

getData(url);
