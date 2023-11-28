const calculator = document.querySelector(".calculator");
const display = document.querySelector(".display");
const previous = display.querySelector(".previous");
const current = display.querySelector(".current");
const keys = calculator.querySelector(".keys");

const SYMBOL = {
  add: `\u002b`,
  subtract: `\u2212`,
  multiply: `\u00d7`,
  divide: `\u00f7`,
};

keys.addEventListener("click", (e) => {
  if (e.target.matches("button")) {
    const key = e.target;
    const action = key.dataset.action;
    const keyContent = key.textContent;
    const displayedNum = current.textContent;
    const previousKeyType = calculator.dataset.previousKeyType;
    const previousOperator = calculator.dataset.previousOperator;
    const previousValue = calculator.dataset.previousValue;

    if (!action) {
      if (displayedNum === "0" || previousKeyType === "operator") {
        current.textContent = keyContent;
      } else {
        current.textContent = displayedNum + keyContent;
      }
      calculator.dataset.previousKeyType = "number";
    } else {
      switch (action) {
        case "decimal": {
          if (!displayedNum.includes(".")) {
            current.textContent = displayedNum + ".";
          }
          calculator.dataset.previousKeyType = "decimal";
          break;
        }
        case "clear": {
          calculator.dataset.previousKeyType = "";
          calculator.dataset.previousOperator = "";
          calculator.dataset.previousValue = "";
          calculator.dataset.previousKeyType = "";
          previous.textContent = "0";
          current.textContent = "0";
          calculator.dataset.previousKeyType = "clear";
          break;
        }
        case "calculate": {
          previous.textContent = `${previous.textContent} ${displayedNum} =`;
          current.textContent = calculate(
            previousValue,
            previousOperator,
            displayedNum
          );
          calculator.dataset.previousKeyType = "calculate";
          break;
        }
        default: {
          if (
            previousValue &&
            previousOperator &&
            previousKeyType !== "operator"
          ) {
            recalculate(previousValue, previousOperator, displayedNum, action);
          } else {
            calculator.dataset.previousOperator = action;
            calculator.dataset.previousValue = displayedNum;
            previous.textContent = `${displayedNum} ${SYMBOL[action]}`;
          }

          calculator.dataset.previousKeyType = "operator";
          break;
        }
      }
    }
  }
});

const calculate = (prev, operator, curr) => {
  let result = "";

  if (operator === "add") {
    result = parseFloat(prev) + parseFloat(curr);
  } else if (operator === "subtract") {
    result = parseFloat(prev) - parseFloat(curr);
  } else if (operator === "multiply") {
    result = parseFloat(prev) * parseFloat(curr);
  } else if (operator === "divide") {
    result = parseFloat(prev) / parseFloat(curr);
  }
  return result;
};

const recalculate = (prevValue, prevOperator, nextValue, nextOperator) => {
  const countValue = calculate(prevValue, prevOperator, nextValue);
  calculator.dataset.previousOperator = nextOperator;
  calculator.dataset.previousValue = countValue;

  previous.textContent = `${countValue} ${SYMBOL[nextOperator]}`;
  current.textContent = countValue;
};
