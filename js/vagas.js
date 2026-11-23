// Competências avaliadas no questionário e vagas usadas no cálculo.
//
// ⚠️ As vagas abaixo são DE EXEMPLO, montadas a partir das categorias do levantamento
// feito no LinkedIn, Glassdoor e Indeed. Troque pelas vagas reais mapeadas na pesquisa.
//
// Em cada vaga, o peso de cada competência é:
//   2 = obrigatória · 1 = diferencial · 0 (ou ausente) = não pedida

const COMPETENCIAS = [
  { id: "logica", nome: "Lógica de programação" },
  { id: "java", nome: "Java" },
  { id: "python", nome: "Python" },
  { id: "csharp", nome: "C#" },
  { id: "php", nome: "PHP" },
  { id: "js", nome: "JavaScript" },
  { id: "front", nome: "HTML/CSS (front-end)" },
  { id: "sql", nome: "Banco de dados / SQL" },
  { id: "git", nome: "Git/GitHub" },
  { id: "nuvem", nome: "Computação em nuvem" },
  { id: "agil", nome: "Metodologias ágeis (Scrum, Kanban)" },
];

const AREAS = [
  "Desenvolvimento de Software",
  "Dados e Business Intelligence",
  "Infraestrutura e Cloud",
  "Segurança da Informação",
];

const VAGAS = [
  {
    id: "V01", titulo: "Estágio em Desenvolvimento Web", area: "Desenvolvimento de Software",
    requisitos: { logica: 2, php: 1, js: 2, front: 2, sql: 1, git: 2, agil: 1 },
  },
  {
    id: "V02", titulo: "Estágio Back-end Java", area: "Desenvolvimento de Software",
    requisitos: { logica: 2, java: 2, sql: 2, git: 2, nuvem: 1, agil: 1 },
  },
  {
    id: "V03", titulo: "Estágio em Desenvolvimento .NET (C#)", area: "Desenvolvimento de Software",
    requisitos: { logica: 2, csharp: 2, js: 1, front: 1, sql: 2, git: 1, agil: 1 },
  },
  {
    id: "V04", titulo: "Estágio em Dados com Python", area: "Dados e Business Intelligence",
    requisitos: { logica: 2, python: 2, sql: 2, git: 1, nuvem: 1 },
  },
  {
    id: "V05", titulo: "Estágio em Business Intelligence", area: "Dados e Business Intelligence",
    requisitos: { logica: 1, python: 1, sql: 2, agil: 1 },
  },
  {
    id: "V06", titulo: "Estágio em Infraestrutura e Cloud", area: "Infraestrutura e Cloud",
    requisitos: { logica: 1, python: 1, git: 1, nuvem: 2, agil: 1 },
  },
  {
    id: "V07", titulo: "Estágio em Suporte e Infraestrutura", area: "Infraestrutura e Cloud",
    requisitos: { logica: 1, sql: 1, nuvem: 1 },
  },
  {
    id: "V08", titulo: "Estágio em Segurança da Informação", area: "Segurança da Informação",
    requisitos: { logica: 2, python: 2, sql: 1, git: 1, nuvem: 1 },
  },
];

if (typeof module !== "undefined") module.exports = { COMPETENCIAS, AREAS, VAGAS };
