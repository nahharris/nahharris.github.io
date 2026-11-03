---
title: "Actor Model outside Distributed Systems"
description: "My bachelor’s thesis: applying the Actor Model to centralized applications with Rust, Tokio, and Patch Hub."
pubDate: "2025-04-02"
heroImage: "/tcc.jpg"
tags: ["rust","architecture","research"]
color: "mauve"
links: [{"label":"Read the thesis","url":"/mac0499/thesis.pdf"},{"label":"Source on GitHub","url":"https://github.com/nahharris/ph-actors-tcc"}]
---

A bachelor’s thesis at IME-USP, published April 2, 2025. Supervised by Prof. Dr. Paulo Roberto Miranda Meirelles, with co-supervision by David de Barros Tadokoro.

<section>
        <h2>Summary</h2>
        <p>
          The Actor Model is a mathematical theory widely used in distributed systems architecture. This work explores the application of the Actor Model in the development of centralized applications (i.e., not distributed), seeking to understand whether it is possible to extract value from this architectural pattern even outside its natural context.
        </p>
        <p>
          The objectives of this work are: to propose an architectural framework based on the Actor Model adapted for centralized applications in Rust; to implement an application using the proposed architecture through a case study in the Patch-Hub project; and to perform a qualitative and quantitative analysis of the produced application.
        </p>
        <p>
          The developed application was evaluated from the perspectives of testability, performance, maintainability, and extensibility. The results demonstrate that, although the Actor Model is not naturally suited for centralized applications, it is possible to successfully adapt it through reimagining both the problem and the pattern. The proposed architecture resulted in significant improvements in testability, extensibility, and responsibility isolation, although it increased code complexity and introduced runtime overhead with inter-actor communication.
        </p>
      </section>

<section>
        <h2>Objectives</h2>
        <ul>
          <li><strong>Architecture design:</strong> Develop an Actor Model architecture tailored for centralized applications, balancing distributed patterns with simplicity.</li>
          <li><strong>Practical implementation:</strong> Implement a Rust/Tokio application using Actor Model principles to showcase message-passing in a centralized context.</li>
          <li><strong>Engineering assessment:</strong> Assess software engineering aspects like maintainability and testability when applying Actor patterns in non-distributed systems.</li>
        </ul>
      </section>

<section>
        <h2>Roadmap</h2>
        <ul>
          <li><strong>Study the theory:</strong> Dive into Actor Model foundations and understand how distributed system concepts can apply to centralized applications. Examine existing implementations to extract valuable patterns.</li>
          <li><strong>Propose an architecture:</strong> Design a Rust-based Actor Model approach specifically for patch-hub's workflow. Create diagrams showing actor relationships and message flows while considering the constraints of a terminal application.</li>
          <li><strong>Start the implementation:</strong> Build the core system using Tokio's async runtime, focusing on message-passing mechanics and actor lifecycle management. Implement enough patch-hub functionality to validate the architecture in real usage.</li>
          <li><strong>Test the implementation:</strong> Compare performance against the original patch-hub implementation through benchmarks and real-world usage. Gather feedback on both technical metrics and user experience.</li>
          <li><strong>Gather the results:</strong> Document the strengths and weaknesses found during development and testing. Analyze where the Actor Model provided benefits or introduced unnecessary complexity in a centralized context.</li>
          <li><strong>Wrap up:</strong> Document the journey, architectural decisions, and implementation details. Present conclusions about using the Actor Model for centralized applications along with lessons learned.</li>
        </ul>
      </section>

<section class="references">
        <h2>References</h2>
        <ul>
          <li>Carl Hewitt. <a href="https://arxiv.org/abs/1008.1459" class="external">Actor Model of Computation: Scalable Robust Information Systems</a> (2010)</li>
          <li>Mohamad Kassab, Manuel Mazzara, JooYoung Lee, Giancarlo Succi. <a href="https://link.springer.com/article/10.1007/s11334-018-0319-4" class="external">Software architectural patterns in practice: an empirical study</a> (2018)</li>
          <li>Rust Foundation. <a href="https://rust-lang.org/" class="external">Rust: A language empowering everyone to build reliable and efficient software.</a></li>
          <li>Patch-Hub. <a href="https://github.com/kworkflow/patch-hub" class="external">patch-hub: a TUI that streamlines the interaction of Linux developers with patches archived on lore.kernel.org</a></li>
          <li>Source code. <a href="https://github.com/nahharris/ph-actors-tcc" class="external">ph-actors-tcc on GitHub</a></li>
        </ul>
      </section>

<span id="thesis"></span>

## Full thesis

[Read or download the full thesis (PDF)](/mac0499/thesis.pdf).
