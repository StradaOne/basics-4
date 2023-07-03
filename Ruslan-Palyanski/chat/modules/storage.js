
const storage = {
  
  addName(name){
    localStorage.name = name;
  },

  getName(){
     return localStorage.name; 
  }

}

export {storage};