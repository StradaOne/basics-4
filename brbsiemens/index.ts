const UI_ELEMNTS={
  FORM: document.querySelector('.form'),
  ADD_BTN : document.querySelector('.addNameBtn')
  }
 
  const input = document.querySelector('.inputName') as HTMLInputElement;
  if (UI_ELEMNTS.FORM !== null) {
  UI_ELEMNTS.FORM.addEventListener('submit',(e)=>{
  e.preventDefault()
  if (input !== null) {
    const value = input.value;
      genderizeName(value);
    
  }
  })
  }

  async function genderizeName(input:unknown){
    const firstName = input;
    console.log(input)
  const serverUrl = 'https://api.genderize.io';
  const url = `${serverUrl}?name=${firstName}`;
  
  let response = await fetch(url)
  let obj = await response.json()
  alert(`${obj.name} is ${obj.gender}`);
  }
  
  
  