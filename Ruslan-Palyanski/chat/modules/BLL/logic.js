import { cookie } from "../cookie.js";
import { storage } from "../storage.js";


function isValidEmail(email) {
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
    return true;
  }
  return false;
}

const logic = {

  async setName(name){
    const token = cookie.getCookie('token');
    try{
        const result = await fetch('https://edu.strada.one/api/user', {
              method: 'PATCH',
              headers: {
                  Authorization: `Bearer ${token}`,
                  'Content-Type': 'application/json;charset=utf-8'
                },        
              body: JSON.stringify({name})
          }) 

          if(result.ok){
            return true;
          } else {
            return false;
          }
    } catch(error){
      console.log(error.message)
    }


  },

  async saveTokenToCookieAndInitialithation(token){
    const date = new Date(Date.now() +  604800e3);
    cookie.setCookie(token, date)
    const result = await logic.initializationApp();
    if(!result){
      return false;
    } 
    return true;
  },

  async getTokenOnEmail(email){
    const result = isValidEmail(email);
    if(!result){
      return false;
    }
    const response = await fetch('https://edu.strada.one/api/user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
        body: JSON.stringify({email})
    });

    if(response.ok){
      return true;
    } else {
      console.log("Ошибка HTTP: " + response.status)
      return false;
    }

  },

  async initializationApp(){
    const token = cookie.getCookie('token');
    try {
        const response = await fetch('https://edu.strada.one/api/user/me', {
          method: 'GET',
          headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json;charset=utf-8'
            },   
      });

        if (response.ok) {
          const data = await response.json();
          const user = {
            name: data.name,
            email: data.email,
          }
          storage.add('user', user)
          return true;
      } else {
          console.log("Ошибка HTTP: " + response.status)
          return false;
      }
    } catch (error) {
      console.log(error.message)
    }

  }



};

export {logic};