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
    }

    currentErase(){
        this.currentOperand = '';
    }

    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0,-1);
    }

    equals(){
        

    }

    appendNumber(number){
        if (number==='.' && this.currentOperand.includes('.')) return;
        this.currentOperand = this.currentOperand.toString()+number.toString();
    }

    chooseOperation(operation){
        if (this.currentOperand==='') return;
        if (this.previousOperand!=='') {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    compute(){
        let computation;
        const previous = parseFloat(this.previousOperand);
        const current = pasrseFloat(this.currentOperand);
        if (isNaN(previous) || isNaN(current)) return;
        switch (this.operation){
            case '+' :
                computation = previous + current;
                break;
            case '-' : 
                computation = previous - current;
                break;
            default :
                return;
        }
        this.currentOperand = computation;
        this.previousOperand = '';
        this.operation = undefined; 
    }

    updateDisplay(){
        this.currentOperandTextArea.innerText = this.currentOperand;
        this.previousOperandTextArea.innerText = this.previousOperand;
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
