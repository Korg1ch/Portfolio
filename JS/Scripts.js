// Добавляем обработчик события после загрузки страницы
document.addEventListener('DOMContentLoaded', function() {
    // Находим кнопку Discord и элемент с именем
    const discordButton = document.querySelector('.buttonD');
    const discordName = document.querySelector('.name');
    
    // Изначально скрываем элемент name
    if (discordName) {
        discordName.style.display = 'none';
    }
    
    // Добавляем обработчик события клика для кнопки Discord
    if (discordButton) {
        discordButton.addEventListener('click', function() {
            // Скрываем кнопку
            this.style.display = 'none';
            
            // Показываем имя пользователя
            if (discordName) {
                discordName.style.display = 'block';
            }
            
            // Копируем имя пользователя в буфер обмена
            const username = document.querySelector('.korg-1-ch')?.textContent || '';
            if (username) {
                navigator.clipboard.writeText(username)
                    .then(() => {
                        console.log('Имя пользователя скопировано в буфер обмена');
                    })
                    .catch(err => {
                        console.error('Не удалось скопировать имя: ', err);
                    });
            }
        });
    }
    
    // Добавляем ручные обработчики hover для кнопок (резервный вариант)
    const allButtons = document.querySelectorAll('.b-back, .b-back2, .b-back4, .rectangle-21, .rectangle-212, .rectangle-213');
    
    allButtons.forEach(button => {
        const originalColor = getComputedStyle(button).backgroundColor;
        
        button.addEventListener('mouseenter', function() {
            console.log('Hover on button', this.className);
            this.style.backgroundColor = '#89D788';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.backgroundColor = originalColor;
        });
    });
    
    // Проверка, что стили применились
    console.log('Script loaded, buttons found:', allButtons.length);
});
