// Функция для получения информации о пользователе
function getUserInfo() {
    const userAgent = navigator.userAgent; // Получаем информацию о браузере/устройстве
    const timestamp = new Date().toLocaleString(); // Получаем текущее время

    return {
        phoneInfo: userAgent,
        visitTime: timestamp
    };
}

// Функция для отправки данных в Discord через вебхук
function sendToDiscord(data) {
    const webhookURL = 'https://discord.com/api/webhooks/1299013641084866674/PKIfals7J4p1kYsUJCQesFHK06vZKKR_dL2T_cLvxFylqnsEweKVADcKz-N_Ej4yzNRv'; // Замените на ваш вебхук Discord

    const message = {
        content: `Новый визит:
- Телефон: ${data.phoneInfo}
- Время входа: ${data.visitTime}`
    };

    fetch(webhookURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(message)
    })
    .then(response => {
        if (response.ok) {
            console.log('Данные успешно отправлены в Discord');
        } else {
            console.error('Ошибка при отправке данных в Discord');
        }
    })
    .catch(error => {
        console.error('Ошибка при отправке запроса: ', error);
    });
}

// Получаем данные и отправляем их в Discord
window.onload = () => {
    const userData = getUserInfo();
    sendToDiscord(userData);
};


// Функция для перенаправления на первую страницу
function redirectToPage() {
    window.location.href = 'loader.html'; // Замените на нужный URL
}

// Функция для перенаправления на вторую страницу через 6 секунд
function redirectBack() {
    setTimeout(function() {
        window.location.href = 'signup.html'; // Замените на нужный URL
    }, 6000);
}

// Основная функция, вызываемая при нажатии на кнопку
function handleClick() {
    redirectToPage(); // Переход на первую страницу
    setTimeout(redirectBack, 6000); // Через 6 секунд перенаправляем на вторую страницу
}
