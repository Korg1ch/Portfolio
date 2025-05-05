// Скрипт переключения мобильной/десктопной версии
function checkWindowWidth() {
    // Используем несколько способов определения ширины для надежности
    const screenWidth = screen.width;
    const outerWidth = window.outerWidth;
    const clientWidth = document.documentElement.clientWidth;
    
    // Выбираем наиболее подходящее значение
    const windowWidth = Math.min(screenWidth, outerWidth, clientWidth);
    
    const currentPage = window.location.pathname.split('/').pop();
    
    // Добавляем проверку для предотвращения циклического перенаправления
    const isRedirecting = sessionStorage.getItem('redirecting');
    
    if (isRedirecting) {
        sessionStorage.removeItem('redirecting');
        return;
    }
    
    // Фиксируем в журнал для отладки
    console.log("Определена ширина: " + windowWidth + ", текущая страница: " + currentPage);
    
    if (windowWidth < 1600) {
        if (currentPage !== 'Mindex.html' && currentPage !== '') {
            sessionStorage.setItem('redirecting', 'true');
            window.location.href = 'Mindex.html';
        }
    } else {
        if (currentPage === 'Mindex.html') {
            sessionStorage.setItem('redirecting', 'true');
            window.location.href = 'index.html';
        }
    }
}

// Запускаем после полной загрузки страницы
window.addEventListener('load', function() {
    // Первая проверка после небольшой задержки
    setTimeout(checkWindowWidth, 100);
    
    // Периодическая проверка с меньшей частотой
    setInterval(checkWindowWidth, 1000);
});