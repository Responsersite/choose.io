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
    if (enteredCode === "123456") {  // Замените на ваш реальный код
        // Симуляция задержки загрузки после ввода кода
        loadingElement.style.display = 'block';
        setTimeout(() => {
            alert('Код подтвержден!');
            loadingElement.style.display = 'none';
            // Перенаправление или выполнение других действий
        }, 720000); // 12 минут (12 * 60 * 1000 мс)
    } else {
        errorMessage.style.display = 'block';
    }
});

// Проверка кода при вводе
codeInput.addEventListener('input', checkCode);

// Инициализация таймера и отсчета
setInterval(updateTimer, 1000);

// Запуск таймера при загрузке
updateTimer();
