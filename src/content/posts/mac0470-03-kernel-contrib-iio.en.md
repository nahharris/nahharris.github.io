---
post: mac0470-03-kernel-contrib-iio.pt
language: en
title: "[MAC0470#03] - Contributing to the IIO Subsystem"
description: "My first kernel contribution, made with a partner"
---

This new stage of the course involved first getting to know a little about the IIO subsystem and then making a contribution. We learned a little about _character devices_ before actually starting to study IIO. The tutorial on _character devices_ basically served to show us that input and output devices need to implement operations that are generally: opening, closing, reading and writing.

Next, we had a tutorial to show us the "face" of the IIO subsystem. Basically, IIO devices will operate on channels to handle both data reading and writing and, of course, describe how these reading and writing operations are carried out, analogous to _character devices_.

Finally, I met with my partner, [Laís Nuto Rossman](https://example.com), to make our contribution to the Linux kernel. We chose suggestion 3, related to the use of the `iio_device_claim_direct_scoped` function. As far as we understand, currently, IIO modules need to acquire a type of `lock` (similar to that used in concurrent systems) to be able to carry out their input and output operations. Currently, this is done by first acquiring this `lock` using `iio_device_claim_direct_mode`, performing the operations you want and subsequently performing an `unlock` using `iio_device_release_direct_mode`.

The problem is that explicitly acquiring a `lock` and then explicitly releasing it is a method open to failure. Using `iio_device_claim_direct_scoped` gives a more modern approach to this concept. In modern programming languages (let's use Rust as an example) when acquiring a `lock` from something you obtain the object you are taking possession of, and the `unlock` is automatically done as soon as the variable where you stored the `lock` goes out of scope. In classical approaches, you acquire a `lock` and there are no mechanisms restricting you to modify only the object you took possession of. Besides, you run the risk of forgetting to give the explicit `unlock`. Suggestion 3 involves precisely a modernization similar to that mentioned above, but for the `claim` and `release` system in the direct access mode of IIO devices. `claim_scoped` would be a modern way where `claim` is released as soon as we leave the scope where it was made.

We applied the suggestion to two modules: `ad7606.c` and `ad7923.c`, both located in `drivers/iio/adc`.
