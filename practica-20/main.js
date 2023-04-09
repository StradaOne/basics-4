let sum = (a, b) => {
    if(!a || !b){
        return undefined;
    }
    return a + b;
}
console.log(sum(1, 2)); 
console.log(sum(1 , 'a')); 
