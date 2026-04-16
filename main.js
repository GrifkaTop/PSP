import { MainPage } from "./pages/main/index.js";
import { CalcPage } from "./pages/calc/index.js";

const root = document.getElementById('root');

function navigate(page) {
    if (page === 'main') {
        const mainPage = new MainPage(root, navigate);
        mainPage.render();
    } else if (page === 'calc') {
        const calcPage = new CalcPage(root, navigate);
        calcPage.render();
    }
}

// Запуск приложения с главной страницы
navigate('main');