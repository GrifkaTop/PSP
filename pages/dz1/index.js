import { HeaderComponent } from "../../components/header/index.js";
import { FooterComponent } from "../../components/footer/index.js";

export class Dz1Page {
    constructor(parent, onPageChange) {
        this.parent = parent;
        this.onPageChange = onPageChange;
    }

    getHTML() {
        return `
            <main class="container">
                <h2 class="section-title" style="text-align: center; margin-bottom: 30px;">dz1</h2>
                <div class="task-wrapper">
                    <div class="merge-inputs">
                        <div class="merge-field">
                            <label for="first-array">Массив 1 (через пробел):</label>
                            <input type="text" id="first-array" class="merge-input" placeholder="например: 1 2 3">
                        </div>
                        <div class="merge-field">
                            <label for="second-array">Массив 2 (через пробел):</label>
                            <input type="text" id="second-array" class="merge-input" placeholder="например: -1 -10 20">
                        </div>
                        <button id="merge-btn" class="merge-btn">Выполнить</button>
                        <div class="merge-field">
                            <label for="result-array">Массив 3 (отсортированный):</label>
                            <input type="text" id="result-array" class="merge-input merge-result" readonly placeholder="здесь появится результат">
                        </div>
                    </div>
                </div>

                <div class="task-wrapper" style="margin-top: 30px;">
                    <div class="merge-inputs">
                        <div class="merge-field">
                            <label for="rle-input">RLE сжатие (строка):</label>
                            <input type="text" id="rle-input" class="merge-input" placeholder="например: AAABBBCCDDDDEE">
                        </div>
                        <button id="rle-btn" class="merge-btn">Сжать</button>
                        <div class="merge-field">
                            <label for="rle-output">Результат:</label>
                            <input type="text" id="rle-output" class="merge-input merge-result" readonly placeholder="здесь появится результат">
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

            const arr1 = firstRaw ? firstRaw.split(/\s+/).map(Number) : [];
            const arr2 = secondRaw ? secondRaw.split(/\s+/).map(Number) : [];
            const arr3 = [...arr1, ...arr2].sort((a, b) => b - a);

            document.getElementById('result-array').value = arr3.join(' ');
        });

        document.getElementById('rle-btn').addEventListener('click', () => {
            const input = document.getElementById('rle-input').value;
            document.getElementById('rle-output').value = rle(input);
        });

        const footer = new FooterComponent(this.parent);
        footer.render();
    }
}

function rle(str) {
    if (!str) return '';
    let result = '';
    let count = 1;
    for (let i = 1; i <= str.length; i++) {
        if (i < str.length && str[i] === str[i - 1]) {
            count++;
        } else {
            result += count > 1 ? count + str[i - 1] : 1 + str[i - 1];
            count = 1;
        }
    }
    return result;
}
