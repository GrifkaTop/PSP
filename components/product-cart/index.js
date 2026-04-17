// Функция для создания карточки
export const createProductCard = (data) => {
    const card = document.createElement('div');
    card.className = 'issue-card';

    card.innerHTML = `
        <div class="image-container">
            <img src="${data.img}" alt="${data.title}" class="main-image">
            
            <div class="control-panel">
                <div class="panel-label">
                    <span>Контрольные сроки</span>
                    <div class="arrow">^</div>
                </div>
                <div class="panel-content">
                    <h3>Контрольные сроки:</h3>
                    <div class="date-row">Прием статей до: <strong>${data.deadline}</strong></div>
                    <div class="date-row">Размещение журнала: <strong>${data.releaseDate}</strong></div>
                    <div class="date-row">Загрузка в eLibrary.ru: <strong>${data.elibraryDate}</strong></div>
                    <div class="date-row">Почтовая рассылка: <strong>${data.mailDate}</strong></div>
                    <div class="date-row">Рассылка трек-номеров: <strong>${data.trackDate}</strong></div>
                </div>
            </div>
        </div>
        <div class="card-info">
            <p class="deadline">Прием статей<br><strong>до ${data.shortDeadline}</strong></p>
            <a href="${data.rulesUrl}" class="rules-link">Условия публикации</a>
        </div>
    `;

    // Логика открытия плашки
    const label = card.querySelector('.panel-label');
    const panel = card.querySelector('.control-panel');
    const image = card.querySelector('.main-image');

    label.addEventListener('click', (e) => {
        e.stopPropagation(); // Чтобы не срабатывал клик по фото
        panel.classList.toggle('is-open');
    });

    // Клик по фото (в будущем для "подробнее")
    image.addEventListener('click', () => {
        console.log(`Переход к выпуску: ${data.id}`);
        // Здесь будет твоя навигация
    });

    return card;
};