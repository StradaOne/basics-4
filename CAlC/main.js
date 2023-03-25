

// Некий калькулятор(по заданию через switch)

function calc (a , b, operation){
    switch (operation){
    case  "add":
        return a + b;
    case "multi":
        return a * b;

    case "substract":
        return a - b;
    default: 
    return "Я не знаю, что вы от меня хотите";
}
}



