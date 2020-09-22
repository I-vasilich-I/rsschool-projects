const operationButtons = document.querySelectorAll('[data-operation]');
const numberButtons = document.querySelectorAll('[data-number]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const clearButton = document.querySelector('[data-clear]');
const currentEraseButton = document.querySelector('[data-current-erase');
const previousOperandTextArea = document.querySelector('[data-previous-operand]');
const currentOperandTextArea = document.querySelector('[data-current-operand]');



class Calculator {
    constructor(previousOperandTextArea, currentOperandTextArea){
        this.previousOperandTextArea = previousOperandTextArea;
        this.currentOperandTextArea = currentOperandTextArea;
        this.clear();
    }

    clear(){
        this.previousOperand = '';
        this.currentOperand = '';
        this.operation = undefined;
        this.readyToReset = false;
    }

    currentErase(){
        this.currentOperand = '';
    }

    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0,-1);
    }

    

    appendNumber(number){
        if (number==='.' && this.currentOperand.includes('.')) return;
        if (this.readyToReset == true) {
            colculator.clear();
            colculator.updateDisplay();
            this.readyToReset = false;
        }
        this.currentOperand = this.currentOperand.toString()+number.toString();
    }

    chooseOperation(operation){
        if (this.currentOperand==='') return;
        this.readyToReset = false;
        if (this.previousOperand!=='') {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    computeOncurrent(){
        let computation;
        const current = parseFloat(this.currentOperand);
        if (isNaN(current)) return;
        switch (this.operation){
            case '1/x' : 
                computation = 1 / current;
                break;
            case 'x^2' : 
                computation = Math.pow(current, 2);
                break;
            case '√' : 
                computation = Math.sqrt(current, 2);
                break;
            default :
                return;
        } 
        this.readyToReset = true;
        this.currentOperand = computation;
        this.previousOperand = '';
        this.operation = undefined; 

    }

    compute(){
        let computation;
        const previous = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if (isNaN(previous) || isNaN(current)) return;
        switch (this.operation){
            case '+' :
                computation = previous + current;
            break;
            case '-' : 
                computation = previous - current;
                break;
            case '*' : 
                computation = previous * current;
                break;
            case '÷' : 
                computation = previous / current;
                break;
            
            default :
            return;
        }
        this.readyToReset = true;
        this.currentOperand = computation;
        this.previousOperand = '';
        this.operation = undefined; 
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
            this.previousOperandTextArea.innerText = this.getDisplayNumber(this.previousOperand);
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
    colculator.compute();
    colculator.updateDisplay();
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        colculator.chooseOperation(button.innerText);
        colculator.updateDisplay();
    })
})
