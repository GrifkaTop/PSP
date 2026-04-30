import { MainPage } from "./pages/main/index.js";
import { CalcPage } from "./pages/calc/index.js";
import { CardsPage } from "./pages/cards/index.js";
import { CardDetailPage } from "./pages/card-detail/index.js";
import { Dz1Page } from "./pages/dz1/index.js";

const root = document.getElementById('root');
let cardsPageInstance = null;
let currentHash = '';

function renderPage(page, param = null) {
    if (page === 'main') {
        new MainPage(root, navigate).render();
    } else if (page === 'calc') {
        new CalcPage(root, navigate).render();
    } else if (page === 'cards') {
        const cardsPage = new CardsPage(root, navigate);
        cardsPageInstance = cardsPage;
        cardsPage.render();
    } else if (page === 'dz1') {
        new Dz1Page(root, navigate).render();
    } else if (page === 'card-detail' && param !== null) {
        if (!cardsPageInstance) {
            cardsPageInstance = new CardsPage(root, navigate);
        }
        new CardDetailPage(root, navigate, param, cardsPageInstance).render();
    }
}

function navigate(page, param = null) {
    const hash = page === 'card-detail' && param !== null
        ? `card-detail/${param}`
        : page;
    currentHash = hash;
    location.hash = hash;
    renderPage(page, param);
}

function navigateFromHash() {
    const hash = location.hash.slice(1);
    currentHash = hash;

    if (hash === 'calc') {
        renderPage('calc');
    } else if (hash === 'cards') {
        renderPage('cards');
    } else if (hash === 'dz1') {
        renderPage('dz1');
    } else if (hash.startsWith('card-detail/')) {
        const id = parseInt(hash.split('/')[1]);
        if (!cardsPageInstance) {
            cardsPageInstance = new CardsPage(root, navigate);
        }
        renderPage('card-detail', id);
    } else {
        renderPage('main');
    }
}

window.addEventListener('hashchange', () => {
    const hash = location.hash.slice(1);
    if (hash !== currentHash) {
        navigateFromHash();
    }
});

navigateFromHash();
