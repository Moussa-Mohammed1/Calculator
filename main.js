const display = document.getElementById('display');
const expression = document.getElementById('expression');
const buttons = document.querySelectorAll('button');
let currentValue = '0';
let previousValue = '';
let operation = null;

function updateDisplay(){
    display.textContent = currentValue;
    expression.textContent = previousValue + (operation ? `${operation}` : '');
}
console.log("it works");
function calculateIT() {
    const prev = parseFloat(previousValue);
    const curr = parseFloat(currentValue);
    if (isNaN(prev) || isNaN(curr)) {
        return;
    }
    switch (operation) {
        case '+': currentValue = (prev + curr).toString();
            break;
        case '-': currentValue = (prev - curr).toString();
            break;
        case 'x': currentValue = (prev * curr).toString();
            break;
        case '÷': currentValue = curr !== 0 ? (prev/curr).toString() : 'Error';
            break;
        default:
            break;
    }
}
console.log("it works");
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const number = button.dataset.number;
        const action = button.dataset.action;
        if (number !== undefined) {
            currentValue = currentValue === '0' ? number : currentValue + number;
        }
        if (action === 'clear') {
            currentValue = '0';
            previousValue = '';
            operation = null;
        }
        if (action === 'backspace') {
            currentValue = currentValue.length > 1 ? currentValue.slice(0, -1) : '0';
        }
        if (action === 'decimal' && !currentValue.includes('.')) {
            currentValue += '.'
        }
        if (action === 'toggle-sign') {
            currentValue = (parseFloat(currentValue) * -1);
        }
        if (action === 'percent') {
            currentValue = (parseFloat(currentValue) / 100);
        }
        if (['add', 'subtract', 'multiply', 'divide'].includes(action)) {
            if (operation && previousValue){
                calculateIT();
            }
            previousValue = currentValue; 
            currentValue = '0';
            operation= action === 'add' ? '+' : action === 'subtract' ? '-' : action === 'multiply' ? 'x' : '÷';
        }
        if(action === 'equals' && operation && previousValue){
            calculateIT();
            previousValue = '';
            operation = null;
        }
        updateDisplay();
    })
})
updateDisplay();
console.log("it works");