// Cálculo do match entre o perfil do estudante e as vagas.
//
// Perfil do estudante: { competenciaId: nível }, com nível
//   0 = não conheço · 1 = básico · 2 = uso com frequência
//
// Compatibilidade = cobertura ponderada:
//   soma( peso × min(nível / 2, 1) ) / soma( peso )
// Obrigatórias (peso 2) contam o dobro dos diferenciais (peso 1).
// Diferente da similaridade de cosseno, quem sabe MAIS do que a vaga pede nunca perde pontos.

const BONUS_AREA = 0.10; // vagas na área de interesse ganham 10 pontos só na ordenação

function cobertura(perfil, vaga) {
  let pontos = 0;
  let total = 0;
  for (const [id, peso] of Object.entries(vaga.requisitos)) {
    const nivel = perfil[id] || 0;
    pontos += peso * Math.min(nivel / 2, 1);
    total += peso;
  }
  return total === 0 ? 0 : pontos / total;
}

// O que falta (não conhece) e o que reforçar (obrigatória em nível básico)
function lacunas(perfil, vaga, competencias) {
  const nome = (id) => competencias.find((c) => c.id === id).nome;
  const falta = [];
  const reforcar = [];
  const tem = [];
  for (const [id, peso] of Object.entries(vaga.requisitos)) {
    const nivel = perfil[id] || 0;
    if (nivel === 0) falta.push(nome(id));
    else if (peso === 2 && nivel === 1) reforcar.push(nome(id));
    else tem.push(nome(id));
  }
  return { tem, falta, reforcar };
}

// Ordena as vagas para um estudante e devolve as n melhores
function recomendar(perfil, areasInteresse, vagas, competencias, n = 3) {
  return vagas
    .map((vaga) => {
      const compat = cobertura(perfil, vaga);
      const naArea = areasInteresse.includes(vaga.area);
      return {
        vaga,
        compatibilidade: compat,
        naArea,
        pontuacao: compat + (naArea ? BONUS_AREA : 0),
        ...lacunas(perfil, vaga, competencias),
      };
    })
    .sort((a, b) => b.pontuacao - a.pontuacao)
    .slice(0, n);
}

if (typeof module !== "undefined") module.exports = { cobertura, lacunas, recomendar, BONUS_AREA };
