---
post: mac0470-11-kw-nu-completions.pt
language: en
title: "[MAC0470#11] - Nu Scripts and KW"
description: "The crossover"
---

The final contribution that my partner and I made this semester was, in a way, a union of what was worked on throughout the semester. Combining the knowledge we gained about `kw` and creating _nu scripts_ for _completions_, we created _completions_ in `nu` for `kw` and integrated this into the `kw` installation script.

## The _Completions_

Creating the _completions_ was not very complicated as `kw` has good documentation for the most part (there are some undocumented flags in some commands, but they are rare). The most interesting part was working on the `kw init` command.

One of the flags of this command (`--arch`) specifies the architecture for which the _kernel_ will be compiled. Reading the _manpage_ I discovered that the available architectures are listed in the `arch` directory within the _kernel tree_. All it took was a simple function to create a smart _completion_ for this.

It only took a few hours for us to write all the completions for `kw`.

## `setup.sh`

`kw` is installed via a `setup.sh` script. My original idea was to place a copy of the script we created within the `kw` repository and copy it somewhere during installation. However, a more interesting approach would be to download the script during installation. This would avoid having to "keep" the same script updated in two different repositories.

So my contribution was based on finding the installation point where `kw` installs the _completions_ for `bash` and `zsh` and then adding a flow that:

1. Detects whether the user has nushell installed
2. Ask whether the user wants to install it
3. Download the script and instruct the user how to activate

If the user does not want to install or the download fails, I provide the repository link so that they can download it manually later.
