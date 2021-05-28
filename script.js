const calculatorDisplay = document.querySelector('h1');
const inputBtns = document.querySelectorAll('button');
const clearBtn = document.getElementById('clear-btn');

// Array for pressed number
// let numbers =[];
// Get values
let firstValue =0;
let operatorValue = '';
let awaitingNextValue =false ;

// Calculate first and second value based on operator 
const calculate = {
    '/': (firstValue,secondValue) => firstValue / secondValue ,
    '*': (firstValue,secondValue) => firstValue * secondValue ,
    '+': (firstValue,secondValue) => firstValue + secondValue ,
    '-': (firstValue,secondValue) => firstValue - secondValue ,
    '=': (firstValue,secondValue) =>  secondValue 
};

// Use Operator
function useOperator(operator){
    const currentValue = Number(calculatorDisplay.textContent);
    if(operatorValue && awaitingNextValue) {
        operatorValue =operator ; 
        return ;
    }
    if(!firstValue){
        firstValue = currentValue;
    }else{
        const calculation = calculate[operatorValue](firstValue,currentValue);
        calculatorDisplay.textContent = calculation ;
        firstValue = calculation ;
    }
    awaitingNextValue =true ;
    operatorValue =operator ; 
}
function sendInputValue(number){
    if(awaitingNextValue){
        calculatorDisplay.textContent = number ;
        awaitingNextValue = false ;
    }else{
    // If current display value 0 replace / nothing
    const displayValue = calculatorDisplay.textContent ;
    calculatorDisplay.textContent = displayValue === '0' ? number : displayValue + number;
    }
    // Way with Array
    // numbers.push(number);
    // calculatorDisplay.textContent = numbers.join('');
}
// Check if there is decimal or not then Add one .
function addDecimal(){
    if(awaitingNextValue) return ;
    if(!calculatorDisplay.textContent.includes('.')){
        calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
    }
}

// Add Event Listener
inputBtns.forEach(inputBtn =>{
    if(inputBtn.classList.length === 0){
        inputBtn.addEventListener('click', ()=> sendInputValue(inputBtn.value));
    }else if(inputBtn.classList.contains('operator')){
        inputBtn.addEventListener('click', ()=> useOperator(inputBtn.value));
    }else if(inputBtn.classList.contains('decimal')){
        inputBtn.addEventListener('click', ()=> addDecimal());
    }
});
// Reset all value , display
function resetAll(){
calculatorDisplay.textContent ='0';
firstValue =0;
operatorValue = '';
awaitingNextValue =false ;
}
// Event Listener for ClearBTN
clearBtn.addEventListener('click',resetAll);
