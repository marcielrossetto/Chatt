function alternarMenuLateral() {
    const menuLateral = document.querySelector('.menuLateral');
    menuLateral.classList.toggle('visivel');
}

let userName = "";


function entrarSala(nome) {
    fetch("https://mock-api.driven.com.br/api/v6/uol/participants/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name: nome, uuid: "83d50a6e-022b-4329-bb47-62beec649971" })
    })
    .then(response => {
        if (response.ok) {
            console.log("Usuário entrou na sala com sucesso");
        } else {
            alert("Nome já está em uso, escolha outro.");
            solicitarNomeUsuario(); // Solicita um novo nome se o atual já está em uso
        }
    })
    .catch(error => {
        console.error("Erro ao entrar na sala:", error);
    });
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
