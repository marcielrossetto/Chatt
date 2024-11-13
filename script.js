<<<<<<< HEAD
function toggleSidebar() {
    const sidebar = document.getElementById("sidebar");
    sidebar.classList.toggle("active");
}
function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const message = messageInput.value.trim();

    if (message) {
        console.log("Mensagem enviada:", message);
        messageInput.value = '';
      }
}

document.getElementById('messageInput').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') { 
        event.preventDefault();
        sendMessage(); 
    }
});

const UUID = "e4ec1db4-1587-492a-945f-6cc04b0b533d";
let userName = "";
let visibility = "Todos";
let destination = "Todos";

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
            promptUserName();
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

function sendMessage() {
    const text = document.getElementById("messageInput").value;
    if (text === "") return;

    const messageData = {
        from: userName,
        to: destination,
        text: text,
        type: visibility === "Reservadamente" ? "private_message" : "message"
    };

    axios.post(`https://mock-api.driven.com.br/api/v6/uol/messages/${UUID}`, messageData)
        .then(() => {
            document.getElementById("messageInput").value = "";
            loadMessages();
        })
        .catch(() => location.reload());
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

function toggleSidebar() {
    const sidebar = document.getElementById("sidebar");
    sidebar.classList.toggle("active");
}

promptUserName();
=======

>>>>>>> 50d1c5939e29517e5bfb4b0eb2d5f7d5d8ab16ad
