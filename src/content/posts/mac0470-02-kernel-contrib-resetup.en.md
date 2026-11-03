---
post: mac0470-02-kernel-contrib-resetup.pt
language: en
title: "[MAC0470#02] - Restarting the Setup"
description: "Trying to configure the setup again"
---

In the [previous post](/blog/mac0470-01-kernel-contrib-setup), everything was going great until everything went wrong. So, at home, calmly, I started the tutorials again with more attention (and now a little more experience with the problems I might encounter).

## Virt-Resize

Early on, I ran into a problem when running `virt-resize` to resize the image we were using. During classes, the solution I found was to use `sudo`. This meant that all commands that involved the use of virtual machine images also required `sudo`. Searching _online_, I ended up finding [the reason](https://askubuntu.com/questions/1046828/how-to-run-libguestfs-tools-tools-such-as-virt-make-fs-without-sudo). For some reason the _kernel_ installed on the _host_ machine does not have read permission, so I was offered two solutions:

- Download an alternative kernel and point `libguestfs` to it using an environment variable
- Give read permission to the _kernel_ installed on my machine using `sudo chmod +r /boot/vmlinuz*`

The second option, despite seeming the least safe, was the one that ended up working for me. I did not explore any possible security problems that my action could bring. If you are reading this, run the given command `chmod` at your own risk.

## SSHD

Having overcome the first hurdle, I was able to start the virtual machine. This time, the problem with _ssh_ was simple to solve. All you had to do was follow the tutorial and, after restarting the virtual machine, run the command `dpkg-reconfigure` again. With that, the _ssh_ daemon worked perfectly and I was able to obtain the list of modules (a step listed as optional, but which, in my view, was crucial for compiling the _kernel_ later).

## Compiling

With everything configured, now it was time to compile the _kernel_ for the first time. Compilation was much faster and without any surprises. This time, I used the list of modules I collected from the virtual machine and activated my machine's "performance mode" (Ubuntu's power saving option). Now the compilation was done in "just" 7 minutes (previously it took 20).

While finishing the third tutorial, already adding a module, I noticed that I forgot to make a suggested modification to `simple_mod.c` to use `simple_mod_part.c`. This led me to my first compilation experience without following the step by step. It was quite simple, just run `make M=drivers/misc/`, copy `.ko` to the correct location within the virtual machine, use `modprobe` to install and remove the module and view the `dmesg` log to see the correct execution of the modified version of `simple_mod.c`

## Conclusion

All the confusion I had while trying to do the setup for the first time was resolved just by reading the texts more carefully and researching more on the internet. Most of the time, instead of fixing one problem with another, it is much more effective to get rid of everything and start over using the experience you have acquired.

One of the problems I still have is the confusion with so many compilation commands available. We have:

- `make M=`
- `make modules_prepare`
- `make Image.gz modules`
- `make modules_install` (need to set `INSTALL_MOD_PATH`)
- `make menuconfig`

Of course, always defining `ARCH=arm64` and `CROSS_COMPILE=aarch64-linux-gnu-`
