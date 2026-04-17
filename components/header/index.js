// Обязательно добавь export!
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
                <button class="nav-link" id="nav-main">Главная</button>
                <button class="nav-link" id="nav-calc">Калькулятор</button>
                <button class="nav-link" id="nav-cards">Карточки</button>
                <a href="https://github.com/GrifkaTop" class="nav-link">Про автора</a>
                <a href="https://www.internauka.org/vak" class="nav-link">Оригинал</a>
                <a href="https://www.internauka.org/journal/stud"  class="nav-link">Ориг.Карточки</a>
            </nav>
        `;
    }

    render(onPageChange) {
        this.parent.insertAdjacentHTML('afterbegin', this.getHTML());
        
        // Вешаем события на кнопки навигации
        document.getElementById('nav-main').onclick = () => onPageChange('main');
        document.getElementById('nav-calc').onclick = () => onPageChange('calc');
        document.getElementById('nav-cards').onclick = () => onPageChange('cards');
    }
}