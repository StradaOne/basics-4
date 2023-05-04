const getSelectot = (css) => document.querySelector(css);

const ELEMENT = {
   FORM: getSelectot('.form'),
   INPUT: getSelectot('.input-gender')
}

function isNameValid(name) {
   if (!name) {
      console.log('empty.')
      return false;
   }
   return true;
}

async function f(url) {
   try {
      let response = await fetch(url);
      let json = await response.json();

      alert(`${json.name} is ${json.gender}`)
   } catch (err) {
      alert(err);
   }
}

ELEMENT.FORM.addEventListener('submit', (event) => {
   event.preventDefault();

   const firstName = ELEMENT.INPUT.value;
   const serverUrl = 'https://api.genderize.io';
   const url = `${serverUrl}?name=${firstName}`;

   if (!isNameValid(firstName)) {
      return;
   }

   f(url);
})
