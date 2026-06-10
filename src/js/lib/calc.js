// js/calculator.js
define([], function () {

    function calculate(expression) {
        if (!expression) return '0';
        
        try {
            let parsedExpression = expression.replace(/%/g, '/100');
            let result = eval(parsedExpression);

            if (result % 1 !== 0) {
                result = parseFloat(result.toFixed(4));
            }

            return result.toString();
        } catch (error) {
            return 'Error';
        }
    }

    function canAddDecimal(currentInput) {
        if (currentInput.includes('.')) {
            const lastOperatorIndex = Math.max(
                currentInput.lastIndexOf('+'),
                currentInput.lastIndexOf('-'),
                currentInput.lastIndexOf('*'),
                currentInput.lastIndexOf('/')
            );

            const currentNumber = currentInput.slice(lastOperatorIndex + 1);
            if (currentNumber.includes('.')) {
                return false;
            }
        }
        return true;
    }

    return {
        calculate: calculate,
        canAddDecimal: canAddDecimal
    };
});