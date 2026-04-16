export class FooterComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML() {
        return `
            <footer class="main-footer">
                <div class="footer-top">
                    <div class="footer-column"><h3>Издательство</h3><div class="footer-links">Отзывы<br>Об издательстве</div></div>
                    <div class="footer-column"><h3>Услуги</h3><div class="footer-links">Издание книг<br>Монография</div></div>
                </div>
                <div class="footer-bottom">Все правы незащищены - 2030 OOO "БАУМАНКА"</div>
            </footer>`;
    }

    render() {
        this.parent.insertAdjacentHTML('beforeend', this.getHTML());
    }
}