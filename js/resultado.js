// Lê as respostas salvas pelo questionário, calcula as 3 melhores vagas e mostra na tela.

const CHAVE_RESPOSTAS = "estagiomatch-respostas";

function lerRespostas() {
  try {
    const salvas = sessionStorage.getItem(CHAVE_RESPOSTAS);
    if (salvas) return JSON.parse(salvas);
  } catch (e) { /* sem acesso ao armazenamento */ }
  // Plano B: respostas vindas pelo endereço (#...)
  if (location.hash.length > 1) {
    try { return JSON.parse(decodeURIComponent(location.hash.slice(1))); } catch (e) { /* ignora */ }
  }
  return null;
}

// Cria um elemento com classe e texto (sem innerHTML)
function el(tag, classe, texto) {
  const e = document.createElement(tag);
  if (classe) e.className = classe;
  if (texto !== undefined) e.textContent = texto;
  return e;
}

function grupoChips(titulo, itens, classeChip) {
  const g = el("div", "grupo-chips");
  g.appendChild(el("h4", null, titulo));
  const chips = el("div", "chips");
  if (itens.length === 0) chips.appendChild(el("span", "ajuda", "—"));
  for (const item of itens) chips.appendChild(el("span", classeChip, item));
  g.appendChild(chips);
  return g;
}

const respostas = lerRespostas();

if (!respostas || !respostas.perfil) {
  document.getElementById("sem-respostas").hidden = false;
} else {
  document.getElementById("com-respostas").hidden = false;
  const top = recomendar(respostas.perfil, respostas.areas || [], VAGAS, COMPETENCIAS, 3);
  const lista = document.getElementById("lista");

  top.forEach((r, i) => {
    const pct = Math.round(r.compatibilidade * 100);
    const card = el("article", "cartao");

    const topo = el("div", "vaga-topo");
    const titulos = el("div");
    titulos.appendChild(el("span", "vaga-area", `${i + 1}º · ${r.vaga.area}`));
    titulos.appendChild(el("h2", null, r.vaga.titulo)).style.fontSize = "1.3rem";
    if (r.naArea) titulos.appendChild(el("span", "estrela", "★ Na sua área de interesse"));
    const numero = el("div", "vaga-pct", `${pct}%`);
    numero.appendChild(el("small", null, "compatível"));
    topo.append(titulos, numero);

    const fundo = el("div", "barra-fundo");
    fundo.setAttribute("aria-hidden", "true");
    const barra = el("div", "barra");
    barra.style.width = `${pct}%`;
    fundo.appendChild(barra);

    const grade = el("div", "grade");
    grade.style.gridTemplateColumns = "repeat(auto-fit, minmax(180px, 1fr))";
    grade.style.gap = "14px";
    grade.append(
      grupoChips("Você já tem", r.tem, "chip"),
      grupoChips("Falta aprender", r.falta, "chip chip-falta"),
      grupoChips("Reforçar", r.reforcar, "chip chip-falta"),
    );

    card.append(topo, fundo, grade);
    lista.appendChild(card);
  });

  // Plano de estudo: lacunas que mais se repetem nas 3 vagas
  const contagem = {};
  for (const r of top) for (const c of [...r.falta, ...r.reforcar]) contagem[c] = (contagem[c] || 0) + 1;
  const plano = Object.entries(contagem).sort((a, b) => b[1] - a[1]).slice(0, 4);
  const ol = document.getElementById("plano");
  if (plano.length === 0) ol.appendChild(el("li", null, "Nada! Você já atende tudo o que essas vagas pedem."));
  for (const [competencia] of plano) ol.appendChild(el("li", null, competencia));
}
