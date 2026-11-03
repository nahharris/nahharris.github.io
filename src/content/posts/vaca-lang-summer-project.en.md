---
title: 'Vaca Language Project'
description: 'A Lisp-inspired language experiment, built in Rust and driven by curiosity.'
pubDate: 'Apr 02 2024'
heroImage: '/vaca.jpg'
tags: ["pl-dev", "rust", "languages", "lisp"]
series: vaca
seriesOrder: 1
postSlug: vaca-language-project
language: en
---

I have been on a bit of a Lisp kick lately, and naturally that led me to an entirely reasonable idea: make a programming language of my own.

Meet [Vaca](https://github.com/nahharris/vaca), an interpreted functional language I'm building in Rust. Its name is Portuguese for “cow”. It started as a sandbox for a bigger project, but I'm enjoying exploring what the language itself can become.

## A little language with lots of parentheses

Vaca is dynamically typed and takes inspiration from Lisp. Calls are forms in parentheses, functions and macros are values, and expressions can be combined to make larger expressions. There are also arrays and blocks that introduce their own scope.

Bindings use `#(...)`, and functions have a `<(arguments -> body)` form. If a function receives fewer arguments than it needs, it returns a partially applied function. Macros receive their arguments lazily, so they can decide when to evaluate them.

```lisp
#(cube <(x -> (^ x 3)))
(println (cube 3))
```

The [repository](https://github.com/nahharris/vaca/tree/40aecca) has a parser, runtime, REPL, standard library, and command-line interface. There is still plenty to figure out, and things can change as I experiment, but being able to write a little program and see it run in a language I made is a pretty great feeling.

## Why build a language?

Mostly because I'm curious. I want to understand what goes into values, names, scope, calls, and the journey from source code to a running program. Building Vaca gives me a place to play with those ideas and see the consequences of my choices firsthand.

It's very much a work in progress. If you're curious too, you can follow along in the [Vaca repository](https://github.com/nahharris/vaca).
