const equalButton = document.getElementById("equal");

function calculate(){
    let valueOne = document.getElementById("valueOne").value;
    console.log(valueOne);
    let valueTwo = document.getElementById("valueTwo").value;
    console.log(valueTwo);
}

equalButton.addEventListener("click", calculate); 