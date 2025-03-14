let numero = Math.floor(Math.random() * 11);
let tentativas = 0;
const maxTentativas = 3;

function reiniciarJogo() {
    numero = Math.floor(Math.random() * 11);
    tentativas = 0;
    document.getElementById('message').innerText = "";
    document.getElementById('userGuess').value = "";
    document.getElementById('reiniciarBtn').style.display = "none";
    document.getElementById('userGuess').disabled = false;
    document.querySelector('.botao[type="submit"]').disabled = false;
    document.getElementById('message').style.color = "#fff";
}

document.getElementById('guessForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const resposta = parseInt(document.getElementById('userGuess').value);
    const messageElement = document.getElementById('message');

    if (isNaN(resposta) || resposta < 0 || resposta > 10) {
        messageElement.innerText = "Por favor, digite um número válido entre 0 e 10.";
        messageElement.style.color = "#ff4444";
        return;
    }

    tentativas++;
    const tentativasRestantes = maxTentativas - tentativas;

    if (resposta === numero) {
        messageElement.innerText = `Você ganhou o jogo! Parabéns! Você acertou em ${tentativas} tentativa(s).`;
        messageElement.style.color = "#42f917";
        document.getElementById('reiniciarBtn').style.display = "block";
        document.getElementById('userGuess').disabled = true;
        document.querySelector('.botao[type="submit"]').disabled = true;
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });
    } else if (tentativas >= maxTentativas) {
        messageElement.innerText = `Você excedeu o número máximo de tentativas. O número era ${numero}. Você perdeu o jogo.`;
        messageElement.style.color = "#ff4444";
        document.getElementById('reiniciarBtn').style.display = "block";
        document.getElementById('userGuess').disabled = true;
        document.querySelector('.botao[type="submit"]').disabled = true;
    } else {
        messageElement.innerText = `Sua resposta é muito ${resposta > numero ? 'alta' : 'baixa'}. Você tem ${tentativasRestantes} tentativa(s) restante(s).`;
        messageElement.style.color = "#ffcc00";
    }

    document.getElementById('userGuess').value = '';
});

document.getElementById('reiniciarBtn').addEventListener('click', reiniciarJogo);