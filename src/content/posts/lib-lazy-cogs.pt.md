---
post: lib-lazy-cogs.en
language: pt-BR
title: 'Como nasceu LazyCogs'
description: 'Estruturas em Rust com clonagem lazy'
---

Durante minhas férias, passei um tempo pesquisando estruturas de dados imutáveis. Achei o conceito muito interessante e quero compartilhar o que aprendi (se alguém estiver lendo isso algum dia), junto com minha implementação em Rust na biblioteca [LazyCogs](https://crates.io/crates/lazy-cogs).

## O que são estruturas de dados imutáveis e clonagem lazy

O nome pode confundir. Uma IDS (*immutable data structure*) não é necessariamente uma estrutura que nunca vai mudar, mas uma estrutura que tem pouca *probabilidade* de mudar. Se você não pretende escrever nela, uma cópia pode ser apenas uma referência à estrutura original. Ainda é possível modificá-la, mas para isso precisamos de algumas garantias.

É disso que as IDS tratam: garantias sobre o uso dos dados. Se é improvável que os dados sejam modificados, as cópias devem ser baratas, mas precisamos acompanhar o estado dos dados para permitir modificações.

Por exemplo, imagine uma lista longa de valores cuja clonagem é custosa, mas em que você não pretende alterar a maior parte dos dados. Quando alguém pede uma cópia, entregamos uma referência à lista original. Isso é um *lazy clone*: parece que copiamos os dados, mas ainda não fizemos a cópia de verdade.

Agora precisamos acompanhar quem está referenciando a lista original. Não podemos modificar a lista diretamente sem causar efeitos indesejados para quem recebeu essa cópia, e a outra pessoa também não pode modificá-la diretamente. Nesse momento, a lista é realmente imutável: se alguém tentar alterar os dados, precisamos fazer uma cópia de verdade.

Depois que uma das listas é modificada, ambas passam a ser mutáveis, e outras alterações não exigem novas cópias custosas — até que alguém peça outra cópia de uma delas.

A beleza das IDS é que essas cópias caras tendem a acontecer raramente. Embora exista um custo adicional de espaço para armazenar metadados e acompanhar o estado, passar cópias dos dados adiante é barato, e o custo de uma cópia real fica concentrado em um único momento.

## LazyCogs

Com algumas dessas ideias em mente, comecei a desenvolver LazyCogs, uma biblioteca com implementações de IDS em Rust. Rust usa seu sistema de *ownership* para gerenciar memória. Aqui estou dando alguns superpoderes a ele, acrescentando *laziness* à clonagem de dados.

LazyCogs fornece uma “primitiva” `Lc`, que permite clonar quase qualquer dado de forma *lazy*. Na prática, ela é um wrapper para `Rc`, com métodos para lidar com a imutabilidade. É melhor evitar usar `Lc` diretamente quando possível, pois LazyCogs fornece a trait `LazyClone`, que pode tornar uma estrutura clonável de forma *lazy*. Se puder implementar `LazyClone`, forneça um método que verifique se a estrutura pode ser modificada com segurança, um método para fazer um *lazy clone* e outro para fazer um clone *eager* (não *lazy*).

Já existem implementações de vetores e listas ligadas com clonagem *lazy*. Elas têm “duas camadas” de *laziness*: primeiro, a cópia da lista inteira é *lazy*; depois, se você modificar a lista, os elementos que não foram alterados também são clonados de forma *lazy*.

LazyCogs também fornece versões *thread-safe* para cada estrutura. Ainda tenho muitas coleções para implementar, incluindo coleções que aproveitem IDS que implementam `LazyClone`.

Se achou a ideia interessante, fique à vontade para dar uma estrela em [LazyCogs](https://github.com/nahharris/LazyCogs) no GitHub e contribuir.
