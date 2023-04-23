import {numberOne, numberTwo, operationSelect, resultBtn, resultNumber, parent} from "/basics-4/dkomarov/modules/constants.js"

function calc() {
    const number_1 = Number(numberOne.value);
    const number_2 = Number(numberTwo.value);
    let operation = operationSelect.value;
    let result = 0;

    switch (operation) {
        case 'value1':
            result = number_1 + number_2;
            break;
        case 'value2':
            result = number_1 - number_2;
            break;
        case 'value3':
            result = number_1 * number_2;
            break;
        case 'value4':
            result = number_1 / number_2;
            break;

    };

    resultNumber.textContent = result.toFixed(2);
};


resultBtn.addEventListener('click', () => {
    calc();
    const childDiv = document.createElement('div');
    childDiv.classList.add("child")
    childDiv.textContent = resultNumber.textContent;
    parent.appendChild(childDiv);
    childDiv.addEventListener('click', () => {
        parent.removeChild(childDiv);
    });
    
});


