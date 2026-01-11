const gato = document.getElementById("gato");
const contador = document.getElementById("contador");
const recordeTexto = document.getElementById("recorde");
const miau = document.getElementById("miau");

// ===== DADOS SALVOS =====
let fogo = Number(localStorage.getItem("fogo")) || 0;
let recorde = Number(localStorage.getItem("recorde")) || 0;
let ultimoDia = localStorage.getItem("ultimoDia");

// ===== DATA =====
const hoje = new Date().toDateString();

// ===== ATUALIZA TEXTO =====
contador.textContent = `🔥 Foguinho: ${fogo}`;
recordeTexto.textContent = `🏆 Recorde: ${recorde}`;

// ===== CLIQUE NA GATA =====
gato.addEventListener("click", (e) => {
miau.currentTime = 1.9;
miau.play();


  criarCoracao(e.clientX, e.clientY);

  if (localStorage.getItem("ultimoDia") === hoje) {
  alert("Você já fez carinho hoje 🐱💖");
  return;
}


  if (ultimoDia && ultimoDia !== ontem()) {
    fogo = 0;
  }

  fogo++;
  ultimoDia = hoje;

  if (fogo > recorde) {
    recorde = fogo;
    localStorage.setItem("recorde", recorde);
  }

  localStorage.setItem("fogo", fogo);
  localStorage.setItem("ultimoDia", ultimoDia);

  contador.textContent = `🔥 Foguinho: ${fogo}`;
  recordeTexto.textContent = `🏆 Recorde: ${recorde}`;
});

// ===== FUNÇÕES =====
function ontem() {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toDateString();
}

function criarCoracao(x, y) {
  const coracao = document.createElement("div");
  coracao.className = "heart";
  coracao.textContent = "💕❤️";
  coracao.style.left = `${x}px`;
  coracao.style.top = `${y}px`;

  document.body.appendChild(coracao);

  setTimeout(() => coracao.remove(), 1200);
}





