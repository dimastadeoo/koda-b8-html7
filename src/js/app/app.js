define(['jquery', 'calc'], function ($, calc) {

    $(function () {
        const screen = $('.result');
        let currentInput = '';
        let isCalculated = false;

        // --- FILTER TOMBOL ---
        const filNumb = $('.btn').filter(function () {
            const teks = $(this).text();
            return !isNaN(teks) || teks === '.';
        });

        const fillOperate = $('.btn').filter(function () {
            const teks = $(this).text();
            return ['+', '-', '*', '/', '%'].includes(teks);
        });

        const fillDelClearResult = $('.btn').filter(function () {
            const teks = $(this).text();
            return ['clr', 'DEL', '='].includes(teks);
        });


        // --- EVENT HANDLERS ---
        
        // Tombol Angka & Titik
        filNumb.on('click', function () {
            const value = $(this).text();

            if (isCalculated) {
                currentInput = '';
                isCalculated = false;
            }

            // Memanggil fungsi validasi desimal dari modul calculator.js
            if (value === '.' && !calc.canAddDecimal(currentInput)) {
                return; 
            }

            if (currentInput === '0' && value !== '.') {
                currentInput = value;
            } else {
                currentInput += value;
            }

            screen.text(currentInput === '' ? '0' : currentInput);
        });

        // Tombol Operator (+, -, *, /, %)
        fillOperate.on('click', function () {
            const operator = $(this).text();
            isCalculated = false;

            if (currentInput === '' && operator !== '-') return;

            const lastChar = currentInput.slice(-1);
            if (['+', '-', '*', '/', '%'].includes(lastChar)) {
                currentInput = currentInput.slice(0, -1) + operator;
            } else {
                currentInput += operator;
            }

            screen.text(currentInput);
        });

        // Tombol clr, DEL, dan Sama Dengan (=)
        fillDelClearResult.on('click', function () {
            const btn = $(this).text();

            if (btn === 'clr') {
                currentInput = '';
                screen.text('0');
            } 
            else if (btn === 'DEL') {
                if (isCalculated) {
                    currentInput = '';
                    screen.text('0');
                    isCalculated = false;
                    return;
                }
                currentInput = currentInput.slice(0, -1);
                screen.text(currentInput === '' ? '0' : currentInput);
            } 
            else {
                // Tombol "=" ditekan
                if (currentInput === '') return;

                // Memanggil fungsi hitung dari modul calculator.js
                const result = calc.calculate(currentInput);
                
                screen.text(result);
                currentInput = (result === 'Error') ? '' : result;
                isCalculated = true;
            }
        });
    });
});