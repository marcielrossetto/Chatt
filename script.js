function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');

    if (overlay.style.display === 'block') {
        sidebar.style.right = '-250px';
        overlay.style.display = 'none';
    } else {
        sidebar.style.right = '0';
        overlay.style.display = 'block';
    }
}

function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const message = messageInput.value.trim();

    if (message) {
        const messageData = {
            from: userName,
            to: destination,
            text: message,
            type: visibility === 'Reservadamente' ? 'private_message' : 'message'
        };

        axios.post(`https://mock-api.driven.com.br/api/v6/uol/messages/${UUID}`, messageData)
            .then(() => {
                messageInput.value = '';
                loadMessages(); // Recarrega as mensagens após o envio
            })
            .catch(() => location.reload());
    }
}

document.getElementById('messageInput').addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        sendMessage(); // Envia a mensagem quando pressionar "Enter"
    }
});

const UUID = "e4ec1db4-1587-492a-945f-6cc04b0b533d"; // Define UUID
let userName = "";
let visibility = "Todos"; // Definido como "Todos" por padrão
let destination = "Todos"; // Definido como "Todos" por padrão

function promptUserName() {
    userName = prompt("Digite seu lindo nome:");
    enterRoom();
}

function enterRoom() {
    axios.post(`https://mock-api.driven.com.br/api/v6/uol/participants/${UUID}`, { name: userName })
        .then(() => {
            console.log("Entrou na sala com sucesso!");
            startChat();
        })
        .catch(() => {
            console.log("Nome de usuário já existe, escolha outro.");
            promptUserName(); // Se o nome já existir, pede novamente
        });
}

function startChat() {
    setInterval(() => keepAlive(), 5000);
    setInterval(() => loadMessages(), 3000);
    setInterval(() => loadParticipants(), 10000);
    loadMessages();
    loadParticipants();
}

function keepAlive() {
    axios.post(`https://mock-api.driven.com.br/api/v6/uol/status/${UUID}`, { name: userName })
        .catch(() => location.reload());
}

function loadMessages() {
    axios.get(`https://mock-api.driven.com.br/api/v6/uol/messages/${UUID}`)
        .then(response => {
            const messages = response.data;
            const chatContainer = document.getElementById("chatContainer");
            chatContainer.innerHTML = "";

            messages.forEach(message => {
                if (message.type === "private_message" && message.to !== userName && message.from !== userName) return;

                const messageElement = document.createElement("div");
                messageElement.classList.add("mensagem");

                if (message.type === "status") {
                    messageElement.classList.add("status");
                    messageElement.style.backgroundColor = "gray";
                } else if (message.type === "private_message") {
                    messageElement.classList.add("reservada");
                    messageElement.style.backgroundColor = "red";
                } else {
                    messageElement.classList.add("publica");
                    messageElement.style.backgroundColor = "white";
                }

                messageElement.innerHTML = `<span>${message.time}</span> <strong>${message.from}</strong> para <strong>${message.to}</strong>: ${message.text}`;
                chatContainer.appendChild(messageElement);
            });

            chatContainer.lastElementChild?.scrollIntoView();
        });
}

function loadParticipants() {
    axios.get(`https://mock-api.driven.com.br/api/v6/uol/participants/${UUID}`)
        .then(response => {
            const participantsList = document.getElementById("participants-list");
            participantsList.innerHTML = `
                <div class="opcao">
                    <span>Todos</span>
                    <input type="radio" name="participant" checked onclick="setDestination('Todos')">
                </div>
            `;

            response.data.forEach(participant => {
                const participantOption = document.createElement("div");
                participantOption.classList.add("opcao");
                participantOption.innerHTML = `
                    <span>${participant.name}</span>
                    <input type="radio" name="participant" onclick="setDestination('${participant.name}')">
                `;
                participantsList.appendChild(participantOption);
            });
        });
}

function setDestination(name) {
    destination = name;
    updateMessageDestination();
}

function setVisibility(vis) {
    visibility = vis;
    updateMessageDestination();
}

function updateMessageDestination() {
    document.getElementById("messageDestination").textContent = `Enviando para ${destination} (${visibility.toLowerCase()})`;
}

promptUserName(); // Chama a função para pedir o nome do usuário
