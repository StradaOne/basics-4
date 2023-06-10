function calc(operation, a, b){
   let result ;
   switch(operation){
      case 'add' :
         result = a + b;
         break;
      case 'multi' :
         result = a * b;
         break;
      case 'substract' :
         result = a - b;
         break;
   }
   console.log(result);
}
calc('add', 1, 2);
calc('multi', 1, 2);
calc('substract', 3, 2);
