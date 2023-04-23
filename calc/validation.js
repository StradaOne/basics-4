
const ERROR = {
    notNumber: 'You must add two number',
}

export function isValid(item){
    if(item === ''){
        alert(ERROR.notNumber)
        return;
    }
    if(isNaN(+item)){
        alert(ERROR.notNumber)
        return;
    }
    return true;
}
