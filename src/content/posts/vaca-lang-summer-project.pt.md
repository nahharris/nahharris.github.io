---
post: vaca-lang-summer-project.en
language: pt-BR
title: 'Projeto da linguagem Vaca'
description: 'Um experimento de linguagem inspirado em Lisp, feito em Rust e movido pela curiosidade.'
---

Ultimamente estou numa febre de Lisp e, naturalmente, isso me levou a uma ideia totalmente razoável: criar minha própria linguagem de programação.

Apresento [Vaca](https://github.com/nahharris/vaca), uma linguagem funcional interpretada que estou construindo em Rust. Ela começou como um laboratório para um projeto maior, mas estou gostando de explorar no que a própria linguagem pode se tornar.

## Uma pequena linguagem com muitos parênteses

Vaca tem tipagem dinâmica e se inspira em Lisp. Chamadas são formas entre parênteses, funções e macros são valores, e expressões podem ser combinadas para formar expressões maiores. Também há arrays e blocos que criam seu próprio escopo.

Associações usam `#(...)`, e funções seguem uma forma como `<(argumentos -> corpo)`. Se uma função recebe menos argumentos que o necessário, ela retorna uma função parcialmente aplicada. Macros recebem seus argumentos com avaliação *lazy*, podendo decidir quando avaliá-los.

```lisp
#(cube <(x -> (^ x 3)))
(println (cube 3))
```

O [repositório](https://github.com/nahharris/vaca/tree/40aecca) tem parser, runtime, REPL, biblioteca padrão e interface de linha de comando. Ainda há muito a descobrir, e as coisas podem mudar conforme eu experimento, mas poder escrever um pequeno programa e vê-lo rodar numa linguagem que eu criei é uma sensação muito boa.

## Por que criar uma linguagem?

Principalmente por curiosidade. Quero entender o que há por trás de valores, nomes, escopo, chamadas e do caminho entre o código-fonte e um programa em execução. Construir Vaca me dá um espaço para brincar com essas ideias e acompanhar de perto as consequências das minhas escolhas.

Ainda é um trabalho em andamento. Se você também estiver curiosa ou curioso, pode acompanhar pelo [repositório de Vaca](https://github.com/nahharris/vaca).
