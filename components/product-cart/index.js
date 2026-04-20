// Функция для создания карточки
export const createProductCard = (data, onDelete = null, onDetail = null) => {
    const card = document.createElement('div');
    card.className = 'issue-card';

    card.innerHTML = `
        <div class="issue-card-wrapper">
            <div class="image-container">
                <img src="${data.img}" alt="${data.title}" class="main-image">
            </div>

            <div class="panel-label">
                <span>Контрольные сроки</span>
                <div class="arrow">></div>
            </div>
        </div>
        <div class="card-info">
            <p class="deadline">Прием статей<br><strong>до ${data.shortDeadline}</strong></p>
            <button class="btn-delete" title="Удалить карточку">🗑️</button>
        </div>
    `;

    // Логика обработчиков
    const label = card.querySelector('.panel-label');
    const imageContainer = card.querySelector('.image-container');
    const image = card.querySelector('.main-image');
    const btnDelete = card.querySelector('.btn-delete');
    let panel = null;

    // Функция для создания подробной плашки
    const createDetailedPanel = () => {
        const panelHTML = `
            <div class="control-panel is-open">
                <button class="btn-close-panel" title="Вернуться к главной плашке">← Назад</button>
                <div class="panel-content">
                    <h4 style="margin: 0 0 8px 0; font-size: 13px;">Контрольные сроки:</h4>
                    <div class="date-row">Прием статей до: <strong>${data.deadline}</strong></div>
                    <div class="date-row">Размещение журнала: <strong>${data.releaseDate}</strong></div>
                    <div class="date-row">Загрузка в eLibrary.ru: <strong>${data.elibraryDate}</strong></div>
                    <div class="date-row">Почтовая рассылка: <strong>${data.mailDate}</strong></div>
                    <div class="date-row">Рассылка трек-номеров: <strong>${data.trackDate}</strong></div>
                    <button class="btn-conditions">Условия участия</button>
                </div>
            </div>
        `;
        imageContainer.insertAdjacentHTML('afterend', panelHTML);
        panel = card.querySelector('.control-panel');

        // Обработчик для кнопки закрытия
        const btnClosePanel = panel.querySelector('.btn-close-panel');
        btnClosePanel.addEventListener('click', closeDetailedPanel);

        // Обработчик для кнопки условий участия
        const btnConditions = panel.querySelector('.btn-conditions');
        btnConditions.addEventListener('click', (e) => {
            e.stopPropagation();
            if (onDetail) {
                onDetail(data.id);
            }
        });
    };

    // Функция для закрытия подробной плашки
    const closeDetailedPanel = () => {
        if (panel) {
            panel.classList.remove('is-open');
            // Удаляем плашку мгновенно
            if (panel && panel.parentNode) {
                panel.remove();
                panel = null;
                label.style.display = 'flex';
            }
        }
    };

    // Клик на главную плашку - создать и открыть подробную
    label.addEventListener('click', (e) => {
        e.stopPropagation();
        if (!panel) {
            createDetailedPanel();
            label.style.display = 'none';
        }
    });

    // Клик по фото - переход на детальную страницу
    image.addEventListener('click', () => {
        if (onDetail) {
            onDetail(data.id);
        }
    });

    // Клик по кнопке удаления
    btnDelete.addEventListener('click', (e) => {
        e.stopPropagation();
        if (onDelete) {
            onDelete(data.id);
        }
    });

    return card;
};