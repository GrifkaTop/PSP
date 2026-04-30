import { HeaderComponent } from "../../components/header/index.js";
import { FooterComponent } from "../../components/footer/index.js";

export class CardDetailPage {
    constructor(parent, onPageChange, cardId, cardsPage) {
        this.parent = parent;
        this.onPageChange = onPageChange;
        this.cardId = cardId;
        this.cardsPage = cardsPage;
        this.card = cardsPage.issuesData.find(c => c.id === cardId);
    }

    getHTML() {
        if (!this.card) {
            return `
                <main class="container">
                    <h1>Карточка не найдена</h1>
                    <button class="btn-back" id="btn-back">← Назад</button>
                </main>
            `;
        }

        return `
            <main class="container detail-page">
                <div class="detail-header">
                    <h2 class="section-title">${this.card.title}</h2>
                    <button class="btn-back" id="btn-back">← Назад</button>
                </div>

                <div class="detail-content">
                    <div class="detail-image">
                        <img src="${this.card.img}" alt="${this.card.title}" class="main-image">
                    </div>

                    <div class="detail-info">
                        <h3>Контрольные сроки</h3>
                        <table class="detail-table">
                            <tr>
                                <td>Прием статей до:</td>
                                <td><strong>${this.card.deadline}</strong></td>
                            </tr>
                            <tr>
                                <td>Размещение журнала:</td>
                                <td><strong>${this.card.releaseDate}</strong></td>
                            </tr>
                            <tr>
                                <td>Загрузка в eLibrary.ru:</td>
                                <td><strong>${this.card.elibraryDate}</strong></td>
                            </tr>
                            <tr>
                                <td>Почтовая рассылка:</td>
                                <td><strong>${this.card.mailDate}</strong></td>
                            </tr>
                            <tr>
                                <td>Рассылка трек-номеров:</td>
                                <td><strong>${this.card.trackDate}</strong></td>
                            </tr>
                        </table>

                        <button class="btn-delete-large" id="btn-delete-card">Удалить карточку</button>
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

        const btnBack = this.parent.querySelector('#btn-back');
        if (btnBack) {
            btnBack.addEventListener('click', () => this.onPageChange('cards'));
        }

        const btnDelete = this.parent.querySelector('#btn-delete-card');
        if (btnDelete) {
            btnDelete.addEventListener('click', () => {
                this.cardsPage.deleteCard(this.cardId);
                this.onPageChange('cards');
            });
        }

        const footer = new FooterComponent(this.parent);
        footer.render();
    }
}
