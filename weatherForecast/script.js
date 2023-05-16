window.addEventListener('DOMContentLoaded',() => {
    //tabs
    let tabs = document.querySelectorAll('.tabheader_item'),
        tabsContent = document.querySelectorAll('.wrapper-weather'),
        tabsParent = document.querySelector('.weather-items');

    function hideTabContent() {
        tabsContent.forEach(item => {
            item.style.visibility = 'hidden';
        });
        tabsContent.forEach(item =>{
            item.classList.remove = '.tabheader_item_active';
        });
        }
    function showTabContent(i = 0) {
        tabsContent[i].style.visibility = 'visible';
        tabs[i].classList.add = 'tabheader_item_active';
    }
        hideTabContent();
         showTabContent();
        tabsParent.addEventListener('click',function(event){
            const target = event.target;
            if(target && target.classList.contains('tabheader_item')){
                tabs.forEach((item,i) =>{
                    if(target == item){
                        hideTabContent();
                        showTabContent(i);
                    }
                });
            }
        });
        const form = document.querySelector('.searching'),
        inputValue = document.querySelector('#search'),
        btnSend = document.querySelector('.btn-send');
        const cityNames = document.querySelector('.city-name'),
        gradeCel=document.querySelector('.grade');
        const heartImg = document.querySelector(".img-heart");
        let cityList = document.querySelector('.city-list');
        
    async function f(url){
       try {let response = await fetch(url);
        let json = await response.json();
        gradeCel.textContent = `${json.main.temp}`
        cityNames.textContent = `${json.name}`;
        heartImg.addEventListener("click",(e)=>{
            e.preventDefault();
            const li = document.createElement('li');
            li.classList.add('list-item');
            cityList.appendChild(li);
            li.textContent = `${json.name}`;
            const closeList = new Image();
            closeList.src='./img/icon-close.png';
            closeList.classList.add('close-list');
            li.append(closeList);
            closeList.addEventListener('click',(e)=>{
                if(e.target.classList.contains('list-item')){
                    e.stopPropagation();
                    e.target.remove();
                }
            })
           
        })  
       } catch (error) {
        console.log(error);
       } 
        }
    form.addEventListener('submit',(event)=>{
        event.preventDefault();
        inputValue.value.innerHTML='';
        const serverUrl = 'http://api.openweathermap.org/data/2.5/weather';
        const cityName = inputValue.value;
        const apiKey = 'f660a2fb1e4bad108d6160b7f58c555f'; 
        const url = `${serverUrl}?q=${cityName}&appid=${apiKey}&units=metric`;
        
            f(url) 
            })    
    
   



    });