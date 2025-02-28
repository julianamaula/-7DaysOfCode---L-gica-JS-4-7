var numero = Math.floor(Math.random() * 11);
var tentativas = 0;
var acertos = 0;

// Função para reiniciar o jogo
function reiniciarJogo() {
    numero = Math.floor(Math.random() * 11); // Gera um novo número aleatório
    tentativas = 0; // Reseta o contador de tentativas
    acertos = 0; // Reseta o contador de acertos
    document.getElementById('message').innerText = ""; // Limpa a mensagem
    document.getElementById('userGuess').value = ""; // Limpa o campo de input
    document.getElementById('reiniciarBtn').style.display = "none"; // Oculta o botão "Reiniciar"
    document.getElementById('userGuess').disabled = false; // Habilita o campo de input
    document.querySelector('.botao[type="submit"]').disabled = false; // Habilita o botão "Enviar"
}

// Evento de submit do formulário
document.getElementById('guessForm').addEventListener('submit', function(event) {
    event.preventDefault();
    var resposta = parseInt(document.getElementById('userGuess').value);
    tentativas++;
    document.getElementById('message').innerText = "Você tem " + (3 - tentativas) + " tentativas restantes.";
    if (resposta > numero) {
        document.getElementById('message').innerText += " Sua resposta é muito alta!";
    } else if (resposta < numero) {
        document.getElementById('message').innerText += " Sua resposta é muito baixa!";
    }

    if (tentativas >= 3) {
        document.getElementById('message').innerText = "Você excedeu o número máximo de tentativas. O número era " + numero + ". Você perdeu o jogo.";
        document.getElementById('reiniciarBtn').style.display = "block"; // Exibe o botão "Reiniciar"
        document.getElementById('userGuess').disabled = true; // Desabilita o campo de input
        document.querySelector('.botao[type="submit"]').disabled = true; // Desabilita o botão "Enviar"
        return;
    }

    if (resposta >= 0 && resposta <= 10) {
        if (resposta === numero) {
            acertos++;
            document.getElementById('message').innerText = "Você ganhou o jogo! Parabéns! Você acertou em " + tentativas + " tentativas.";
            document.getElementById('reiniciarBtn').style.display = "block"; // Exibe o botão "Reiniciar"
            document.getElementById('userGuess').disabled = true; // Desabilita o campo de input
            document.querySelector('.botao[type="submit"]').disabled = true; // Desabilita o botão "Enviar"
            try {
                confetti({
                    particleCount: 100,
                    spread: 70,
                    origin: { y: 0.6 }
                });
            } catch (error) {
                console.error("Confetti error:", error);
            }
        } else {
            document.getElementById('message').innerText = "Tente novamente!";
        }
    } else {
        document.getElementById('message').innerText = "Por favor, digite um número válido entre 0 e 10.";
    }
    document.getElementById('userGuess').value = ''; // Limpa o campo de input
});

// Evento de clique no botão "Reiniciar"
document.getElementById('reiniciarBtn').addEventListener('click', reiniciarJogo);