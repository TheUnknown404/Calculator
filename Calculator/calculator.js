document.addEventListener("DOMContentLoaded", function () {
    // Select the calculator screen
    const screen = document.querySelector(".calc-screen");

    // Initialize the calculation string
    let calculation = "";

    // Add click event listeners to number buttons
    const numberButtons = document.querySelectorAll(".calc-keys button[value]");
    numberButtons.forEach(function (numberButton) {
        numberButton.addEventListener("click", handleNumberButtonClick);
    });

    // Handle number button clicks
    function handleNumberButtonClick() {
        const value = this.value;
        calculation += value;
        updateScreen();
    }

    // Add click event listener for the equal sign
    document.querySelector(".equal-sign").addEventListener("click", calculate);

    // Perform the calculation
    function calculate() {
        try {
            // Evaluate the calculation string
            const result = Function('"use strict"; return (' + calculation + ')')();

            // Check if the result is a finite number
            if (!isFinite(result)) {
                throw new Error("Result is not a finite number");
            }

            // Display the previous calculation
            document.querySelector('.previous-calculation').innerHTML = calculation;

            // Update the calculation and screen with the result
            calculation = result.toString();
            updateScreen();
        } catch (error) {
            // Handle calculation errors
            console.error("Calculation error:", error.message);
            screen.value = "Error: See Console For More";
        }
    }

    // Update the screen with the current calculation
    function updateScreen() {
        screen.value = calculation;
    }

    // Add click event listener for the "All Clear" button
    document.querySelector(".all-clear").addEventListener("click", () => {
        // Clear the calculation and previous calculation display
        calculation = "";
        document.querySelector('.previous-calculation').innerHTML = "";
        updateScreen();
    });

    // Add click event listener for the "Remove" button
    document.querySelector(".remove").addEventListener("click", () => {
        // Remove the last character from the calculation string
        calculation = calculation.slice(0, -1);
        updateScreen();
    });
});