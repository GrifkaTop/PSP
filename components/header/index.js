export class HeaderComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML() {
        return `
            <header class="main-header">
                <div class="logo">ИНТЕРНЫУКА</div>
                <div class="contact-info">
                    <div><i class="far fa-envelope"></i> gmail@gmail.com</div>
                    <div class="contact-phone"><i class="fas fa-phone"></i> 88888888</div>
                </div>
            </header>
            <nav class="main-nav">
                <button class="nav-link btn-link" id="nav-main">Главная</button>
                <button class="nav-link btn-link" id="nav-calc">Калькулятор</button>
                <a href="https://github.com/GrifkaTop" class="nav-link">Про автора</a>
            </nav>`;
    }

    render(onPageChange) {
        this.parent.insertAdjacentHTML('beforeend', this.getHTML());
        document.getElementById('nav-main').addEventListener('click', () => onPageChange('main'));
        document.getElementById('nav-calc').addEventListener('click', () => onPageChange('calc'));
    }
}