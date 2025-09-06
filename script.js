let leftNumber = "";
let operator = "";
let rightNumber = "";
let result;
let shouldReset = false;
let zeroError = false;

const add = function(a, b) {
    return a + b;
}

const subtract = function(a, b) {
    return a - b;
}

const multiply = function(a, b) {
    return a * b;
}

const divide = function(a, b) {
    return a / b;
}

const operate = function(leftNumber, operator, rightNumber) {
    if (operator === '+') return add(Number(leftNumber), Number(rightNumber));
    else if (operator === '-') return subtract(Number(leftNumber), Number(rightNumber));
    else if (operator === 'x') return multiply(Number(leftNumber), Number(rightNumber));
    else if (operator === '/') {
        if (Number(rightNumber) === 0) {
            alert("Error: Cannot divide by zero");
            leftNumber = "";
            rightNumber = "";
            operator = "";
            result = null;
            zeroError = true;
            document.querySelector(".display").innerText = "";
            return null;
        }
        return divide(Number(leftNumber), Number(rightNumber));
    }
}

const buttons = document.querySelectorAll("button");
buttons.forEach((button) => {
    button.addEventListener("click", () => {
        if (button.classList.contains("operand")) {
            if (result && !operator && shouldReset) {
                leftNumber = button.innerText;
                shouldReset = false;
                rightNumber = "";
                operator = "";
            }
            else if (zeroError) {
                leftNumber = button.innerText;
                rightNumber = "";
                operator = "";
                result = null;
                shouldReset = false;
                zeroError = false;
            }
            else if (!operator) {
                leftNumber += button.innerText;
            }
            else {
                rightNumber += button.innerText;
            }
            result = null;
        }
        else if (button.classList.contains("operator")) {
            if (rightNumber) {
                result = operate(leftNumber, operator, rightNumber);
                
                if (result === null) return;

                leftNumber = result;
                rightNumber = "";
                operator = button.innerText;
            } else if (leftNumber) {
                operator = button.innerText;
            }
        }
        else if (button.classList.contains("equal-to")) {
            if (leftNumber && operator && rightNumber) {
                result = operate(leftNumber, operator, rightNumber);

                if (result === null) return;
                
                leftNumber = result;
                operator = "";
                rightNumber = "";
                shouldReset = true;
            }
        }
        else if (button.classList.contains("clear")) {
            leftNumber = "";
            operator = "";
            rightNumber = "";
            result = null;
        }
        else if (button.classList.contains("delete")) {
            if (rightNumber) rightNumber = rightNumber.slice(0, -1);
            else if (operator) operator = "";
            else if (leftNumber) leftNumber = leftNumber.slice(0, -1);
        }
        document.querySelector('.display').innerText = leftNumber + operator + rightNumber || result || "";

    });
});