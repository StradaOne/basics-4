function calc (operation, a, b) {
    switch(operation){
        case 'add':
            console.log(a + b);
            break;
        
        case 'multi':
            console.log(a * b);
            break;
        
        case 'substract':
            console.log(a - b);
            break;
        
        default: 
            console.log("Unknown value");
    }
   
}

calc('add', 3, 2);
calc('multi', 2, 4);
calc('substract', 7, 6);
