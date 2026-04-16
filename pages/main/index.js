import { HeaderComponent } from "../../components/header/index.js";
import { FooterComponent } from "../../components/footer/index.js";

export class MainPage {
    constructor(parent, onPageChange) {
        this.parent = parent;
        this.onPageChange = onPageChange;
    }

    render() {
        this.parent.innerHTML = ''; // Очистка
        const header = new HeaderComponent(this.parent);
        header.render(this.onPageChange);

        const content = `
            <section class="hero-section">
                <div class="hero-content">
                    <h1 class="hero-title">Публикация статьи ВАК с гарантией</h1>
                    <p>Издательство «ИНТЕРНЫУКА» — полное сопровождение.</p>
                </div>
                <div class="hero-icon"><i class="fas fa-book"></i></div>
            </section>
            <main class="container">
                <div class="cta-wrapper"><a href="#" class="btn-submit">Подать заявку</a></div>
                <h2 class="section-title">Наша команда</h2>
                <div class="team-list">
                    <div class="team-card">
                        <div class="team-photo"><i class="fas fa-user-cog"></i></div>
                        <div class="team-name">Григорий Александрович</div>
                        <div class="team-role admin-role">сисадмин</div>
                    </div>
                </div>
            </main>`;
        
        this.parent.insertAdjacentHTML('beforeend', content);
        
        const footer = new FooterComponent(this.parent);
        footer.render();
    }
}