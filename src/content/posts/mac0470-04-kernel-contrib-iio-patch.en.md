---
post: mac0470-04-kernel-contrib-iio-patch.pt
language: en
title: "[MAC0470#04] - Submitting a patch"
description: "Moment of truth, sending our contribution"
---

In the [previous post](/blog/mac0470-03-kernel-contrib-iio), we made our modifications for patch submission. In fact, we first submitted the patch to the course teaching assistants so they could review our code. They found some errors (mainly, absence of `{ }` indicating the scope where direct mode would be used).

We just applied the corrections requested by the teaching assistants and resent the patch so they could evaluate it again.

The kernel development team sends patches by email. I needed to configure `git` to authenticate with my institutional _email_ using `kw mail` and then use the `format-patch` subcommand of `git` to create the `.patch` files. I only modified the _cover letter_ to be as expected and I had to modify the other `.patch` files to point to the correct e-mail (on my machine, my personal _e-mail_ was configured as default, while I wanted to send the patches with my USP institutional _e-mail_).

With everything configured, sending the patches via _email_ was as simple as `git send-email *.patch`.
