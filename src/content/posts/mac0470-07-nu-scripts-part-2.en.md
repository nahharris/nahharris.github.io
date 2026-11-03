---
post: mac0470-07-nu-scripts-part-2.pt
language: en
title: "[MAC0470#07] - Nu scripts pt. 2"
description: "A few more completions"
---

Still in the saga of creating completions for Nushell, I created a new script for `gradlew` and slightly improved the script for `git`

## Gradle Wrapper

Gradle is a _build system_ widely used for projects in languages that run on the JVM generated from templates. The Gradle Wrapper is a script that usually comes with projects to ensure that the correct version of Gradle is used in the project even if Gradle is not even installed on the machine. The script is normally located in the `gradlew` file in the project root and is usually invoked with `./gradlew`.

To generate completions, in addition to the standard script flags, there are _tasks_. _Tasks_ are similar to the _targets_ of a `Makefile` and indicate tasks to be performed, for example: compile the project into a `.jar`, run the project, debug, clean artifacts produced by _build_, etc.

The list of available _tasks_ depends on the project and for this there is the _task_ `tasks` which lists all available _tasks_ (although it can be slow). A small example of output produced by `./gradlew tasks`

```txt
Application tasks
-----------------
run - Runs this project as a JVM application
runShadow - Runs this project as a JVM application using the shadow jar
startShadowScripts - Creates OS specific scripts to run the project as a JVM application using the shadow jar
```

The completion script for `./gradlew` includes a function that produces a list of _completions_ for each _task_ with the description provided by `./gradlew tasks` using _regexes_ with captures to generate a table of columns `value` and `description`.

```nu
def "nu-complete gradlew" [] {
    ./gradlew tasks
    | lines
    | parse --regex '(?P<value>[a-zA-Z]+) - (?P<description>.+)'
}
```

This produces tables like:

```txt
╭────┬────────────────────────────────────────────┬────────────────────────────────────────────────────────────────────╮
│  # │                    task                    │                            description                             │
├────┼────────────────────────────────────────────┼────────────────────────────────────────────────────────────────────┤
│  0 │ run                                        │ Runs this project as a JVM application                             │
│  1 │ runShadow                                  │ Runs this project as a JVM application using the shadow jar        │
│  2 │ startShadowScripts                         │ Creates OS specific scripts to run the project as a JVM            │
│    │                                            │ application using the shadow jar                                   │
╰────┴────────────────────────────────────────────┴────────────────────────────────────────────────────────────────────╯
```

Note that the `parse` command will ignore lines that do not follow the specified regex pattern.

## Git Clone

The script for `git`'s _completions_ did not have completions for the `clone` subcommand. Creating completions for git commands is as simple as looking at `git clone --help` and then listing the flags.

The good part of this is that I get to know a hundred new concepts about git that I didn't know, such as: git can clone a local repository, with or without _hardlinks_, and with or without the git protocol.
