function alternarMenuLateral() {
    const menuLateral = document.querySelector('.menuLateral');
    menuLateral.classList.toggle('visivel');
}

let userName = "";

// Função para solicitar o nome do usuário
function solicitarNomeUsuario() {
    // Solicite o nome do usuário
    userName = prompt("Por favor, insira seu nome:");

    // Certifique-se de que o nome foi inserido
    while (!userName) {
        userName = prompt("Nome inválido! Por favor, insira seu nome:");
    }
}

// Função para renderizar o chat
function renderizarChatt(){
    const div = document.querySelector(".chatContainer");

    if (div) {
        div.innerHTML = "";

        for (let i = 0; i < chatt.length; i++) {
            const time = chatt[i].horario;
            div.innerHTML += `
              <div class="mensagem sistema">${time} <strong>${userName} diz:</strong> ${chatt[i].nome}</div>
            `;
        }
    } else {
        console.error("Elemento .chatContainer não encontrado");
    }
}

const chatt = [];

// Chame a função para solicitar o nome do usuário e renderizar o chat ao carregar a página
window.onload = function() {
    solicitarNomeUsuario();
    renderizarChatt();
}

// Função para adicionar mensagem ao chat
function adicionarChatt() {
    const msg = document.querySelector(".inputMensagem");

    if (msg.value === "") {
        alert("Digite um texto para enviar");
    } else {
        const now = new Date();
        const horario = now.toLocaleTimeString();
        const novoChatt = {
            nome: msg.value,
            horario: horario
        };
        chatt.push(novoChatt);
        renderizarChatt();
        msg.value = ""; // Limpa o campo de entrada após enviar a mensagem
    }
}
