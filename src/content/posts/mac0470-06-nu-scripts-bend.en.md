---
post: mac0470-06-nu-scripts-bend.pt
language: en
title: "[MAC0470#06] - Nu scripts pt. 1"
description: "Creating completions for Bend"
---

Here begins the second part of the MAC0470 course where we will contribute to the projects we want (there are certain restrictions, but that's not the point). The ecosystem where my partner Laís Nuto and I will make our contributions will be [Nushell](https://www.nushell.sh/).

## What is Nushell

Nushell is a multiplatform shell (like Bash, Zsh, Fish, etc.) whose most striking feature is its `nu` scripting language, which is strongly inspired by modern functional programming languages with type support. Unlike a Bash script where all input and output is text, Nushell has types and collections (tables and lists) to be able to work with pipelines and process data more effectively.

For example, the `ls` command in Nushell returns a table instead of a list of strings with file names.

```nu
$ ls
╭────┬─────────────────────┬──────┬───────────┬───────────────╮
│  # │        name         │ type │   size    │   modified    │
├────┼─────────────────────┼──────┼───────────┼───────────────┤
│  0 │ README.md           │ file │   2.9 KiB │ 2 months ago  │
│  1 │ astro.config.mjs    │ file │     377 B │ 2 months ago  │
│  2 │ bun.lockb           │ file │ 251.6 KiB │ 2 months ago  │
│  3 │ components.json     │ file │     351 B │ 2 months ago  │
│  4 │ node_modules        │ dir  │  20.0 KiB │ 2 months ago  │
│  5 │ package.json        │ file │     855 B │ 2 months ago  │
│  6 │ public              │ dir  │   4.0 KiB │ 6 minutes ago │
│  7 │ src                 │ dir  │   4.0 KiB │ 2 months ago  │
│  8 │ tailwind.config.js  │ file │   2.1 KiB │ 2 months ago  │
│  9 │ tailwind.config.mjs │ file │     176 B │ 2 months ago  │
│ 10 │ tsconfig.json       │ file │     237 B │ 2 months ago  │
╰────┴─────────────────────┴──────┴───────────┴───────────────╯
```

We can use pipes (`|`) to manipulate the output of the `ls` command to list only directories using the `where` command

```nu
$ ls | where type == "dir"
╭───┬──────────────┬──────┬──────────┬───────────────╮
│ # │     name     │ type │   size   │   modified    │
├───┼──────────────┼──────┼──────────┼───────────────┤
│ 0 │ node_modules │ dir  │ 20.0 KiB │ 2 months ago  │
│ 1 │ public       │ dir  │  4.0 KiB │ 8 minutes ago │
│ 2 │ src          │ dir  │  4.0 KiB │ 2 months ago  │
╰───┴──────────────┴──────┴──────────┴───────────────╯
```

We can select just the `name` column

```nu
$ ls | where type == "dir" | get name
╭───┬──────────────╮
│ 0 │ node_modules │
│ 1 │ public       │
│ 2 │ src          │
╰───┴──────────────╯
```

And why not leave it all in capital letters? (The command `each` will map each element using the _lambda function_ passed `{|d| $d | str upcase}`)

```nu
$ ls | where type == "dir" | get name | each {|d| $d | str upcase }
╭───┬──────────────╮
│ 0 │ NODE_MODULES │
│ 1 │ PUBLIC       │
│ 2 │ SRC          │
╰───┴──────────────╯
```

## What will we contribute

_Scripts_ `nu` are extremely powerful and the shell has many _features_ to be explored and configured. To this end, they created the repository [nushell/nu_scripts](https://github.com/nushell/nu_scripts) for users to share their utility _scripts_, such as: _completion_ _scripts_. Completion scripts are scripts that help the user with auto-complete for subcommands and flags of executables in the terminal. What Laís and I are going to do is contribute by writing/improving _completion_ _scripts_ for various programs, such as: git and kw.

Just as an example, this is what the _script_ `git-completion.nu` provides when I type `git branch -` and hit `Tab` to receive suggestions:

```nu
$ | git branch -
--abbrev            use short commit hash prefixes
--all               list both remote and local branches
--color             use color in output
--contains          show only branches that contain the specified commit
--copy              copy branch together with config and reflog
--delete            delete branch
--edit-description  open editor to edit branch description
--format            specify format for listing branches
--list              list branches
--merged            list reachable branches
--move              rename branch
--no-contains       show only branches that don't contain specified commit
```

Unlike Bash completions, here I can use the arrow keys to choose an option and Nushell will complete the line instead of just printing the options and creating a new line underneath.

## Bend

I decided to start with something completely new, to understand how the _Nu Scripts_ contribution cycle works. About a week before I wrote this blog post, a Brazilian company [Higher Order Company](https://higherorderco.com/) released a beta version of the programming language [Bend](https://github.com/HigherOrderCO/Bend) and with it a utility of the same name to allow users to run programs written in `bend`. Simply put, the Bend language allows developers to write natively parallelizable programs to run on CPU cores or even the GPU.

By studying the help page itself provided with `--help` for `bend` and each of the subcommands I was able to construct the entire _completion_ script. Below is an example of what the completions look like for the `bend run-cu` subcommand that runs the program on the CUDA cores of your Nvidia graphics card:

```nu
# Compiles the program and runs it with the Cuda HVM implementation
export extern "bend run-cu" [
    -p                                              # Debug and normalization pretty printing
    -O: string@"nu-complete bend opts"              # Enables or disables the given optimizations
    --io                                            # Run with IO enabled
    -l                                              # Linear readback (show explicit dups)
    --stats(-s)                                     # Show runtime stats and rewrite counts
    --warn(-W): string@"nu-complete bend warn"      # Show the specified compilation warning
    --deny(-D): string@"nu-complete bend warn"      # Deny the specified compilation warning
    --allow(-A): string@"nu-complete bend warn"     # Allow the specified compilation warning
    --help(-h)                                      # Print help
    --entrypoint(-e): string                        # Use other entrypoint rather than main or Main
    --verbose(-v)                                   # Be verbose
]
```

Note that I mention two commands: `nu-complete bend warn` and `nu-complete bend opts`. This is another one of the really cool features of completions in Nushell that allows me to write a function that indicates a set of possible values for an option. This is how the two aforementioned commands are defined:

```nu
def "nu-complete bend opts" [] {
    [all, no-all, eta, no-eta, prune, no-prune, 
    linearize-matches, linearize-matches-alt, 
    no-linearize-matches, float-combinators, 
    no-float-combinators, merge, no-merge, inline, 
    no-inline, check-net-size, no-check-net-size]
}

def "nu-complete bend warn" [] {
    [all, irrefutable-match, redundant-match, unreachable-match, unused-definition, repeated-bind, recursion-cycle]
}
```

Therefore, by typing `bend run-cu -O` and pressing `Tab` I can choose an optimization option from those available:

```nu
$ | bend run-cu -O
all                    no-all                 eta                    no-eta
prune                  no-prune               linearize-matches      linearize-matches-alt
no-linearize-matches   float-combinators      no-float-combinators   merge
no-merge               inline                 no-inline              check-net-size
no-check-net-size
```

## Sending my contribution

A few minutes after opening my _fork_ pull request for _upstream_, a maintainer gave me feedback. He requested that I write a short `readme.md` to inform what `bend` is and where people can get it.

I wrote `readme`, updated the PR and in less than 10 minutes the maintainer approved my _script_ and merged it into _master_.

With this, I am now prepared to, together with my partner, make more contributions, since I now know well how the project's contribution cycle works.
