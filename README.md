# EstágioMatch

Protótipo do sistema que recomenda vagas de estágio em TI de acordo com o que o estudante já sabe.

## 👉 [Acesse o site](https://demonicdallas.github.io/Projeto-Treinamento-de-um-sistema-para-selecionar-vagas-de-est-gio-aos-estudantes-na-rea-de-TI-/)

Responda o questionário e veja, na hora, as vagas mais compatíveis com o seu perfil.

Projeto de pesquisa **"Treinamento de um sistema para selecionar vagas de estágio aos estudantes na área da TI"**
(PIBIC/FAPEMIG, Edital 22/2025) — IFTM Campus Ituiutaba.

- **Bolsista:** André Luiz Dias Moreira (Ciência da Computação)
- **Orientadora:** Profa. Reane Franco Goulart
- Conceito EstágioMatch desenvolvido com Nicolas Souza e Augusto Moreira.

> ⚠️ **Protótipo em desenvolvimento.** As vagas usadas no cálculo são vagas de exemplo, e os números das telas
> Empresas e Faculdades são ilustrativos. Só a página **Dados do mercado** usa dados reais, com fonte.

## Páginas

| Página | O que faz |
|---|---|
| `index.html` | Apresenta o projeto e como o sistema funciona |
| `questionario.html` | O estudante marca o nível em 11 competências e as áreas de interesse |
| `resultado.html` | Calcula, no próprio navegador, as 3 vagas mais compatíveis |
| `dados.html` | Dados reais do mercado de TI e de estágio (Brasscom, ABRES, INEP, Nube, Stack Overflow) |
| `empresa.html` | Visão futura do painel da empresa (números ilustrativos) |
| `faculdade.html` | Visão futura do painel da faculdade (números ilustrativos) |

## Como o match é calculado

Cada vaga tem um peso por competência (**2 = obrigatória, 1 = diferencial, 0 = não pedida**) e cada estudante
um nível (**0 = não conheço, 1 = básico, 2 = uso com frequência**). A compatibilidade é a **cobertura ponderada**:

```
cobertura = Σ peso × min(nível / 2, 1)  /  Σ peso
```

Vagas na área de interesse do estudante ganham um bônus de 10 pontos só na hora de ordenar.
Usamos a cobertura e não a similaridade de cosseno porque o cosseno penaliza quem sabe mais do que a vaga pede.
O código está em [`js/match.js`](js/match.js).

## Privacidade

As respostas do questionário **não são enviadas para lugar nenhum**: ficam só no navegador de quem respondeu
(`sessionStorage`) e somem quando a aba é fechada.

## Rodar no computador

É um site estático (HTML, CSS e JavaScript, sem instalação). Abra o `index.html` no navegador
ou, para simular um servidor:

```
python -m http.server 8000
```

e acesse `http://localhost:8000`.

## Testes do cálculo

Com o Node.js instalado:

```
node js/match.test.js
```
