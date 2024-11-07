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
  
      // Активируем кнопку перехода к оплате
      const checkoutBtn = document.getElementById('checkout-btn');
    checkoutBtn.href = "card.html"; 
    });
  });
  
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
  