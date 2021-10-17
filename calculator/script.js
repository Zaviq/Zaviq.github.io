class Calculator{
    constructor(previousOperandTextElement, currentoperandTextElement){
        this.previousOperandTextElement = previousOperandTextElement
        this.currentoperandTextElement = currentoperandTextElement
        this.clear()
    }

    clear(){
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
        window.focus()
    }

    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
        window.focus()
    }

    appendNumber(number){
        if(number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
        window.focus()
    }

    chooseOperation(operation){
        if(this.currentOperand === '') return
        if(this.previousOperand !== ''){
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
        window.focus()
    }

    compute(){
        let computation
        let previous = parseFloat(this.previousOperand)
        let current = parseFloat(this.currentOperand)
        if(isNaN(previous) || isNaN(current)) return
        switch(this.operation){
            case '+':
                computation = previous + current
                break
            case '-':
                computation = previous - current
                break
            case '*':
                computation = previous * current
                break
            case '÷':
                computation = previous / current
                break
            default:
                return
        }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''
        window.focus()
    }

    getDisplayNumber(number){
        const toStingNumber = number.toString()
        const integerDigits = parseFloat(toStingNumber.split('.')[0])
        const decimalDigits = toStingNumber.split('.')[1]
        let integerDisplay
        if(isNaN(integerDigits)){
            integerDisplay = ''
        }else{
            integerDisplay = integerDigits.toLocaleString('en', {maximumFractionDigits: 0})
        }
        if(decimalDigits != null){
            return `${integerDisplay}.${decimalDigits}`
        }else{
            return integerDisplay
        }
    }

    updateDisplay(){
        this.currentoperandTextElement.innerText = this.getDisplayNumber(this.currentOperand)
        if(this.operation != null){
            this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        }else{
            this.previousOperandTextElement.innerText = ''
        }
        window.focus()
    }
}



const numberButtons = document.querySelectorAll('[data-numbers]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentoperandTextElement = document.querySelector('[data-current-operand]')
const keyboardInput = document.querySelector('[data-calculator]')


const calculator = new Calculator(previousOperandTextElement, currentoperandTextElement)

numberButtons.forEach(button =>{
    button.addEventListener('click', ()=>{
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
        button.blur()
    })
})

operationButtons.forEach(button =>{
    button.addEventListener('click', ()=>{
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
        button.blur()
    })
})

equalsButton.addEventListener('click', button =>{
    calculator.compute()
    calculator.updateDisplay()
    equalsButton.blur()
})

allClearButton.addEventListener('click', button =>{
    calculator.clear()
    calculator.updateDisplay()
    allClearButton.blur()
})

deleteButton.addEventListener('click', button =>{
    calculator.delete()
    calculator.updateDisplay()
    deleteButton.blur()
})


window.onload = function() {
    focus()  
  }

window.addEventListener('keyup', e =>{
    //console.log(e.code.slice(0,-1).toLowerCase())
    numberButtons.forEach(button =>{
        if(button.innerText==e.key){
            button.focus()
            setTimeout(function(){button.blur()},100);
        }
    })
    switch(e.code.slice(0,-1).toLowerCase()){
        case 'digit':
            calculator.appendNumber(e.key)
            break
        case 'perio':
            calculator.appendNumber(e.key)
            break
        case 'ente':
            calculator.compute()
            break
        case 'backspac':
            calculator.delete()
            break
        case 'delet':
            calculator.clear()
            break
        default:
            return
    }
    calculator.updateDisplay()
})


const container = document.querySelector('[data-container]')

let viewPortHeight

function getVmin() {
   
    // the more standards compliant browsers (mozilla/netscape/opera/IE7) use window.innerWidth and window.innerHeight
    if (typeof window.innerWidth != 'undefined') {
      viewPortHeight = window.innerHeight - 50
    }
}

function setDimensions(){
    getVmin()
    container.style.setProperty('height', viewPortHeight.toString());
}

setDimensions()
