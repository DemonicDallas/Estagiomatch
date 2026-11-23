// Testes simples do cálculo de match. Rode com:  node js/match.test.js
const assert = require("assert");
const { COMPETENCIAS, VAGAS } = require("./vagas.js");
const { cobertura, lacunas, recomendar } = require("./match.js");

const web = VAGAS.find((v) => v.id === "V01");

// Quem sabe tudo atende 100% de qualquer vaga
const sabeTudo = Object.fromEntries(COMPETENCIAS.map((c) => [c.id, 2]));
assert.strictEqual(cobertura(sabeTudo, web), 1);

// Quem não sabe nada tem 0%
assert.strictEqual(cobertura({}, web), 0);

// Mesmo exemplo do notebook: perfil igual aos pesos da vaga dá 86%
const igualAVaga = { ...web.requisitos };
assert.strictEqual(Math.round(cobertura(igualAVaga, web) * 100), 86);

// Saber MAIS nunca diminui a compatibilidade (o problema do cosseno)
assert.ok(cobertura(sabeTudo, web) >= cobertura(igualAVaga, web));

// Lacunas: obrigatória no básico vai para "reforçar", nível 0 vai para "falta"
const l = lacunas({ logica: 1, js: 2, front: 2, git: 2 }, web, COMPETENCIAS);
assert.deepStrictEqual(l.reforcar, ["Lógica de programação"]);
assert.ok(l.falta.includes("PHP") && l.falta.includes("Banco de dados / SQL"));

// Bônus de área: com perfis empatados, a vaga da área de interesse vem primeiro
const top = recomendar(sabeTudo, ["Segurança da Informação"], VAGAS, COMPETENCIAS, 3);
assert.strictEqual(top[0].vaga.area, "Segurança da Informação");
assert.strictEqual(top.length, 3);

console.log("Todos os testes passaram ✔");
