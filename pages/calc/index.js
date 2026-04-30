import { HeaderComponent } from "../../components/header/index.js";
import { FooterComponent } from "../../components/footer/index.js";

export class CalcPage {
    constructor(parent, onPageChange) {
        this.parent = parent;
        this.onPageChange = onPageChange;
    }

    getHTML() {
        return `
            <main class="container">
                <h2 class="section-title" style="text-align: center;">Онлайн калькулятор</h2>
                
                <div class="calculator-wrapper">
                    <input type="text" id="calc-display" readonly placeholder="0">
                    
                    <div class="calc-buttons">
                        <button class="calc-btn clear" data-action="clear">C</button>
                        <button class="calc-btn operator" data-val="/">÷</button>
                        <button class="calc-btn operator" data-val="*">×</button>
                        
                        <button class="calc-btn" data-val="7">7</button>
                        <button class="calc-btn" data-val="8">8</button>
                        <button class="calc-btn" data-val="9">9</button>
                        <button class="calc-btn operator" data-val="-">-</button>
                        
                        <button class="calc-btn" data-val="4">4</button>
                        <button class="calc-btn" data-val="5">5</button>
                        <button class="calc-btn" data-val="6">6</button>
                        <button class="calc-btn operator" data-val="+">+</button>

                        <button class="calc-btn" data-val="1">1</button>
                        <button class="calc-btn" data-val="2">2</button>
                        <button class="calc-btn" data-val="3">3</button>
                        <button class="calc-btn operator" data-val="^">^</button>
                        
                        <button class="calc-btn" data-val="0">0</button>
                        <button class="calc-btn" data-val=".">.</button>
                        <button class="calc-btn equal" data-action="calculate">=</button>
                        <button class="calc-btn vak-btn" data-action="vak">ВАК₽</button>
                    </div>
                </div>
                <p class="vak-hint">ВАК₽ — введите число страниц, нажмите кнопку → стоимость публикации (500 руб/стр)</p>
            </main>
        `;
    }

    // Логика работы калькулятора (бывший calc.js)
    addListeners() {
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
                    this.calculate(display);
                }

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
    }

    calculate(display) {
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

    render() {
        this.parent.innerHTML = '';

        // 1. Рендерим Шапку
        const header = new HeaderComponent(this.parent);
        header.render(this.onPageChange);

        // 2. Рендерим Калькулятор
        this.parent.insertAdjacentHTML('beforeend', this.getHTML());
        
        // 3. Вешаем события на кнопки
        this.addListeners();

        // 4. Рендерим Подвал
        const footer = new FooterComponent(this.parent);
        footer.render();
    }
}