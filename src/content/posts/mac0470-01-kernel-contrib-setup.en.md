---
post: mac0470-01-kernel-contrib-setup.pt
language: en
title: "[MAC0470#01] - Environment Setup"
description: "Setting up a kernel development environment"
---

Here I will cover my experience setting up a kernel development environment, guided by tutorials from [FLUSP](https://flusp.ime.usp.br/) for the MAC0470 course — Free Software Development.

In the first weeks of the course, after a short introduction to licenses and related topics, we started following the suggested tutorials for setting up a Kernel development environment for the [ARM](https://pt.wikipedia.org/wiki/Arquitetura_ARM) architecture. They are: [Use QEMU and libvirt to setup a Linux kernel test environment](https://flusp.ime.usp.br/kernel/qemu-libvirt-setup/), [Build the Linux kernel for ARM](https://flusp.ime.usp.br/kernel/build-linux-for-arm/), [Introduction to kernel build configuration and modules](https://flusp.ime.usp.br/kernel/modules-intro/).

I managed to follow all 3 introductory tutorials almost to the letter. The only problems were some steps that involved mounting things on virtual machines. In these cases I needed to give superuser permissions (the reason is still unknown). In addition, the _scripts_ provided in the tutorials have several errors. And also many problems in setting up access via _ssh_. After a lot of effort, I managed to get to the kernel compilation steps. On the hardware I used, [Rigel](/blog/my-equipment#rigel), compiling the entire kernel takes about 20 minutes.

The setup ended up being a little confusing and even poorly done (partly due to the incompleteness of the tutorial, partly due to carelessness on my part). However, at the end of the first week of April, I had more problems with my setup, where my virtual machine disappeared. This led me to start the tutorials again, this time researching and fixing the bugs more thoroughly.

[Continue...](/blog/mac0470-02-kernel-contrib-resetup.md)