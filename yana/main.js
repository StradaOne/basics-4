function calc(a,b,operation)
{
    switch(operation){
        case "add":
        return a+b;

        case "multi":
        return a*b;

        case "substract":
        return a-b;

        default:"Error";
    }

   

}
console.log(calc(8,7,"substract"));

