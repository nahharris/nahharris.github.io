---
post: vaca-what-it-taught-me.en
language: pt-BR
title: 'O que aprendi com Vaca e o que vem a seguir'
description: 'Encerrando Vaca, compartilhando o que aprendi e abrindo espaço para uma nova direção.'
---

Hoje estou encerrando o desenvolvimento de Vaca. O repositório continuará disponível, mas não vou mais seguir com Vaca como um projeto ativo de linguagem. É uma decisão agridoce: Vaca foi meu espaço de experimentação por muito tempo, e construí-la me ensinou muito. Mas as perguntas que quero explorar agora precisam de um novo espaço.

## O que Vaca me ensinou

Vaca começou com meu entusiasmo por Lisp e a vontade de fazer uma linguagem funcionar. Construir o primeiro interpretador tornou muito mais concretos conceitos como escopo, avaliação e a representação dos valores. Também me mostrou como uma pequena decisão de sintaxe rapidamente alcança o parser, o runtime e as ferramentas.

Em dezembro de 2024, fiz um [reboot de Vaca](https://github.com/nahharris/vaca/commit/f3086634ecf41f148334a48e577361bc08c1ad09), substituindo a implementação anterior, dividida em várias crates, por um novo começo. Desde então, explorei uma sintaxe derivada de EDN, um reader e um interpretador *tree-walking*. Reconstruir me deu espaço para questionar o que eu queria que a linguagem prometesse e como suas peças deveriam se encaixar.

Nenhuma das versões respondeu a todas as perguntas, mas ambas me ajudaram a encontrar perguntas melhores. Vou levar esses aprendizados comigo.

## Programando com agentes em mente

IA está mudando a forma como penso em linguagens de programação. Agentes estão se tornando colaboradores na escrita e manutenção de software, e isso me faz querer repensar mais do que apenas a velocidade com que produzimos código.

O que um agente precisa para entender um projeto, receber feedback preciso e fazer uma alteração dentro de limites claros? Como uma linguagem e suas ferramentas podem tornar esse trabalho mais fácil de inspecionar e orientar? Essas perguntas envolvem sintaxe, tipos, efeitos, tooling e runtime em conjunto.

Não acho que toda linguagem precise ser redesenhada em torno de IA. Mas acho que vale explorar o que se torna possível quando agentes fazem parte do fluxo de trabalho desde o começo.

## O que vem a seguir

Estou levando essa curiosidade para [Vibra](/series/vibra/), um projeto separado em que estou criando uma linguagem voltada a software escrito e mantido com agentes. O trabalho começa pela especificação, e ainda há um longo caminho até uma versão com suporte. Vou compartilhar mais sobre ele conforme tomar forma.

Por enquanto, obrigada, Vaca. Você foi um espaço maravilhoso para aprender.
