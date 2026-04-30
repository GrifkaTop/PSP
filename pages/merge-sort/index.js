import { HeaderComponent } from "../../components/header/index.js";
import { FooterComponent } from "../../components/footer/index.js";

export class MergeSortPage {
    constructor(parent, onPageChange) {
        this.parent = parent;
        this.onPageChange = onPageChange;
    }

    getHTML() {
        return `
            <main class="container">
                <h2 class="section-title" style="text-align: center; margin-bottom: 30px;">Слияние и сортировка массивов</h2>
                <div class="merge-sort-wrapper">
                    <div class="merge-inputs">
                        <div class="merge-field">
                            <label for="first-array">Первый массив (через пробел):</label>
                            <input type="text" id="first-array" class="merge-input" placeholder="например: 1 2 3">
                        </div>
                        <div class="merge-field">
                            <label for="second-array">Второй массив (через пробел):</label>
                            <input type="text" id="second-array" class="merge-input" placeholder="например: -1 -10 20">
                        </div>
                        <button id="merge-btn" class="merge-btn">Выполнить</button>
                        <div class="merge-field">
                            <label for="result-array">Результат (по убыванию):</label>
                            <input type="text" id="result-array" class="merge-input merge-result" readonly placeholder="здесь появится результат">
                        </div>
                    </div>
                </div>
            </main>
        `;
    }

    render() {
        this.parent.innerHTML = '';

        const header = new HeaderComponent(this.parent);
        header.render(this.onPageChange);

        this.parent.insertAdjacentHTML('beforeend', this.getHTML());

        document.getElementById('merge-btn').addEventListener('click', () => {
            const firstRaw = document.getElementById('first-array').value.trim();
            const secondRaw = document.getElementById('second-array').value.trim();

            const first = firstRaw ? firstRaw.split(/\s+/).map(Number) : [];
            const second = secondRaw ? secondRaw.split(/\s+/).map(Number) : [];

            const merged = [...first, ...second].sort((a, b) => b - a);
            document.getElementById('result-array').value = merged.join(' ');
        });

        const footer = new FooterComponent(this.parent);
        footer.render();
    }
}
