import { HeaderComponent } from "../../components/header/index.js";
import { FooterComponent } from "../../components/footer/index.js";

export class CalcPage {
    constructor(parent, onPageChange) {
        this.parent = parent;
        this.onPageChange = onPageChange;
    }

    render() {
        this.parent.innerHTML = '';
        new HeaderComponent(this.parent).render(this.onPageChange);

        const calcHTML = `
            <main class="container">
                <h2 class="section-title" style="text-align: center;">Онлайн калькулятор</h2>
                <div class="calculator-wrapper">
                    <input type="text" id="calc-display" readonly placeholder="0">
                    <div class="calc-buttons" id="btns-container">
                        </div>
                </div>
            </main>`;
        
        this.parent.insertAdjacentHTML('beforeend', calcHTML);
        // Здесь вы можете вызвать логику калькулятора или отрисовать кнопки
        
        new FooterComponent(this.parent).render();
    }
}