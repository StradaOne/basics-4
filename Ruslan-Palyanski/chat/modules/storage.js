
const storage = {
  
  add(key, value){
    localStorage[key] = JSON.stringify(value);
  },

  get(key){

    try {
      const value = localStorage[key];
      return JSON.parse(value); 
    } catch(error) {
        console.log(error.message)
        return [];
    }

  }

}

export {storage};