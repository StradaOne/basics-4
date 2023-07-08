
const storage = {
  
  add(key, value){
    localStorage[key] = JSON.stringify(value);
  },

  get(key){
    try {
      const value = localStorage[key];
      return JSON.parse(value); 
    } catch(err){
      console.log(err)
      return [];
    }

  }

}

export {storage};