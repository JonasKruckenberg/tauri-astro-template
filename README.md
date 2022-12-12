# Tauri + Astro (optimized edition)

This template should help get you started building **tiny** with Tauri and Astro.

This template goes beyond the base template in the `main` branch to agressively optimize the binary for size. See [Optimizations](#optimizations) for a list. **Keep in mind that not all optimizations will make sense for your app!**

![App Screenshot](./Screenshot-light.png#gh-light-mode-only)
![App Screenshot](./Screenshot-dark.png#gh-dark-mode-only)

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Tauri](https://marketplace.visualstudio.com/items?itemName=tauri-apps.tauri-vscode) + [rust-analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer).

# Optimizations

## `astro-compress`

This addition is faily straightforward, it's a astro integration that runs over all your final frontend assets and optimizes them for size.

## Rust optimizations

This adds the following Rust build config

```toml
[profile.release]
panic = "abort" # Strip expensive panic clean-up logic
codegen-units = 1 # Compile crates one after another so the compiler can optimize better
lto = true # Enables link to optimizations
opt-level = "s" # Optimize for binary size
strip = true
```

which will enable all the size-relevant compiler optimizations.

## Rebuilt the standard library

You can build your Tauri using the following command which will shave a few kilobytes of your final size, because it will apply all the size optimizations above to the standard library code too.

```sh
cargo tauri build --target <TODO set target triple> -- -Z build-std=std,panic_abort -Z build-std-features=panic_immediate_abort
```

## UPX

Use this command to compress the final binary using UPX. Note that this currently doesn't work for `aarch64-apple-darwin` targets.

```sh
upx src-tauri/target/<TODO set target triple>/release/bundle/macos/tauri-astro.app/Contents/MacOS/tauri-astro
```