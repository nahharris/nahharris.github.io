---
post: mac0470-05-kw-contrib.pt
language: en
title: "[MAC0470#05] - Contributing to kworkflow"
description: "My second contribution, now with a tool for the kernel"
---

Here begins a new stage in the course. We have closed the contribution cycle with the kernel and now we begin the contribution cycle with kworkflow.

## What is kworkflow

Simply put, a collection of _scripts_ to assist in the Linux kernel development process (this was the initial purpose, currently the project extends beyond that).

## Preparing the Environment

To contribute to _kw_ (kworkflow) we use a different and more modern approach, when compared to the way the kernel approaches it. Here we create a _fork_ of the `kworkflow/kworkflow` repository on GitHub and develop on the `unstable` branch.

At this point I made a mistake by accidentally performing a _fork_ using only the `master` branch. The solution was to run `fetch --all` to collect the branches from `upstream`, then checkout `unstable` and define its _upstream_ as `origin/unstable`. In reality, the process took a little time until my partner and I discovered exactly what we had done wrong in the _fork_, but in the end everything went well.

## Contributing

While digging through the _kw_ repository, I found a curious piece of code where the environment variable `KW_SOUND_DIR` being set twice to `/usr/share/sounds/kw` which is an unnecessary code redundancy.

Our contribution was to correct this. The curious part is that, although our contribution did not actually change the functioning of _kw_ in any way, GitHub's _CI_ rejected our _pull request_. Fortunately, for us, it was a _CI_ error, we just asked the maintainers to run _CI_ again and our _PR_ was approved.
