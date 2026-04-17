import { MainPage } from "./pages/main/index.js";
import { CalcPage } from "./pages/calc/index.js";
import { CardsPage } from "./pages/cards/index.js";
import { createProductCard } from './components/product-card/index.js';

const root = document.getElementById('root');

function navigate(page) {
    if (page === 'main') {
        const mainPage = new MainPage(root, navigate);
        mainPage.render();
    } else if (page === 'calc') {
        const calcPage = new CalcPage(root, navigate);
        calcPage.render();
    } else if (page === 'cards') {
        new CardsPage(root, navigate).render(); // Переход на карточки
    }
}

// Запуск приложения с главной страницы
navigate('main');