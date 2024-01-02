document.addEventListener("DOMContentLoaded", function () {
    // Get a reference to the calculator screen element
    const screen = document.querySelector(".calc-screen");

    let calculation = "";

    // Get all number buttons and add click event listeners
    const numberButtons = document.querySelectorAll(".calc-keys button[value]");
    numberButtons.forEach(function (numberButton) {
        numberButton.addEventListener("click", handleNumberButtonClick);
    });


    function handleNumberButtonClick() {
        // Get the value of the clicked number button
        const value = this.value;
        // Update the calculation string with the clicked value
        calculation += value;

        updateScreen();
    }


    document.querySelector(".equal-sign").addEventListener("click", calculate);


    function calculate() {
        try {
            const result = Function('"use strict"; return (' + calculation + ')')();
    
            if (!isFinite(result)) {
                throw new Error("Result is not a finite number");
            }
    
            calculation = result.toString();
            updateScreen();
        } catch (error) {
            console.error("Calculation error:", error.message);
            screen.value = "Error: " + error.message;
        }
    }


    function updateScreen() {
        screen.value = calculation;
    }


    document.querySelector(".all-clear").addEventListener("click", () => {
        // Clear the calculation string
        calculation = "";

        updateScreen();
    });


    document.querySelector(".remove").addEventListener("click", () => {
        // Remove the last character from the calculation string
        calculation = calculation.slice(0, -1);

        updateScreen();
    });
});