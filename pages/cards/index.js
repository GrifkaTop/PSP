import { HeaderComponent } from "../../components/header/index.js";
import { FooterComponent } from "../../components/footer/index.js";
import { createProductCard } from '../../components/product-cart/index.js';
import { ajax } from '../../modules/ajax.js';
import { stockUrls } from '../../modules/stockUrls.js';

export class CardsPage {
    constructor(parent, onPageChange) {
        this.parent = parent;
        this.onPageChange = onPageChange;
        this.issuesData = [];
    }

    getData() {
        ajax.get(stockUrls.getStocks(), (data) => {
            if (data) {
                this.issuesData = data;
                this.renderData(data);
            }
        });
    }

    renderData(items) {
        const container = this.parent.querySelector('.journal-grid');
        if (!container) return;
        container.innerHTML = '';
        items.forEach(item => {
            const card = createProductCard(item,
                () => this.deleteCard(item.id),
                () => this.onPageChange('card-detail', item.id)
            );
            container.appendChild(card);
        });
    }

    getHTML() {
        return `
            <main class="container">
                <h2 class="section-title" style="text-align: center;">Карточки журналов</h2>
                <div class="journal-grid"></div>
            </main>
        `;
    }

    deleteCard(id) {
        ajax.delete(stockUrls.removeStockById(id), (data, status) => {
            if (status === 204) {
                this.issuesData = this.issuesData.filter(card => card.id !== id);
                this.renderData(this.issuesData);
            }
        });
    }

    render() {
        this.parent.innerHTML = '';

        const header = new HeaderComponent(this.parent);
        header.render(this.onPageChange);

        this.parent.insertAdjacentHTML('beforeend', this.getHTML());

        this.getData();

        const footer = new FooterComponent(this.parent);
        footer.render();
    }
}
