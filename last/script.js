function loadComponent(file, elementId) {
    fetch(file)
        .then(response => response.text())
        .then(data => {
            document.getElementById(elementId).innerHTML = data;
        })
        .catch(err => console.error("Ошибка загрузки: " + file));
}

// Вызываем загрузку для шапки и подвала
loadComponent('header.html', 'header-placeholder');
loadComponent('footer.html', 'footer-placeholder'); 