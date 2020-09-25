const powOperationButton = document.querySelector('[data-pow-operation]');
const currentOperationButtons = document.querySelectorAll('[data-current-operation]');
const operationButtons = document.querySelectorAll('[data-operation]');
const numberButtons = document.querySelectorAll('[data-number]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const clearButton = document.querySelector('[data-clear]');
const currentEraseButton = document.querySelector('[data-current-erase');
const previousOperandTextArea = document.querySelector('[data-previous-operand]');
const currentOperandTextArea = document.querySelector('[data-current-operand]');
const errorString = 'Don\'t be so negative, cheer up!\nBTW all of your countings will be cleared, so stay positive (with square root) and you\'ll be fine.'


class Calculator {
    constructor(previousOperandTextArea, currentOperandTextArea){
        this.previousOperandTextArea = previousOperandTextArea;
        this.currentOperandTextArea = currentOperandTextArea;
        this.operationOnCurrent = false;
        this.equals = false;
        this.clear();
    }

    clear(){
        this.previousOperand = '';
        this.currentOperand = '';
        this.operation = undefined;
        this.readyToReset = false;
        this.equals = false;
    }

    currentErase(){
        this.currentOperand = '';
    }

    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0,-1);
    }

    appendNumber(number){
        if (number==='.' && this.currentOperand.includes('.')) return;
        if (this.readyToReset == true && this.operation == undefined) {
            colculator.clear();
            colculator.updateDisplay();
            this.readyToReset = false;
        }
        this.currentOperand = this.currentOperand.toString()+number.toString();
    }

    chooseOperation(operation){
        if (this.currentOperand==='') this.currentOperand=0;//return;
        this.readyToReset = false;
        if (this.operationOnCurrent==true) {
            this.compute(operation);
        } else if (this.previousOperand!=='') {
            this.compute();
            this.operation = operation;
        } else {
            this.operation = operation;
            this.previousOperand = this.currentOperand;
            this.currentOperand = '';
        }
        
    }

    compute(operation = this.operation){
        let computation;
        const previous = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        let k = 100000000000000;
        if (isNaN(current)&&this.equals){
            this.currentOperand = this.previousOperand;
            this.previousOperand = '';
            this.operation = undefined;
            return;
        }
        if ((isNaN(previous)&&this.operationOnCurrent==false) || isNaN(current)) return;
        switch (operation){
            case '+' :
                computation = ((previous*k) + (current*k))/k;
            break;
            case '-' : 
                computation = ((previous*k) - (current*k))/k;
                break;
            case '*' : 
                computation = previous * current;
                break;
            case '÷' : 
                computation = previous / current;
                break;
            case '1/x' : 
                computation = parseFloat(1 / current);
                break;
            case '**' :  
                computation = Math.pow(previous, current);
                if(isNaN(computation)){
                    alert('Pal, stop messing with my calculator, please');
                    this.clear();
                    return;
                }
                break;
            case '√' : 
                computation = current<0 ? errorString : Math.sqrt(current, 2);
                break;
            case '+/-' :
                computation = -1 * current;
                break;
            case '%' :
                if (isNaN(previous)){
                    this.readyToReset = false;
                    this.operationOnCurrent = false;
                    return;
                }
                computation = previous*current/100;
                break;
            default :
            return;
        }
        if (typeof computation =='string') {
            alert(computation);
            this.clear();
            this.operationOnCurrent = false;
            this.equals = false;
            return;
        }
        if (this.operationOnCurrent == true) {
            this.readyToReset = false;
            this.operationOnCurrent = false;
            this.currentOperand = computation;
        } else {
            this.previousOperand = computation;
            this.readyToReset = true;
            if (this.equals) {
                this.currentOperand = computation; 
                this.previousOperand = '';
                this.equals = false;
            } else {
                this.currentOperand = '';
            }
        }
        
        if (operation===this.operation){
            this.operation = undefined; 
        } 
    }

    getDisplayNumber(number){
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        let integerDisplay;
        if (isNaN(integerDigits)) {
            integerDisplay = '';
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {maximumFractionDigits: 0});
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        } else {
            return integerDisplay;
        }
    }

    updateDisplay(){
        this.currentOperandTextArea.innerText = this.getDisplayNumber(this.currentOperand);
        if (this.operation != null) {
            this.previousOperandTextArea.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
        }else{
            this.previousOperandTextArea.innerText = '';
        }
    }

};

const colculator = new Calculator(previousOperandTextArea, currentOperandTextArea);

numberButtons.forEach(button => {
    button.addEventListener("click", () => {
        colculator.appendNumber(button.innerText);
        colculator.updateDisplay();
    })
});

deleteButton.addEventListener('click', () => {
    colculator.delete();
    colculator.updateDisplay();
})

clearButton.addEventListener('click', () => {
    colculator.clear();
    colculator.updateDisplay();
})

currentEraseButton.addEventListener('click', () => {
    colculator.currentErase();
    colculator.updateDisplay();
})

equalsButton.addEventListener('click', () => {
    colculator.equals = true;
    colculator.readyToReset = true;
    colculator.compute();
    colculator.updateDisplay();
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        colculator.chooseOperation(button.innerText);
        colculator.updateDisplay();
    })
})

currentOperationButtons.forEach(button => {
    button.addEventListener('click', () => {
        colculator.operationOnCurrent = true;
        colculator.chooseOperation(button.innerText);
        colculator.updateDisplay();
    })
})

powOperationButton.addEventListener('click', () => {
    colculator.chooseOperation(powOperationButton.innerText);
    colculator.updateDisplay();
})