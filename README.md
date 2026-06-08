# ЛР 3. Простое web-приложение на JavaScript + Bootstrap (многостраничное SPA)

## Содержание

- [Задание](#задание)
- [Цель работы](#цель-работы)
- [Вариант и референсы](#вариант-и-референсы)
- [Структура проекта](#структура-проекта)
- [Краткое описание реализации](#краткое-описание-реализации)
- [Доп. вопросы на защите и доработки (3 шт.)](#доп-вопросы-на-защите-и-доработки-3-шт)

## Задание

1. Реализовать простое многостраничное веб-приложение (SPA) на **чистом JavaScript**.
2. Подключить и использовать CSS/JS компоненты **Bootstrap**.
3. На главной странице вывести информационную витрину издательства. На отдельной вкладке вывести список/витрину элементов (в проекте — **карточки выпусков журналов**).
4. По клику на элемент открывать страницу подробностей (деталей выпуска).
5. Реализовать кнопку возврата на страницу списка.
6. Добавить интерактивный компонент (в проекте — **выдвижная панель с контрольными сроками внутри карточки**).

## Цель работы

- Познакомиться с основами модульной структуры проекта и разделением на **pages** и **components**.
- Закрепить работу с **DOM API** (`getElementById`, `insertAdjacentHTML`, `addEventListener`, `createElement`).
- Реализовать клиентскую маршрутизацию без перезагрузки страниц (SPA на хэшах).
- Научиться сохранять состояние приложения на клиенте через `localStorage`.

## Вариант и референсы

**Вариант:** Тема — инновационное издательство «ИНТЕРНЫУКА». Интерактивный компонент — кастомная выдвижная информационная панель в карточке товара, отображающая даты и сроки.

**Референсы:**
- Сайт издательства «Интерньука»: https://www.internauka.org/
- Документация Bootstrap 5: https://getbootstrap.com/docs/5.3/

---

## Структура проекта

Ключевые директории и файлы:

- `index.html` — корневой HTML + подключение стилей и Bootstrap CDN.
- `main.js` — точка входа, инициализация роутинга на основе хэшей (`hashchange`).
- `pages/`
  - `main/index.js` — `MainPage` (главная страница с описанием услуг и командой).
  - `calc/index.js` — `CalcPage` (страница калькулятора).
  - `cards/index.js` — `CardsPage` (страница списка выпусков журналов).
  - `card-detail/index.js` — `CardDetailPage` (подробное описание выбранного выпуска с возможностью удаления).
- `components/`
  - `header/index.js` — `HeaderComponent` (шапка сайта и навигационные кнопки).
  - `footer/index.js` — `FooterComponent` (подвал сайта с контактами).
  - `product-cart/index.js` — `createProductCard` (компонент карточки выпуска с логикой выдвижной панели).
- `assets/css/` — таблицы стилей (`style.css`, `main.css`, `calc.css`, `cards.css`).

---

## Краткое описание реализации

### Главная страница (`MainPage`)
Отображает рекламные блоки, перечень услуг издательства и карточки нашей команды. Содержит призыв к действию (CTA), перенаправляющий на калькулятор.

### Страница списка выпусков (`CardsPage`)
- Загружает выпуски из `localStorage` (или использует дефолтный массив `DEFAULT_CARDS`).
- Отрисовывает сетку карточек выпусков с помощью компонента `createProductCard`.
- Реализует добавление новой карточки в список с автоинкрементом ID по клику на плавающую кнопку `+`.

### Выдвижная панель карточки (`createProductCard`)
- Рендерит базовую обложку выпуска.
- При клике на ярлык «Контрольные сроки» динамически создаёт и показывает панель с подробными датами, сдвигая её на экран.
- Имеет кнопку удаления карточки и кнопку перехода на детальную страницу.

### Страница деталей (`CardDetailPage`)
- Находится по хэш-маршруту `#card-detail/{id}`.
- Отображает подробную таблицу контрольных сроков конкретного выпуска и большую кнопку для его удаления из базы.

---

## Доп. вопросы на защите и доработки

### 1) Как реализовано динамическое добавление и удаление карточек с сохранением состояния (CRUD + LocalStorage)?

Данные о выпусках хранятся в `issuesData`. При инициализации страницы мы считываем массив из `localStorage`. Добавление вычисляет максимальный текущий `id`, добавляет новую запись и перезаписывает хранилище. Удаление фильтрует массив и инициирует повторный рендер:

```js
loadCards() {
    const saved = localStorage.getItem('issuesData');
    if (saved) return JSON.parse(saved);
    return DEFAULT_CARDS.map(c => ({ ...c }));
}

addNewCard() {
    const newId = Math.max(...this.issuesData.map(c => c.id)) + 1;
    this.issuesData.push({
        id: newId,
        img: 'assets/images/7.png',
        title: `Выпуск ${newId}`,
        deadline: '31.05.2026',
        // ...
    });
    this.saveCards();
    this.render();
}

deleteCard(id) {
    this.issuesData = this.issuesData.filter(card => card.id !== id);
    this.saveCards();
    this.render();
}
```

### 2) Как устроена маршрутизация в приложении без перезагрузки страниц (Hash Routing)?

В `main.js` навешивается глобальный слушатель события `hashchange`. При изменении адреса (например, с `#cards` на `#card-detail/15`) парсится текущий хэш, извлекаются параметры (ID карточки), очищается корневой контейнер `#root` и рендерится соответствующий класс страницы:

```js
function navigateFromHash() {
    const hash = location.hash.slice(1);
    currentHash = hash;

    if (hash === 'calc') {
        renderPage('calc');
    } else if (hash === 'cards') {
        renderPage('cards');
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
```

### 3) Как работает выдвижная панель с контрольными сроками внутри карточки товара (`createProductCard`)?

При клике на ярлык «Контрольные сроки» (`.panel-label`) вызывается метод `createDetailedPanel()`, который динамически генерирует HTML-разметку панели и встраивает её в DOM с помощью `insertAdjacentHTML('afterend', panelHTML)`. При нажатии на кнопку закрытия внутри панели элемент уничтожается вызовом `.remove()`, возвращая карточке исходный вид:

```js
const createDetailedPanel = () => {
    const panelHTML = `
        <div class="control-panel is-open">
            <button class="btn-close-panel" title="Вернуться к главной плашке">← Назад</button>
            <div class="panel-content">
                <h4 style="margin: 0 0 8px 0; font-size: 13px;">Контрольные сроки:</h4>
                <div class="date-row">Прием статей до: <strong>${data.deadline}</strong></div>
                ...
                <button class="btn-conditions">Условия участия</button>
            </div>
        </div>
    `;
    imageContainer.insertAdjacentHTML('afterend', panelHTML);
    panel = card.querySelector('.control-panel');
    
    const btnClosePanel = panel.querySelector('.btn-close-panel');
    btnClosePanel.addEventListener('click', closeDetailedPanel);
    
    // ...
};

const closeDetailedPanel = () => {
    if (panel && panel.parentNode) {
        panel.remove();
        panel = null;
        label.style.display = 'flex';
    }
};
```
