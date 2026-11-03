---
post: tutorial-linters.pt
language: en
title: "Linters Tutorial"
description: "The very basics of linters"
---

## What is a linter

Linters are static code analysis tools that serve to detect semantic problems in the code that the compiler cannot detect and that could harm program execution or code maintainability. Linters have settings that can be customized to determine how to inspect code through rules and levels, thus determining code writing standards.

A rule says what type of pattern the linter should inspect in the code. There are rules for the most diverse standards, for example: using `camelCase` names, using type notations (in dynamic languages), checking function sizes, checking null values, prohibiting the use of certain methods, etc.

For each rule, the severity level of a violation is defined; the usual levels are off, warning, and error. We can configure a rule to use function names `snake_case` with error level. So, when writing code like the one below:

```js
function DoSomething() {
    // ...
}
```

A linter like ESLint would throw an error that the function name does not meet the standard

## Configuring Linters

### Javascript ESLint

> Reference https://eslint.org/

Add ESLint to your Node project with

```sh
npm install --save-dev eslint @eslint/js
```

Create the configuration file `eslint.config.js` and start with the default setup:

```js
import js from "@eslint/js";

export default [
    js.configs.recommended,
{
    rules: {
        "no-unused-vars": "warn",
    }
}
];
```

The `rules` field is where the settings are made for which rules ESLint should adopt when running the verification of your project. See all [configuration](https://eslint.org/docs/latest/use/configure/) options and the [list of rules](https://eslint.org/docs/latest/rules/).

To run the linter run (in the project root):

```sh
npx eslint . # vai analisar todos arquivos do diretório atual
npx eslint . --fix # analisa e corrige os arquivos 
```

Text editors support extensions to integrate ESLint into your workflow. VS Code's ESLint extension performs real-time analysis, shows issues in your code, and provides code actions to apply fixes.

### Python Pylint ##

>Reference https://www.pylint.org/

Install pylint available on PyPI

```sh
pip install pylint
```

Create the default settings file

```sh
pylint --generate-rcfile
```

The file is divided into sections, one for each checker (_checker_), you can see the different [resources](https://pylint.pycqa.org/en/latest/user_guide/configuration/all-options.html) (in the format of options for the command line) and more [details](https://pylint.pycqa.org/en/latest/user_guide/checkers/features.html)

You can pass the command line options to the `pylint --generate-rcfile` command and thus generate a file with the desired options.

To run the linter run (in the project folder):

```sh
pylint . # vai analisar todos arquivos no diretório atual
```

Text editors support extensions to integrate Pylint into your workflow. VS Code's Pylint extension performs real-time analysis, shows issues in your code, and provides code actions to apply fixes.

### Rust Clippy

> Reference https://doc.rust-lang.org/clippy/

Clippy is already installed as a component in the default Rustup installation. If you don't have it, add it with:

```sh
rustup component add clippy
```

Modify your project's `Cargo.toml` file to include two new sections:

```toml
[lints.rust]

[lints.clippy]
```

Rust has a native linter (quite simple), its rules can be configured in the first section. The linting rules added by `Clippy` should be in section `[lints.clippy]` Check the complete documentation about [configuration](https://doc.rust-lang.org/clippy/configuration.html) and [rules](https://doc.rust-lang.org/clippy/lint_configuration.html).

To run the linter run (in the project folder):

```sh
cargo clippy
```

### Kotlin Ktlint

>Reference https://pinterest.github.io/ktlint/latest/

Unlike other linters, Ktlint is recommended to be installed as a plugin for your text editor. To install the plugin in IntelliJ IDEA, go to _File > Settings > Plugins > Marketplace_ and search for _Ktlint_ and install. Basically no configuration is required, the plugin already comes with the default rules that are recommended as a way to truly standardize the code style.

Code checking and formatting is done automatically by the plugin.
