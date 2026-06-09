# ЛР №5. Добавление AJAX-запросов к API

## Содержание

1. [Задание](#задание)
2. [Цель](#цель)
3. [Вариант и референсы](#вариант-и-референсы)
4. [Дополнительные задания с защиты](#дополнительные-задания-с-защиты)
    - [Задание 1. Фильтрация карточек по дате дедлайна через GET-запрос к API](#задание-1-фильтрация-карточек-по-дате-дедлайна-через-get-запрос-к-api)
    - [Задание 2. Удаление карточки через DELETE-запрос к API](#задание-2-удаление-карточки-через-delete-запрос-к-api)
    - [Задание 3. Решение проблемы CORS при локальной разработке](#задание-3-решение-проблемы-cors-при-локальной-разработке)

---

## Задание

Перевести клиентскую часть приложения на взаимодействие с внешним API через `XMLHttpRequest`:

1. Реализовать отдельный слой `modules` для работы с сетью:
    - модуль с эндпоинтами API (`modules/stockUrls.js`);
    - модуль-обёртку над `XMLHttpRequest` с методами `GET`, `POST`, `PATCH`, `DELETE` (`modules/ajax.js`).
2. Главную страницу списка перевести с отрисовки из статического объекта на получение списка карточек из API.
3. Страницу отдельной карточки перевести на получение данных по `id` из API.
4. Выполнить задания по своему варианту (фильтрация по дате дедлайна и удаление карточек).
5. Разобраться с политикой CORS и настроить заголовки на стороне сервера, чтобы запросы доходили до сервера.

---

## Цель

Изучить механизм AJAX-запросов в браузере, научиться взаимодействовать с внешним API из клиентского кода без перезагрузки страницы, а также вынести работу с сетью в отдельный слой приложения, чтобы страницы оставались ответственными только за отрисовку и пользовательское взаимодействие.

---

## Вариант и референсы

**Вариант:** Тема — инновационное издательство «ИНТЕРНЫУКА». Реализована фильтрация карточек по дате дедлайна (показ карточек с дедлайном не раньше выбранной даты) и удаление карточек через API.

Референсы и вспомогательные материалы:
- [MDN — XMLHttpRequest](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest) — базовая документация по XHR.
- [MDN — CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS) — политика межсайтовых запросов.
- Сайт издательства «Интерньука»: https://www.internauka.org/

---

## Дополнительные задания с защиты

### Задание 1. Фильтрация карточек по дате дедлайна через GET-запрос к API

**Вопрос:** «Добавьте на страницу списка выпусков фильтр по дате, отправляющий запрос на бэкенд, и отфильтруйте на сервере карточки по условию "дедлайн больше или равен выбранной дате"».

**Реализация:**
В интерфейс добавлен инпут даты. На клиенте (`pages/cards/index.js`) при клике на кнопку «Фильтровать» дата переводится в формат `dd.mm.yyyy` и запрашивается эндпоинт `/stocks/date/:date`:

```js
// modules/stockUrls.js
getStocksByDate(date) {
    return `${this.baseUrl}/stocks/date/${date}`;
}
```

```js
// pages/cards/index.js
filterBtn.addEventListener('click', () => {
    const value = filterInput.value;
    if (!value) {
        this.renderData(this.issuesData);
    } else {
        const [year, month, day] = value.split('-');
        const formatted = `${day}.${month}.${year}`;
        this.getDataByDate(formatted);
    }
});

getDataByDate(date) {
    ajax.get(stockUrls.getStocksByDate(date), (data) => {
        if (data) {
            this.renderData(data);
        }
    });
}
```

На бэкенде в `stocksController.js` дата парсится, валидируется и производится фильтрация карточек:

```js
// server/src/controllers/stocksController.js
const parseDate = (str) => {
    const [day, month, year] = str.split('.');
    return new Date(year, month - 1, day);
};

const getDateStocks = (req, res) => {
    const { date } = req.params;
    const targetDate = parseDate(date);
    if (isNaN(targetDate.getTime())) {
        return res.status(400).json({ error: 'дата фигня' });
    }
    const stocks = stocksService.findAll();
    const result = stocks.filter(stock =>
        parseDate(stock['deadline']).getTime() >= targetDate.getTime()
    );
    res.json(result);
};
```

---

### Задание 2. Удаление карточки через DELETE-запрос к API

**Вопрос:** «Как реализовано удаление карточки через API, и как клиент реагирует на успешное удаление?»

**Реализация:**
В `modules/ajax.js` реализован метод `delete`, отправляющий запрос методом `DELETE`. При возврате статус-кода `204 No Content` клиент обновляет локальный массив карточек и перерисовывает витрину:

```js
// modules/ajax.js
delete(url, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open('DELETE', url);
    xhr.send();

    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
            this._handleResponse(xhr, callback);
        }
    };
}
```

```js
// pages/cards/index.js
deleteCard(id) {
    ajax.delete(stockUrls.removeStockById(id), (data, status) => {
        if (status === 204) {
            this.issuesData = this.issuesData.filter(card => card.id !== id);
            this.renderData(this.issuesData);
        }
    });
}
```
