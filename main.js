import { MainPage } from "./pages/main/index.js";
import { CalcPage } from "./pages/calc/index.js";
import { CardsPage } from "./pages/cards/index.js";
import { CardDetailPage } from "./pages/card-detail/index.js";

const root = document.getElementById('root');
let cardsPageInstance = null;

function navigate(page, param = null) {
    if (page === 'main') {
        const mainPage = new MainPage(root, navigate);
        mainPage.render();
    } else if (page === 'calc') {
        const calcPage = new CalcPage(root, navigate);
        calcPage.render();
    } else if (page === 'cards') {
        const cardsPage = new CardsPage(root, navigate);
        cardsPageInstance = cardsPage;
        cardsPage.render();
    } else if (page === 'card-detail' && param !== null) {
        if (cardsPageInstance) {
            const detailPage = new CardDetailPage(root, navigate, param, cardsPageInstance);
            detailPage.render();
        }
    }
}

// Запуск приложения с главной страницы
navigate('main');