---
post: patch-hub-04.pt
language: en
title: "[Patch-Hub #04] - UX"
description: "Improving the user experience"
---

*patch-hub* already has several of its planned features, but it still needs more attention to usability.

## Loading Screens

*patch-hub* runs on a single processor core. One consequence is that users receive no feedback during long operations, such as downloading *patchsets* from mailing lists. We decided to add dynamic loading screens, but that meant introducing parallelism into the project, which is not a simple task in Rust.

Rust focuses on safety, and parallelism is a common source of problems. The compiler enforces rules around code that runs in parallel, so the first part of implementing loading screens was adapting patch-hub's structure to support it.

One important detail is the use of references, Rust's safe approach to pointers. A Rust reference cannot refer to a value that has already been freed, so it carries information about the referenced value's lifetime. That makes references tricky to use with *threads*: a thread may run indefinitely, while a value outside its scope could be freed before the thread finishes.

The solution is to use *mutexes* or move values into the *thread*. For *patch-hub*, we need parallelism in a specific situation: the main *thread* performs a potentially slow operation while a helper *thread* renders an animated loading screen in the terminal. The helper needs to take ownership of the terminal object and return it to the main thread when we *join* it.

Once those details were resolved, I implemented the foundation for the loading screen using a macro:

```rs
terminal = loading_screen! {
    terminal,
    "Loading patchset" => {
        app.init_details_actions()?; // Ação demorada
        app.set_current_screen(CurrentScreen::PatchsetDetails);
    }
};
```

The `loading_screen!` macro receives three parameters:

- The terminal object where we render
- The text to show on the loading screen
- The potentially slow code to execute
- It returns the terminal once it has finished using it

When called, the macro wraps the slow code in structures that:

- Create a thread to draw the loading screen and give it the terminal
- Execute the slow code
- Tell the thread when the code has finished
- Recover the terminal object and return it to the main thread

Now *patch-hub* can give users visual feedback while something is loading.

<img src="/assets/projects/patch-hub/patch-hub-loading-screen.png" alt="Patch Hub loading screen"></img>

## Help Pop-ups

As another usability improvement, I introduced help pop-ups. Each screen can open its own pop-up when the `?` key is pressed. I made the system as generic as possible so that other kinds of pop-ups can reuse the same structure in the future.

A pop-up has three basic responsibilities:

- Report its dimensions
- Provide a method to render itself
- Describe how it handles keyboard input

This is implemented as a `trait` named `PopUp`, an interface describing the functions a type needs to implement to be a pop-up. *patch-hub* keeps a stack of objects that implement `PopUp` and displays them over the screen content while the stack is not empty.

Each screen can add its help pop-up to the stack when `?` is pressed. It describes what the screen does and which shortcuts are available.

<img src="/assets/projects/patch-hub/help-pop-up.png" alt="Help pop-up"></img>
