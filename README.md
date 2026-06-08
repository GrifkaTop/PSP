# Лабораторная работа №6 — Знакомство с `Promise` и `fetch`, сборка клиентской части

## Содержание отчёта

1. [Задание](#задание)
2. [Цель](#цель)
3. [Вариант и референсы](#вариант-и-референсы)
4. [Как запустить](#как-запустить)
5. [Дополнительные задания (защита)](#дополнительные-задания-защита)
    - [Задание 1. Единая обёртка над `fetch` с универсальными методами и async/await](#задание-1-единая-обёртка-над-fetch-с-универсальными-методами-и-asyncawait)
    - [Задание 2. Асинхронные очереди операций и групповое ожидание (Promise.all)](#задание-2-асинхронные-очереди-операций-и-групповое-ожидание-promiseall)
    - [Задание 3. Имитация длительной операции на сервере (setTimeout + fetch)](#задание-3-имитация-длительной-операции-на-сервере-settimeout--fetch)

---

## Задание

Лабораторная состоит из двух частей:

1. **Часть 1.** Переписать механизм взаимодействия с внешним API: заменить использование `XMLHttpRequest` из предыдущей лабораторной на современный `fetch`, основанный на промисах (`Promise`, `async/await`), и реализовать обработку нескольких параллельных асинхронных операций.
2. **Часть 2.** Собрать клиентскую часть приложения с помощью системы сборки (`Vite`), а в серверной части настроить раздачу клиентской сборки в качестве статики, чтобы уйти от проблем с CORS при разворачивании в production.

---

## Цель

- Познакомиться с объектом `Promise`, его состояниями (`pending`, `fulfilled`, `rejected`) и цепочкой методов `then / catch / finally`.
- Освоить синтаксический сахар `async / await` для линейной записи асинхронного кода.
- Перевести клиент-серверное взаимодействие с `XMLHttpRequest` на `fetch`.
- Настроить сборку фронтенда через `Vite` (команды `dev`, `build`, `preview`) и раздачу готовой сборки из `server/public/` в качестве статики бэкендом.

---

## Вариант и референсы

- **Вариант:** Инновационное издательство «ИНТЕРНЫУКА». Реализована витрина выпусков журналов с возможностью быстрого и медленного (имитация задержки) удаления, а также кнопка обновления, ожидающая завершения всех параллельных удалений с помощью `Promise.all`.
- **Сборка:** [Vite](https://vite.dev/) — выходная директория `server/public/`, конфиг в `vite.config.js`.
- **UI-фреймворк:** [Bootstrap 5](https://getbootstrap.com/) (подключён как зависимость).

---

## Как запустить

### 1. Установка зависимостей
```sh
npm install
```

### 2. Запуск в режиме разработки (Dev)
Запуск Vite dev-сервера (фронтенд) на порту 3000 и бэкенда на порту 3001:
```sh
npm run start
```
*(Или в отдельных консолях: `npm run dev` для фронтенда и `npm run server` для бэкенда).*

### 3. Сборка для Production
```sh
npm run build
```
В директории `server/public/` появится готовый скомпилированный фронтенд. Сервер на порту 3001 будет раздавать его как статику по адресу http://localhost:3001.

---

## Дополнительные задания (защита)

### Задание 1. Единая обёртка над `fetch` с универсальными методами и async/await

**Вопрос:** «Как вынести работу с `fetch` в отдельный класс-сервис, чтобы логика обработки ответов (включая пустые тела ответов, например, при статусе 204) была централизована?»

**Реализация:**
Создан класс `Ajax` в `modules/ajax.js`, который оборачивает вызовы `fetch` и возвращает результат в едином формате `{ data, status }`. Пустые тела ответов (статус 204) корректно обрабатываются:

```js
// modules/ajax.js
class Ajax {
    async get(url) {
        try {
            const response = await fetch(url);
            const data = response.status !== 204 ? await response.json() : null;
            return { data, status: response.status };
        } catch (e) {
            console.error('Ошибка запроса GET:', e);
            return { data: null, status: 0 };
        }
    }

    async delete(url) {
        try {
            const response = await fetch(url, { method: 'DELETE' });
            const data = response.status !== 204 ? await response.json() : null;
            return { data, status: response.status };
        } catch (e) {
            console.error('Ошибка запроса DELETE:', e);
            return { data: null, status: 0 };
        }
    }
}

export const ajax = new Ajax();
```

---

### Задание 2. Асинхронные очереди операций и групповое ожидание (Promise.all)

**Вопрос:** «Как на клиенте реализовать логику, при которой пользователь может отправить несколько запросов на удаление (как быстрых, так и медленных), а кнопка "Обновить" заблокируется и дождётся выполнения всех отправленных запросов перед перезагрузкой списка?»

**Реализация:**
В классе `CardsPage` объявлен массив `pendingDeletes` для хранения промисов активных удалений. При старте удаления промис регистрируется в очереди с помощью метода `addPendingDelete()`, а при завершении удаляется оттуда через `finally()`. Кнопка «Обновить» использует `Promise.all` для ожидания всех промисов:

```js
// pages/cards/index.js
constructor(parent, onPageChange) {
    this.parent = parent;
    this.onPageChange = onPageChange;
    this.issuesData = [];
    this.pendingDeletes = []; // Очередь промисов удаления
}

addPendingDelete(promise) {
    this.pendingDeletes.push(promise);
    this._syncRefreshBtn();
    promise.finally(() => {
        this.pendingDeletes = this.pendingDeletes.filter(p => p !== promise);
        this._syncRefreshBtn();
    });
}

// Слушатель кнопки "Обновить"
refreshBtn.addEventListener('click', async () => {
    refreshBtn.disabled = true;
    refreshBtn.classList.add('loading');

    if (this.pendingDeletes.length > 0) {
        refreshBtn.textContent = `Ожидание (${this.pendingDeletes.length})...`;
        await Promise.all([...this.pendingDeletes]); // Групповое ожидание
    }

    refreshBtn.textContent = 'Загрузка...';
    await this.getData();

    refreshBtn.classList.remove('loading');
    refreshBtn.disabled = false;
    refreshBtn.textContent = 'Обновить';
});
```

---

### Задание 3. Имитация длительной операции на сервере (setTimeout + fetch)

**Вопрос:** «Как на стороне сервера имитировать долгую обработку запроса (например, 10 секунд), чтобы проверить логику ожидания на клиенте?»

**Реализация:**
На сервере в `stocksController.js` реализован метод `deleteStockDelayed`, который осуществляет удаление карточки внутри `setTimeout` с задержкой в 10 секунд (10000 мс). В течение этого времени HTTP-соединение остаётся открытым, и отправленный клиентом `fetch` висит в состоянии `pending`:

```js
// server/src/controllers/stocksController.js
const deleteStockDelayed = (req, res) => {
    const id = parseInt(req.params.id);
    const stock = stocksService.findOne(id);
    if (!stock) {
        return res.status(404).json({ error: 'Карточка не найдена' });
    }
    
    // Имитация долгого удаления — задержка 10 секунд
    setTimeout(() => {
        const success = stocksService.remove(id);
        if (!success) {
            return res.status(404).json({ error: 'Карточка не найдена' });
        }
        res.status(204).send();
    }, 10000);
};
```
