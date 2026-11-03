---
post: mac0470-08-nu-scripts-part-3.pt
language: en
title: "[MAC0470#08] - Nu scripts pt. 3"
description: "ASDF"
---

In the third part of our journey, I thought about creating _completions_ for another terminal tool that I use a lot: [asdf](https://asdf-vm.com). `asdf` is a tool version manager, in particular, used for tools related to programming languages.

I started by following my standard flow of creating _completions_ by writing a file `.nu` and doing `source` occasionally to test. However, I hadn't noticed one detail: asdf is already a `nu` script. Therefore, creating nu completions externally would overwrite the original script definitions.

This does not necessarily break `asdf`, but asdf already has an integration with nushell, as some commands return their results as nushell _tables_ and not simple strings.

In other words, my modifications should be made directly in the `asdf.nu` script. So, it was time to create a _fork_ of the `asdf` project.

## My Contributions

As stated earlier, `asdf` is used to manage tool versions. By executing the command `asdf plugin add <tool>` we install a plugin to manage `<tool>`. So, I created _completions_ to list all the plugins that are cataloged by `asdf` (at the moment there are around 700 plugins, unfortunately completion is relatively slow).

The `asdf install <tool> <version>` command installs the `<version>` version for the `<tool>` tool, so I added _completions_ to both arguments (in fact the completion for `<tool>` already existed, I just used it to list the installed plugins).

Finally, the `asdf global|local <tool> <version>` command that sets the version of the `<tool>` tool in the global or local scope. So, I added a completion to list the installed versions of the tool.

## The Pull Request

Unfortunately, I hadn't paid attention to the detail that no commits had been made to the project repository for 5 months. I opened the PR and someone (not related to the project) commented "Ok". Since then I have had no further feedback.
