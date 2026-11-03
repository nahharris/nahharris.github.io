---
title: 'What Vaca taught me, and what comes next'
description: 'Closing Vaca, sharing what I learned, and making room for a new direction.'
pubDate: '2026-08-29'
tags: ["pl-dev", "rust", "languages", "ai"]
series: vaca
seriesOrder: 2
postSlug: what-vaca-taught-me
language: en
---

Today I'm sunsetting Vaca. The repository will stay available, but I won't be continuing it as an active language project. It's a bittersweet decision: Vaca has been my playground for a long time, and building it has taught me a lot. But the questions I want to explore now need a different home.

## What Vaca taught me

Vaca started with my enthusiasm for Lisp and the desire to make a language work. Building the first interpreter made things like scope, evaluation, and the shape of values feel much more concrete. It also showed me how quickly a small syntax decision reaches into the parser, runtime, and tools.

I [rebooted Vaca in December 2024](https://github.com/nahharris/vaca/commit/f3086634ecf41f148334a48e577361bc08c1ad09), replacing the earlier multi-crate implementation with a fresh start. Since then I've explored an EDN-derived syntax, a reader, and a tree-walking interpreter. Rebuilding gave me room to question what I wanted the language to promise and how its pieces should fit together.

Neither version answered every question, but both helped me find better ones. I'm taking those lessons with me.

## Programming with agents in mind

AI is changing the way I think about programming languages. Agents are becoming collaborators in writing and maintaining software, and that makes me want to reconsider more than how quickly we can produce code.

What does an agent need in order to understand a project, get precise feedback, and make a change within clear boundaries? How can a language and its tools make that work easier to inspect and guide? Those questions touch syntax, types, effects, tooling, and the runtime together.

I don't think every language needs to be redesigned around AI. I do think it's worth exploring what becomes possible when agents are a first-class part of the workflow from the start.

## What comes next

I'm carrying that curiosity into [Vibra](/series/vibra/), a separate project where I'm designing a language around software authored and maintained with agents. The work is specification-first, and there is still a long way to go before a supported release. I'll share more about it as it takes shape.

For now, thank you, Vaca. You were a wonderful place to learn.
