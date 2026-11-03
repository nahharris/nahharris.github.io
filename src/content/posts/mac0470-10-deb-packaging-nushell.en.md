---
post: mac0470-10-deb-packaging-nushell.pt
language: en
title: "[MAC0470#10] - Trying to Package Nushell for Debian"
description: "And failing miserably"
---

I write this post right after the end of our brave attempt.

We were asked to try to create a package for Debian. My group (Lais Nuto and Thiago Duvanel) and I tried to create a package for Nushell (taking advantage of the context in which we were already immersed).

## Packaging Tool

The first challenge was finding a tool to try to package nushell, which is a Rust project. We initially tried with `dh-cargo` but didn't find many sources of help. We later changed to `debcargo` which is what worked for us.

## Creating the Setup

We did everything in a container with Debian Testing and installed the dependencies listed in the [tutorial](https://salsa.debian.org/rust-team/debcargo-conf/blob/master/README.rst). After installing, we clone the `debcargo-conf` repository and run `./update.sh nu` to get the Nushell _crate_ source code.

## Creating `.dsc`

After getting a little confused with the instructions. We run `./release.sh nu` to produce the files to generate a release. We adjust all `FIXME` in the files `debian/control`, `debian/copyright` and `debian/changelog`. And we run `./build.sh nu`. Finally this generated us a `rust-nu_0.94.2-1.dsc`.

Unfortunately, this is where our journey ends. To be able to generate a `.deb` from `.dsc`, we encountered a problem with a long list of dependencies:

- rustc:native (>= 1.77.2)
- librust-crossterm-0.27+default-dev
- librust-ctrlc-3+default-dev (>= 3.4-~~)
- librust-log-0.4+default-dev
- librust-miette-7+default-dev (>= 7.2-~~)
- librust-miette-7+fancy-dev (>= 7.2-~~)
- librust-miette-7+fancy-no-backtrace-dev (>= 7.2-~~)
- librust-mimalloc-0.1-dev (>= 0.1.42-~~)
- librust-nix-0.28+fs-dev
- librust-nix-0.28+process-dev
- librust-nix-0.28+signal-dev
- librust-nix-0.28+term-dev
- librust-nu-cli-0.94+default-dev (>= 0.94.2-~~)
- librust-nu-cli-0.94+plugin-dev (>= 0.94.2-~~)
- librust-nu-cli-0.94+system-clipboard-dev (>= 0.94.2-~~)
- librust-nu-cmd-base-0.94+default-dev (>= 0.94.2-~~)
- librust-nu-cmd-extra-0.94+default-dev (>= 0.94.2-~~)
- librust-nu-cmd-lang-0.94+default-dev (>= 0.94.2-~~)
- librust-nu-cmd-lang-0.94+mimalloc-dev (>= 0.94.2-~~)
- librust-nu-cmd-lang-0.94+sqlite-dev (>= 0.94.2-~~)
- librust-nu-cmd-lang-0.94+system-clipboard-dev (>= 0.94.2-~~)
- librust-nu-cmd-lang-0.94+trash-support-dev (>= 0.94.2-~~)
- librust-nu-cmd-lang-0.94+which-support-dev (>= 0.94.2-~~)
- librust-nu-cmd-plugin-0.94+default-dev (>= 0.94.2-~~)
- librust-nu-command-0.94+default-dev (>= 0.94.2-~~)
- librust-nu-command-0.94+plugin-dev (>= 0.94.2-~~)
- librust-nu-command-0.94+sqlite-dev (>= 0.94.2-~~)
- librust-nu-command-0.94+trash-support-dev (>= 0.94.2-~~)
- librust-nu-command-0.94+which-support-dev (>= 0.94.2-~~)
- librust-nu-engine-0.94+default-dev (>= 0.94.2-~~)
- librust-nu-engine-0.94+plugin-dev (>= 0.94.2-~~)
- librust-nu-explore-0.94+default-dev (>= 0.94.2-~~)
- librust-nu-lsp-0.94+default-dev (>= 0.94.2-~~)
- librust-nu-parser-0.94+default-dev (>= 0.94.2-~~)
- librust-nu-parser-0.94+plugin-dev (>= 0.94.2-~~)
- librust-nu-path-0.94+default-dev (>= 0.94.2-~~)
- librust-nu-plugin-engine-0.94+default-dev (>= 0.94.2-~~)
- librust-nu-protocol-0.94+default-dev (>= 0.94.2-~~)
- librust-nu-protocol-0.94+plugin-dev (>= 0.94.2-~~)
- librust-nu-std-0.94+default-dev (>= 0.94.2-~~)
- librust-nu-system-0.94+default-dev (>= 0.94.2-~~)
- librust-nu-utils-0.94+default-dev (>= 0.94.2-~~)
- librust-reedline-0.32+bashisms-dev
- librust-reedline-0.32+default-dev
- librust-reedline-0.32+sqlite-dev
- librust-reedline-0.32+system-clipboard-dev
- librust-serde-json-1+default-dev
- librust-simplelog-0.12+default-dev
- librust-time-0.3+default-dev
- librust-winresource-0.1+default-dev

In order for us to proceed, it would be necessary for all of these dependencies to be packaged as well. Which would be a huge task that would require dozens of hours of work.
