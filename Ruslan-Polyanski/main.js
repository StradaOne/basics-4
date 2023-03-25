
function calc(a, b, operation){
    switch (operation){
        case ('add'): return a + b;
        case ('multi'): return a * b;
        case ('subtract'): return a - b;
    } 
}

let result = calc(5, 1, "subtract");

console.log(result)
