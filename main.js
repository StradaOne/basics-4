
function isValid(str){
    if(!str){
        console.log("There is not string or it is empty")
        return null;
    }
}

function showVerticalMessage(str){
    let flag = isValid(str) ? ture : false;
    if(flag){
        return null;
    }
    let verticalString = ``;
    let newStr = str.slice(0, 7);
    let count = 0;
    for(let item of newStr){
        if(count === 0 && item === 's'){
            verticalString += item.toUpperCase() + "\n";
            ++count;
        } else {
            verticalString += item + '\n';
            ++count;
        }
    }
    
    console.log(verticalString)
}

showVerticalMessage('sdddthrthrhtrthrthrthrhrth')