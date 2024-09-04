document.addEventListener("DOMContentLoaded", function () {
  const screen = document.getElementById("calculator-screen");
  let currentInput = "";
  let operator = "";
  let firstNumber = "";

  const clearScreen = () => {
    currentInput = "";
    operator = "";
    firstNumber = "";
    screen.textContent = "0";
  };

  const handleNumber = (num) => {
    if (currentInput === "0" && num === "0") return;
    currentInput += num;
    screen.textContent = currentInput;
  };

  const handleOperator = (op) => {
    if (firstNumber && currentInput && operator) {
      calculate();
    }
    operator = op;
    firstNumber = currentInput;
    currentInput = "";
  };

  const calculate = () => {
    let result = 0;
    const num1 = parseFloat(firstNumber);
    const num2 = parseFloat(currentInput);

    if (operator === "+") {
      result = num1 + num2;
    } else if (operator === "-") {
      result = num1 - num2;
    } else if (operator === "*") {
      result = num1 * num2;
    } else if (operator === "/") {
      result = num1 / num2;
    }

    screen.textContent = result;
    currentInput = result.toString();
    firstNumber = "";
    operator = "";
  };

  document
    .querySelector(".calculator-buttons")
    .addEventListener("click", function (e) {
      const action = e.target.dataset.action;
      const value = e.target.textContent;

      if (!action) return;

      if (action === "number") {
        handleNumber(value);
      } else if (action === "decimal") {
        if (!currentInput.includes(".")) {
          currentInput += ".";
          screen.textContent = currentInput;
        }
      } else if (action === "clear") {
        clearScreen();
      } else if (action === "backspace") {
        currentInput = currentInput.slice(0, -1);
        screen.textContent = currentInput || "0";
      } else if (action === "equals") {
        calculate();
      } else {
        handleOperator(
          action === "add"
            ? "+"
            : action === "subtract"
            ? "-"
            : action === "multiply"
            ? "*"
            : "/"
        );
      }
    });

  clearScreen();
});
