const VAL1 = document.querySelector('#num-1'),
      OPER = document.querySelector('#operation'),
      VAL2 = document.querySelector('#num-2'),
      BTN = document.querySelector('.calc_result_btn'),
      RES = document.querySelector('.calc_result_block');


function calc() {
    let a = +VAL1.value,
        b = +VAL2.value,
        oper = OPER.value,
        result = 0;

    switch(oper){
        case '+':
            result = a + b;
            break;
        case '-':
            result = a - b;

            break;
        case '/':
            result = a / b;
            break;
        case '*':
            result = a * b;
            break;
    }
    
    result = Number(result.toFixed(14));
    RES.textContent = result;
}
        
BTN.addEventListener('click', calc);
    