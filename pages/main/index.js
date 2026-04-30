import { HeaderComponent } from "../../components/header/index.js";
import { FooterComponent } from "../../components/footer/index.js";

export class MainPage {
    constructor(parent, onPageChange) {
        this.parent = parent;
        this.onPageChange = onPageChange;
    }

    getHTML() {
        return `
            <section class="hero-section">
                <div class="hero-content">
                    <h1 class="hero-title">Публикация статьи ВАК с гарантией, срочно от 3 дней</h1>
                    <p class="hero-description">
                        Издательство «ИНТЕРНЫУКА» оказывает услуги по публикации научных статей в журналах,
                        входящих в перечень ВАК. Полное сопровождение позволяет успешно опубликовать статью.
                    </p>
                </div>
                <div class="hero-icon">
                    <i class="fas fa-book"></i>
                </div>
            </section>

            <main class="container">
                <div class="cta-wrapper">
                    <a href="#" class="btn-submit">Подать заявку</a>
                </div>

                <h2 class="section-title">Услуга включает в себя</h2>
                <div class="services-grid">
                    <div class="service-item"><i class="far fa-file-alt"></i> Анализ статьи</div>
                    <div class="service-item"><i class="far fa-check-circle"></i> Справка о принятии к публикации</div>
                    <div class="service-item"><i class="fas fa-search"></i> Подбор журналов ВАК</div>
                    <div class="service-item"><i class="far fa-comment-dots"></i> Информирование об изменениях</div>
                    <div class="service-item"><i class="fas fa-link"></i> Ссылка на публикацию</div>
                    <div class="service-item"><i class="fas fa-project-diagram"></i> Сопровождение до публикации</div>
                    <div class="service-item"><i class="fas fa-book-open"></i> Печатный экземпляр</div>
                </div>

                <section class="team-section">
                    <h2 class="section-title" style="font-size: 24px;">Наша команда</h2>
                    <div class="team-list">
                        <div class="team-card">
                            <div class="team-photo"><i class="fas fa-robot"></i></div>
                            <div class="team-name">DEEPESIK</div>
                            <div class="team-role admin-role">главный</div>
                        </div>
                        <div class="team-card">
                            <div class="team-photo"><i class="fas fa-users"></i></div>
                            <div class="team-name">Мать и Отец</div>
                            <div class="team-role admin-role">главные спонсоры</div>
                        </div>
                        <div class="team-card">
                            <div class="team-photo"><i class="fas fa-user-cog"></i></div>
                            <div class="team-name">Григорий Александрович Топорец</div>
                            <div class="team-role admin-role">сисадмин</div>
                        </div>
                        <div class="team-card">
                            <div class="team-photo"><i class="fas fa-user-secret"></i></div>
                            <div class="team-name">Канев</div>
                            <div class="team-role admin-role">БОГ</div>
                        </div>
                        <div class="team-card">
                            <div class="team-photo"><i class="fas fa-user-md"></i></div>
                            <div class="team-name">Алик</div>
                            <div class="team-role admin-role">Ментор</div>
                        </div>
                        <div class="team-card">
                            <div class="team-photo"><i class="fas fa-female"></i></div>
                            <div class="team-name">Аксенова Мария Владимировна</div>
                            <div class="team-role admin-role">Младший научный сотрудник</div>
                        </div>
                    </div>
                </section>
            </main>
        `;
    }

    render() {
        this.parent.innerHTML = '';

        const header = new HeaderComponent(this.parent);
        header.render(this.onPageChange);

        this.parent.insertAdjacentHTML('beforeend', this.getHTML());

        const ctaBtn = this.parent.querySelector('.btn-submit');
        if (ctaBtn) {
            ctaBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.onPageChange('calc');
            });
        }

        const footer = new FooterComponent(this.parent);
        footer.render();
    }
}
