function showVerticalMessage(word){

   if (word.startsWith('s')){
     word = word.at(0).toUpperCase() + word.slice(1,7)
   }

   for (let char of word){
      console.log(char)
   } 
}
showVerticalMessage('stradaAaaaAaA');