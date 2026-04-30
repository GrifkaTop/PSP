const display = document.getElementById('calc-display');
const buttons = document.querySelectorAll('.calc-btn');

buttons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        const val = e.target.dataset.val;
        const action = e.target.dataset.action;

        if (val) {
            if (display.value === "Ошибка") display.value = "";
            display.value += val;
        }

        if (action === 'clear') {
            display.value = "";
        }

        if (action === 'calculate') {
            calculate();
        }

        // Индивидуальная операция: расчёт стоимости публикации ВАК
        // Число на экране = количество страниц, тариф 500 руб/страница
        if (action === 'vak') {
            const pages = parseFloat(display.value);
            if (!isNaN(pages) && pages > 0) {
                display.value = pages * 500;
            } else {
                display.value = "Ошибка";
            }
        }
    });
});

function calculate() {
    if (display.value !== "") {
        try {
            if (display.value.includes("**")) throw new Error();

            let expression = display.value.replaceAll("^", "**");
            let result = eval(expression);

            if (result === Infinity || result === -Infinity || isNaN(result)) {
                throw new Error();
            }

            display.value = result;
        } catch (e) {
            display.value = "Ошибка";
        }
    }
}
