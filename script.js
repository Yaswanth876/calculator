// Get display box
const display = document.getElementById("display");

// Get all buttons
const buttons = document.querySelectorAll("button");

// Variable to store current input
let currentInput = "";

// Loop through all buttons
buttons.forEach(button => {
    button.addEventListener("click", () => {
        let value = button.textContent;

        // Clear button
        if (value === "C") {
            currentInput = "";
            display.value = "";
        }
        // Plus or minus button
        else if (value === "+/-") {
            if (currentInput) { // Check if there's current input
                if (currentInput.startsWith("-")) {
                    currentInput = currentInput.slice(1); // Remove minus sign
                }
                else {
                    currentInput = "-" + currentInput; // Add minus sign
                }
                display.value = currentInput;
            }
        }   
        // Equals button
        else if (value === "=") {
            try {
                currentInput = eval(currentInput).toString();
                display.value = currentInput;
            } catch {
                display.value = "Error";
                currentInput = "";
            }
        }

        // Decimal point logic
        else if (value === ".") {
            let lastNumber = currentInput.split(/[\+\-\*\/]/).pop(); 
            if (!lastNumber.includes(".")) {
                currentInput += value;
                display.value = currentInput;
            }
        }

        // Operators
        else if (isOperator(value)) {
            if (currentInput !== "" && !isOperator(currentInput.slice(-1))) {
                currentInput += value;
                display.value = currentInput;
            }
        }

        // Numbers
        else {
            currentInput += value;
            display.value = currentInput;
        }
    });
});
// Helper function
function isOperator(char) {
    return ["+", "-", "*", "/"].includes(char);
}

document.addEventListener("keydown", (event) => {
    let key = event.key;

    if (!isNaN(key)) { // If it's a number
        currentInput += key;
        display.value = currentInput;
    }
    else if (["+", "-", "*", "/"].includes(key)) { // Operators
        if (currentInput !== "" && !isOperator(currentInput.slice(-1))) {
            currentInput += key;
            display.value = currentInput;
        }
    }
    else if (key === ".") { // Decimal
        let lastNumber = currentInput.split(/[\+\-\*\/]/).pop(); 
        if (!lastNumber.includes(".")) {
            currentInput += key;
            display.value = currentInput;
        }
    }
    else if (key === "Enter" || key === "=") { // Equals
        try {
            currentInput = eval(currentInput).toString();
            display.value = currentInput;
        } catch {
            display.value = "Error";
            currentInput = "";
        }
    }
    else if (key === "Backspace") { // Delete last char
        currentInput = currentInput.slice(0, -1);
        display.value = currentInput;
    }
    else if (key.toLowerCase() === "c") { // Clear with 'C'
        currentInput = "";
        display.value = "";
    }
});

const toggleSwitch = document.getElementById("theme-toggle");

// Default theme
document.body.classList.add("light");

// Listen for switch toggle
toggleSwitch.addEventListener("change", () => {
    if (toggleSwitch.checked) {
        document.body.classList.remove("light");
        document.body.classList.add("dark");
    } else {
        document.body.classList.remove("dark");
        document.body.classList.add("light");
    }
});

