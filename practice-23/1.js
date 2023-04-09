function showVerticalMessage(str){
    str = str[0].toUpperCase() + str.slice(1);
    for(let name of str){
        console.log(name); 
        if(name === str[6]){
            break;
        }
        
    }
}
showVerticalMessage('strad123456789');
