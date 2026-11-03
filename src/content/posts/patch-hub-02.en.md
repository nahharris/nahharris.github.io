---
post: patch-hub-02.pt
language: en
title: "[Patch-Hub #02] - Logger"
description: "First feature, a logger"
---

As soon as I started on the project, David showed me a feature that he had started to implement himself: a log system. The initial implementation was very simple, with a log queue, a function that added new messages to the queue and a system that printed all messages on the terminal as soon as the program was closed. I then started to develop this idea further.

## Log Storage

Saving logs in a queue and displaying them at the end of the application has a problem: they cannot be stored permanently. Once you close the terminal, those logs will be lost forever. Furthermore, if the application were terminated abruptly due to an unhandled internal error, the logs could be lost.

I then implemented a mechanism that would store the logs in files immediately as they were generated, minimizing the chances of them being lost, in addition to allowing the user to consult them in the future. Furthermore, every log message now had a timestamp indicating when it was generated.

## Log Levels

Since the logs will all be stored in files, is it necessary to display them all in the terminal? The answer is: it depends. We'll let the user decide. For this, I created different log levels: `INFO`, `WARN` and `ERROR`. They are all written to the log file, but only those severe enough will be displayed in the terminal (verbosity). This is a user configuration (feature in progress).

## Technical Challenge

Here are some technical details about how the logger was implemented. The logger needs to store some data (log file name, verbosity level, logs to be displayed on the terminal, etc.). So it makes sense to create a data structure for this that has interesting methods so that developers can record their log messages. However, it doesn't make sense that they can instantiate more than one logger, we need a _Singleton_ (a data structure that has only one instance during the entire program execution).

Unlike languages like Kotlin and Java, singletons aren't exactly a thing in Rust. I mean, it is possible to implement, but some juggling is required. It's easy to prevent the creation of instances of the type `Logger` that I created. However, creating just one instance requires some choices.

This instance needs to be globally accessible, so it must be created as `static`, which would be a value that will last throughout the execution of the code. It cannot be constant/immutable since I need to modify it to add new logs to the queue. Therefore, it could be a `static mut LOGGER: Logger` or be of a type that allows internal mutability such as `static LOGGER: Mutex<Logger>`.

Mutability? Ah yes, a little Rust. By default, values in Rust cannot be modified, this prevents a series of problems in parallel environments, while limiting us in several aspects. Hence the term `mut`. Things `mut` in Rust can have their values modified following some rules. One of them, for example, says that only one _mutable reference_ can exist at a time. Creating a `static mut` globally allows multiple mutable references to exist. Therefore, to use one of these references the compiler forces us to mark the code as unsafe (`unsafe`) indicating that we are assuming the risks. A `Mutex` is a type that adds a safety barrier by ensuring that only one mutable reference exists at a time via the `Mutex::lock` method, however this comes at a slight performance cost.

```rs
//! src/singleton.rs
use std::sync::Mutex;

// Unicas instâncias de Singleton possíveis
pub static mut SINGLE_MUT_REF: Singleton = Singleton { x: 42 };
pub static SINGLE_MUTEX: Mutex<Singleton> = Mutex::new(Singleton { x: 42 });

// Campo `x` privado, logo não é possível construir Singleton diretamente
pub struct Singleton {
    x: i32,
}

impl Singleton {
    // Método que requer mutabilidade
    pub fn set_x(&mut self, x: i32) {
        self.x = x;
    }
}
```

```rs
//! src/main.rs
use std::thread;

use singleton::{SINGLE_MUTEX, SINGLE_MUT_REF};

mod singleton;

fn main() {  
    // Thread que acessa SINGLE_MUT_REF e SINGLE_MUTEX  
    let handle = thread::spawn(move || {
        // Acesso inseguro a SINGLE_MUT_REF
        let a2 = unsafe{ &mut SINGLE_MUT_REF };
        // Acesso seguro a SINGLE_MUTEX
        let mut b2 = SINGLE_MUTEX.lock().unwrap();
        
        a2.set_x(44); // Pode gerar condição de corrida
        b2.set_x(44); // Não gera condição de corrida
    });
    
    // Acesso inseguro a SINGLE_MUT_REF
    let a1 = unsafe{ &mut SINGLE_MUT_REF };
    // Acesso seguro a SINGLE_MUTEX
    let mut b1 = SINGLE_MUTEX.lock().unwrap();


    a1.set_x(43); // Pode gerar condição de corrida
    b1.set_x(43); // Não gera condição de corrida
    
    drop(b1); // unlock
    handle.join().unwrap();
}
```

The existence of multiple mutable references is only a problem in multithreaded environments where two mutable references can actually be used simultaneously, generating a race condition. However, patch-hub does not make use of any form of parallelism so far, so we opted for the unsafe but faster approach.

## Next Steps

- Allow verbosity configuration.
- Apply coloring to logs in the terminal.
- Actually use logging mechanisms throughout the code.