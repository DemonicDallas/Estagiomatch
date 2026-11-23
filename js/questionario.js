// Monta o questionário a partir das competências e salva as respostas no navegador.

const NIVEIS = ["Não conheço", "Básico", "Uso com frequência"];
const CHAVE = "estagiomatch-respostas";

const form = document.getElementById("questionario");
const blocoCompetencias = document.getElementById("competencias");
const blocoAreas = document.getElementById("areas");
const erro = document.getElementById("erro");

// Lê respostas anteriores (se a pessoa voltou para refazer)
let anteriores = null;
try { anteriores = JSON.parse(sessionStorage.getItem(CHAVE)); } catch (e) { anteriores = null; }

// Uma linha por competência, com 3 opções
for (const c of COMPETENCIAS) {
  const fs = document.createElement("fieldset");
  fs.className = "competencia";

  const legenda = document.createElement("legend");
  legenda.textContent = c.nome;
  fs.appendChild(legenda);

  const opcoes = document.createElement("div");
  opcoes.className = "opcoes";
  NIVEIS.forEach((rotulo, nivel) => {
    const label = document.createElement("label");
    label.className = "opcao";
    const input = document.createElement("input");
    input.type = "radio";
    input.name = c.id;
    input.value = String(nivel);
    if (anteriores && anteriores.perfil && anteriores.perfil[c.id] === nivel) input.checked = true;
    const span = document.createElement("span");
    span.textContent = rotulo;
    label.append(input, span);
    opcoes.appendChild(label);
  });
  fs.appendChild(opcoes);
  blocoCompetencias.appendChild(fs);
}

// Caixas das áreas de interesse
for (const area of AREAS) {
  const label = document.createElement("label");
  label.className = "marcar";
  const input = document.createElement("input");
  input.type = "checkbox";
  input.name = "area";
  input.value = area;
  if (anteriores && anteriores.areas && anteriores.areas.includes(area)) input.checked = true;
  const span = document.createElement("span");
  span.textContent = area;
  label.append(input, span);
  blocoAreas.appendChild(label);
}

form.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const perfil = {};
  const semResposta = [];
  for (const c of COMPETENCIAS) {
    const marcado = form.querySelector(`input[name="${c.id}"]:checked`);
    if (marcado) perfil[c.id] = Number(marcado.value);
    else semResposta.push(c.nome);
  }

  if (semResposta.length > 0) {
    erro.textContent = `Falta marcar o nível em: ${semResposta.join(", ")}.`;
    erro.hidden = false;
    erro.scrollIntoView({ behavior: "smooth", block: "center" });
    return;
  }

  const areas = [...form.querySelectorAll('input[name="area"]:checked')].map((i) => i.value);

  try {
    sessionStorage.setItem(CHAVE, JSON.stringify({ perfil, areas }));
  } catch (e) {
    // Sem armazenamento (aba anônima bloqueada etc.): passa as respostas pelo endereço
    const dados = encodeURIComponent(JSON.stringify({ perfil, areas }));
    window.location.href = `resultado.html#${dados}`;
    return;
  }
  window.location.href = "resultado.html";
});
