import { HeaderComponent } from "../../components/header/index.js";
import { FooterComponent } from "../../components/footer/index.js";
import { createProductCard } from '../../components/product-cart/index.js';

const DEFAULT_CARDS = [
    {
        id: 14,
        img: 'assets/images/1.png',
        title: 'Выпуск 14',
        deadline: '19.04.2026',
        shortDeadline: '19 апреля 2026',
        releaseDate: '28.04.2026',
        elibraryDate: '04.05.2026',
        mailDate: '07.05.2026',
        trackDate: '16.05.2026',
        rulesUrl: '#'
    },
    {
        id: 15,
        img: 'assets/images/2.png',
        title: 'Выпуск 15',
        deadline: '26.04.2026',
        shortDeadline: '26 апреля 2026',
        releaseDate: '05.05.2026',
        elibraryDate: '12.05.2026',
        mailDate: '15.05.2026',
        trackDate: '23.05.2026',
        rulesUrl: '#'
    },
    {
        id: 16,
        img: 'assets/images/3.png',
        title: 'Выпуск 16',
        deadline: '03.05.2026',
        shortDeadline: '3 мая 2026',
        releaseDate: '12.05.2026',
        elibraryDate: '19.05.2026',
        mailDate: '22.05.2026',
        trackDate: '30.05.2026',
        rulesUrl: '#'
    },
    {
        id: 17,
        img: 'assets/images/4.png',
        title: 'Выпуск 17',
        deadline: '10.05.2026',
        shortDeadline: '10 мая 2026',
        releaseDate: '19.05.2026',
        elibraryDate: '26.05.2026',
        mailDate: '29.05.2026',
        trackDate: '06.06.2026',
        rulesUrl: '#'
    },
    {
        id: 18,
        img: 'assets/images/5.png',
        title: 'Выпуск 18',
        deadline: '17.05.2026',
        shortDeadline: '17 мая 2026',
        releaseDate: '26.05.2026',
        elibraryDate: '02.06.2026',
        mailDate: '05.06.2026',
        trackDate: '13.06.2026',
        rulesUrl: '#'
    },
    {
        id: 19,
        img: 'assets/images/6.png',
        title: 'Выпуск 19',
        deadline: '24.05.2026',
        shortDeadline: '24 мая 2026',
        releaseDate: '02.06.2026',
        elibraryDate: '09.06.2026',
        mailDate: '12.06.2026',
        trackDate: '20.06.2026',
        rulesUrl: '#'
    }
];

export class CardsPage {
    constructor(parent, onPageChange) {
        this.parent = parent;
        this.onPageChange = onPageChange;
        this.issuesData = this.loadCards();
    }

    loadCards() {
        const saved = localStorage.getItem('issuesData');
        if (saved) return JSON.parse(saved);
        return DEFAULT_CARDS.map(c => ({ ...c }));
    }

    saveCards() {
        localStorage.setItem('issuesData', JSON.stringify(this.issuesData));
    }

    getHTML() {
        return `
            <main class="container">
                <h2 class="section-title" style="text-align: center;">Карточки журналов</h2>
                <div class="journal-grid"></div>
                <button class="btn-add-new" id="btn-add-new" title="Добавить карточку">+</button>
            </main>
        `;
    }

    deleteCard(id) {
        this.issuesData = this.issuesData.filter(card => card.id !== id);
        this.saveCards();
        this.render();
    }

    addNewCard() {
        const newId = Math.max(...this.issuesData.map(c => c.id)) + 1;
        this.issuesData.push({
            id: newId,
            img: 'assets/images/7.png',
            title: `Выпуск ${newId}`,
            deadline: '31.05.2026',
            shortDeadline: '31 мая 2026',
            releaseDate: '09.06.2026',
            elibraryDate: '16.06.2026',
            mailDate: '19.06.2026',
            trackDate: '27.06.2026',
            rulesUrl: '#'
        });
        this.saveCards();
        this.render();
    }

    render() {
        this.parent.innerHTML = '';

        const header = new HeaderComponent(this.parent);
        header.render(this.onPageChange);

        this.parent.insertAdjacentHTML('beforeend', this.getHTML());

        const container = this.parent.querySelector('.journal-grid');
        if (container) {
            this.issuesData.forEach(item => {
                const card = createProductCard(item,
                    () => this.deleteCard(item.id),
                    () => this.onPageChange('card-detail', item.id)
                );
                container.appendChild(card);
            });
        }

        const btnAddNew = this.parent.querySelector('#btn-add-new');
        if (btnAddNew) {
            btnAddNew.addEventListener('click', () => this.addNewCard());
        }

        const footer = new FooterComponent(this.parent);
        footer.render();
    }
}
