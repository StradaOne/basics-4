
const VAL1 = document.querySelector('#num-1'),
      OPER = document.querySelector('#operation'),
      VAL2 = document.querySelector('#num-2'),
      BTN = document.querySelector('.calc_result_btn'),
      RES = document.querySelector('.calc_result_block'),
      LIST = document.querySelector('.block_result_list')

import {blockResults} from './list.js';

function calc() {
    const a = +VAL1.value,
          b = +VAL2.value,
          oper = OPER.value;
          
    let result = 0;
        
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


        const liRes = blockResults(result);
        LIST.appendChild(liRes);
}


        
BTN.addEventListener('click', calc);
    