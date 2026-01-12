const gato = document.getElementById("gato");
const contador = document.getElementById("contador");
const recordeTexto = document.getElementById("recorde");
const miau = document.getElementById("miau");

const botaoTroca = document.getElementById("botaoTroca");
const opcoesGatos = document.getElementById("opcoesGatos");

/* LISTA DE GATOS */
const gatos = ["gatamonalisa", "gatowill", "gatachikita"];
let gatoAtual = localStorage.getItem("gatoAtual") || "gatamonalisa";

/* DADOS SALVOS POR GATO */
let dadosGatos = JSON.parse(localStorage.getItem("dadosGatos")) || {};

/* garante que cada gato tenha dados */
gatos.forEach(g => {
  if (!dadosGatos[g]) {
    dadosGatos[g] = { fogo: 0, recorde: 0, ultimoDia: null };
  }
});

/* FUNÇÃO ATUALIZAR INTERFACE */
function atualizarGato() {
  const imgGato = document.getElementById("gato");
  const tituloGato = document.getElementById("tituloGato");
  const dados = dadosGatos[gatoAtual];

  /* imagem */
  imgGato.src = gatoAtual + ".png";

  /* foguinho e recorde */
  contador.textContent = `🔥 Foguinho: ${dados.fogo}`;
  recordeTexto.textContent = `🏆 Recorde: ${dados.recorde}`;

  /* título dinâmico e foda */
  let nomeAmigavel = "";
  if (gatoAtual === "gatamonalisa") nomeAmigavel = "na Monalisa";
  else if (gatoAtual === "gatowill") nomeAmigavel = "no Will";
  else if (gatoAtual === "gatachikita") nomeAmigavel = "na Chikita";

  tituloGato.textContent = `Faça carinho ${nomeAmigavel} todo dia 🐾`;
}

/* TROCAR GATO */
botaoTroca.addEventListener("click", () => {
  opcoesGatos.style.display = opcoesGatos.style.display === "block" ? "none" : "block";
});

document.querySelectorAll(".opcoes-gatos img").forEach(img => {
  img.addEventListener("click", () => {
    gatoAtual = img.dataset.nome;
    localStorage.setItem("gatoAtual", gatoAtual);
    atualizarGato();
    opcoesGatos.style.display = "none";
  });
});

/* CLIQUE NA GATA OBAAA */
gato.addEventListener("click", (e) => {
  const dados = dadosGatos[gatoAtual];
  const hoje = new Date().toDateString();

  /* play som baixinho */
  miau.volume = 0.2;
  miau.currentTime = 0;
  miau.play();

  /* criar corações */
  criarCoracao(e.clientX, e.clientY);

  /* já clicou hoje */
  if (dados.ultimoDia === hoje) {
    alert("Você já fez carinho hoje 🐱💖");
    return;
  }

  /* se pulou um dia, reseta foguinho */
  if (dados.ultimoDia && dados.ultimoDia !== ontem()) {
    dados.fogo = 0;
  }

  /* atualiza foguinho */
  dados.fogo++;
  dados.ultimoDia = hoje;

  /* atualiza recorde */
  if (dados.fogo > dados.recorde) {
    dados.recorde = dados.fogo;
  }

  /* salva dados no localStorage ??? SO TEM NOME DIFICL DE DECORAR E ESCREVER NESSA PORRA SOCOROOOOO*/
  dadosGatos[gatoAtual] = dados;
  localStorage.setItem("dadosGatos", JSON.stringify(dadosGatos));

  /* atualiza interface */
  atualizarGato();
});

/*  FUNÇÕES AUXILIARES */
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

/* CARREGA INTERFACE NA PRIMEIRA VEZ */
atualizarGato();
