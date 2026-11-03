---
post: patch-hub-03.pt
language: en
title: "[Patch-Hub #03] - Rendering Patches"
description: "Integrating patch-hub with more open source tools"
---

One of the core features of the patch-hub is the ability to see the content of patches, i.e. a `patch`/`diff`. A `diff` is the format used by `git` to record changes (differences) between different commits. The problem is that this format was designed to be easy for git to use, it is not exactly very readable.

A small example of what a diff looks like

```txt
diff --git a/src/app.rs b/src/app.rs
index 89c7e61..c576a03 100644
--- a/src/app.rs
+++ b/src/app.rs
@@ -563,6 +563,9 @@ impl App {
             if let Ok(git_send_email_option) = edit_config.extract_git_send_email_option() {
                 self.config.set_git_send_email_option(git_send_email_option)
             }
+            if let Ok(patch_renderer) = edit_config.extract_patch_renderer() {
+                self.config.set_patch_renderer(patch_renderer.into())
+            }
         }
     }
 
diff --git a/src/app/config.rs b/src/app/config.rs
index ff8629e..9b23565 100644
--- a/src/app/config.rs
+++ b/src/app/config.rs
@@ -168,6 +168,10 @@ impl Config {
         self.git_send_email_options = git_send_email_options;
     }
 
+    pub fn set_patch_renderer(&mut self, patch_renderer: PatchRenderer) {
+        self.patch_renderer = patch_renderer;
+    }
+
     pub fn save_patch_hub_config(&self) -> io::Result<()> {
         let config_path = if let Ok(path) = env::var("PATCH_HUB_CONFIG_PATH") {
             path
diff --git a/src/app/edit_config.rs b/src/app/edit_config.rs
index 0687e7d..73fd726 100644
--- a/src/app/edit_config.rs
+++ b/src/app/edit_config.rs
@@ -20,6 +20,10 @@ impl EditConfigState {
             EditableConfig::GitSendEmailOpt,
             config.get_git_send_email_options().to_string(),
         );
+        config_buffer.insert(
+            EditableConfig::PatchRenderer,
+            config.patch_renderer().to_string(),
+        );
 
         EditConfigState {
             config_buffer,
@@ -145,6 +149,11 @@ impl EditConfigState {
         // TODO: Check if the option is valid
         Ok(git_send_emial_option)
     }
+
+    pub fn extract_patch_renderer(&mut self) -> Result<String, ()> {
+        let patch_renderer = self.extract_config_buffer_val(&EditableConfig::PatchRenderer);
+        Ok(patch_renderer)
+    }
 }
 
 #[derive(Debug, Hash, Eq, PartialEq)]
@@ -153,6 +162,7 @@ enum EditableConfig {
     CacheDir,
     DataDir,
     GitSendEmailOpt,
+    PatchRenderer,
 }
 
 impl EditableConfig {
@@ -162,6 +172,7 @@ impl EditableConfig {
             1 => Some(EditableConfig::CacheDir),
             2 => Some(EditableConfig::DataDir),
             3 => Some(EditableConfig::GitSendEmailOpt),
+            4 => Some(EditableConfig::PatchRenderer),
             _ => None, // Handle out of bounds
         }
     }
@@ -173,6 +184,7 @@ impl Display for EditableConfig {
             EditableConfig::PageSize => write!(f, "Page Size"),
             EditableConfig::CacheDir => write!(f, "Cache Directory"),
             EditableConfig::DataDir => write!(f, "Data Directory"),
+            EditableConfig::PatchRenderer => write!(f, "Patch Renderer (bat, delta, diff-so-fancy)"),
             EditableConfig::GitSendEmailOpt => write!(f, "`git send email` option"),
         }
     }
```

We could then create a feature in patch-hub to give some styling to these diff files to make it easier to understand what is written in these patches. But why implement this from scratch? We are working with free software, we can use tools produced by other people to enrich our application. I know, in advance, 3 terminal tools capable of styling patch files: `bat`, `delta`, `diff-so-fancy`.

## [`bat`](https://github.com/sharkdp/bat)

`cat` with wings (in the words of the developers) is a tool that syntax-highlights a hundred different text formats, including the `diff` format, applying colors to indicate `@@` placeholders, removed lines (prefixed with `-`) and added lines (prefixed with `+`). A very popular tool that, with this simple feature, can greatly improve the readability of patches.

[![bat on patch-hub](https://asciinema.org/a/nDKHt1Q1eyg7eKr1xGuZPzJXF.svg)](https://asciinema.org/a/nDKHt1Q1eyg7eKr1xGuZPzJXF)

## [`delta`](https://github.com/dandavison/delta)

Also called git-delta, it was intended to be used by `git` as a pager for the `git diff` command. But it can also be used to render the contents of patch files. `delta` produces much richer rendering than `bat` with separators and even syntax-highlight of each hunk.

[![delta on patch-hub](https://asciinema.org/a/ITkDDrem3qb8MPcYQ15jEm871.svg)](https://asciinema.org/a/ITkDDrem3qb8MPcYQ15jEm871)

## External Dependencies Challenge

In conversation with David, we decided to take the following approach to using these external tools to render patches:

- We give predefined configurations of which tools to use by defining their flags
- These tools are completely optional so the system should work without them installed

## Was it difficult?

Using the tools themselves wasn't complicated. The difficulty was in integrating them into the patch-hub flow. It was necessary:

- Create option in settings to select a renderer
- Collect the content of the patches and pass it through the renderer before drawing it in the terminal
- Convert colored ansi text to colored text from `ratatui` (interface library we are using) using `ansi-to-tui`
- Finally, draw the text on the screen

This whole process certainly enriched my ability to look for solutions, since a primary idea would be to transform the `preview` part of the screen into a pseudo-terminal that runs the tools (this would be too complicated and certainly less efficient). In addition to learning how to perform good integration with the existing code base. For example, when creating a new configuration option I had to:

- Include it in the test suite
- Add it in the settings edit screen
- Read the option from environment variables
