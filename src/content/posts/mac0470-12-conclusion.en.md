---
post: mac0470-12-conclusion.pt
language: en
title: "[MAC0470#12] - The End?"
description: "Conclusion of the course"
---

Here we come to the end of this journey. In this post I will quickly go through each stage of the course, remembering what was done and trying to evaluate what I obtained from a learning point of view.

## Kernel

After following the initial tutorials (and having to redo them), my partner and I contributed to the `ad7607` and `ad7923` modules of the IIO subsystem, applying the suggestion to use `claim_direct_scoped`.

```c
switch (m) {
    case IIO_CHAN_INFO_RAW:
        iio_device_claim_direct_scoped(return -EBUSY, indio_dev) {
            ret = ad7606_scan_direct(indio_dev, chan->address);
                if (ret < 0)
                    return ret;
                *val = (short) ret;
                    return IIO_VAL_INT;
        }
        unreachable();
```

After some evaluations and resubmissions, one of our patches was integrated. However the other was not perfectly correct and some changes were requested that we did not understand very well.

I had already compiled the Linux _kernel_ in the past, but never explored/modified it, nor sent contributions. Firstly, it was fun to get to know the project design and understand the organization of subsystems and modules. However, knowing that the entire project organization is done through email lists is disturbing and a very high barrier to entry for beginners.

## Licenses

The class on licenses was very useful for me as I had little (almost no) knowledge on the subject. Today I can say that I at least have some idea of what the different licenses mean.

## KW

We were introduced to a contribution cycle with `kw` which we resolved very quickly as we intended to work with the project again for the second part of the course.

Our contribution was just a fix for an unnecessary redefinition of a variable in the main `kw` file.

```bash
KW_SOUND_DIR='/usr/share/sounds/kw'
```

## Contributions (`nushell`)

Plans changed. At this point I had started to adopt `nu` as my default _shell_ and found [nushell/nu_scripts](https://github.com/nushell/nu_scripts). I really liked the collection and started using it in my daily life. That's when I found a way to combine the useful with the pleasant and write utilities for nushell as contributions to the second stage of the course. After some time, I noticed that I could do something even better by creating a nushell script that helped with _completions_ for `kw` (which was our original contribution target).

## Packaging

We had a first tutorial with Joênio (which for some unknown reason I managed to do without any major problems) and then we went to our failed attempt to package nushell for Debian. The problem here was that nushell has dozens of dependencies not packaged for debian.

Originally, I didn't think dependencies were a problem because nushell is a single-binary program that compiles its dependencies statically. However, Debian packages are source code packages, which need to compile the program on their own. There's the problem, very few `crates` (name given to libraries in Rust) were packaged. And there is a reason for that.

Note a small part of the list of unpackaged dependencies:

- librust-nu-cmd-lang-0.94+default-dev (>= 0.94.2-~~)
- librust-nu-cmd-lang-0.94+mimalloc-dev (>= 0.94.2-~~)
- librust-nu-cmd-lang-0.94+sqlite-dev (>= 0.94.2-~~)
- librust-nu-cmd-lang-0.94+system-clipboard-dev (>= 0.94.2-~~)
- librust-nu-cmd-lang-0.94+trash-support-dev (>= 0.94.2-~~)
- librust-nu-cmd-lang-0.94+which-support-dev (>= 0.94.2-~~)

Note that they all have a prefix in common: `librust-nu-cmd-lang-0.94`. This is because all these packages belong to the same `crate`(`librust`): `nu-cmg-lang` which is the library with the definition of the `nu` language used by `nushell`. "But if they all come from the same library, why different packages?" The answer is after `+`.

Rust has a conditional compilation system, where when compiling a given `crate` you can declaratively compile or not compile parts of the code. These parts are called _features_ and they appear after `+` in the list of dependencies. The features available for this `crate` are: `mimalloc`, `sqlite`, `system-clipboard`, `trash-support` and `which-support`. Furthermore, a crate can define a set of these features as "default features" (in the case above, the default is not to use any of these features).

Therefore, maintaining a single `crate` Rust package means maintaining a package for each feature in addition to a standard package. Understandably many Rust libraries don't create packages. Furthermore, Rust already has its own package manager (Cargo) that allows you to install Rust programs on any platform. Therefore, it doesn't seem worth the effort of maintaining packages for Rust crates in general.

## Next Steps

I have already been warned by professor Paulo Meirelles that there will be a course that acts as a sequel to the current one and my plan is to participate in it and probably delve deeper into `nushell` now contributing to the main project itself. In addition to continuing (occasionally) contributing to free software projects.
