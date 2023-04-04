const maxLength = 7;
const firstSymbolUpperCase = 's';
const errorEmptyStr = `Нужно передать строку в формате 'strada'`;

const str = 'stradaxxxxxxx';

let result = null;

showVerticalMessage(str);

function showVerticalMessage(str) {
    //Проверяем строку на пустоту и тип
    if (!str || typeof(str) !== 'string') return console.log(errorEmptyStr);

    result = str.slice(0, maxLength);
    //Убираем чувствительность к регистру и проверяем первый символ на 's'
    if (str.at(0).toLowerCase() === firstSymbolUpperCase) {
        result = str.at(0).toUpperCase() + str.slice(1, maxLength);
    }
    for (const symbol of result) {
        console.log(symbol);
    }
}