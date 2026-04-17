import { HeaderComponent } from "../../components/header/index.js";
import { FooterComponent } from "../../components/footer/index.js";
import { ProductCardComponent } from "../../components/product-card/index.js";
//import { ProductPage } from "../product/index.js"; // Для перехода
import { createProductCard } from '../../components/product-card/index.js';

const issuesData = [
    {
        id: 14,
        img: 'path/to/img14.jpg',
        deadline: '19.04.2026',
        shortDeadline: '19 апреля 2026',
        releaseDate: '28.04.2026',
        elibraryDate: '04.05.2026',
        mailDate: '07.05.2026',
        trackDate: '16.05.2026',
        rulesUrl: '#'
    }
    // ... другие выпуски
];

const container = document.querySelector('.journal-grid'); // Убедись, что такой есть в HTML
issuesData.forEach(item => {
    container.appendChild(createProductCard(item));
});