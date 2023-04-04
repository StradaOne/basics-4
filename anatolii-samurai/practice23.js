// функция которая преобразует полученную строку в "вертикальный вид" и выводит ее в консоль
function showVerticalMessage(str){
   //проверка на букву "s" и длину слова
    if(str[0] == "s" || str.length > 7){
        str = str[0].toUpperCase() + str.slice(1,7);
        showChar(str);
    }else if(str.length > 7){   //проверка на длину строки
        str = str.slice(0, 7);
        showChar(str);
    }else if (str){
        showChar(str);
    }
     else{
        console.log("error");
    }  
}
// функция для вывода цикла for...of
function showChar(str){
    for(let char of str){ 
        console.log(char);
    }
}
showVerticalMessage("strada\t");
showVerticalMessage("work\t");
showVerticalMessage("1stradageek\t");
