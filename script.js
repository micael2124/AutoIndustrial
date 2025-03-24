const firebaseURL = "https://auto-industrial-default-rtdb.firebaseio.com/"; // Substitua pela sua URL do Firebase

// Função para atualizar os dados em tempo real
function atualizarDados() {
    fetch(firebaseURL + "corrente.json")
        .then(response => response.json())
        .then(data => { document.getElementById('corrente').innerText = data.toFixed(2); });

    fetch(firebaseURL + "tensao.json")
        .then(response => response.json())
        .then(data => { document.getElementById('tensao').innerText = data.toFixed(2); });

    fetch(firebaseURL + "motorLigado.json")
        .then(response => response.json())
        .then(data => { 
            document.getElementById('estadoMotor').innerText = data ? 'Ligado' : 'Desligado'; 
        });
}

// Função para controlar o motor
function controlarMotor(estado) {
    fetch(firebaseURL + "motor.json", { 
        method: "PUT", 
        body: JSON.stringify(estado),
        headers: { "Content-Type": "application/json" }
    }).then(() => {
        document.getElementById('estadoMotor').innerText = estado ? "Ligado" : "Desligado";
    });
}

// Atualizar os dados a cada 2 segundos
setInterval(atualizarDados, 2000);

// Atualizar os dados ao carregar a página
window.onload = atualizarDados;
