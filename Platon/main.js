// let UserName = 'Платон';
// let UserAge = 26;
// let UserHeigth;
// UserHeigth = 176;
// console.log(UserName + ' is ' + UserAge + ' yeard old');
// console.log(UserHeigth);

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


calc('add', 3, 3);
calc('multi', 2, 4);
calc('substract', -7, 6);