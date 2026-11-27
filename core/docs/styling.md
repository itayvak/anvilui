# Customizing styles

What you can rely on when you style AnvilUI with your own CSS, and what can change in any release.

Reach for these in order: props (`color`, `fillType`, `size`), then the theme and tokens ([theming.md](theming.md)), then `className` / `style` on the component, and only then CSS against the public hooks below.

## Public: stable until a major version

| Hook | Examples | Notes |
| --- | --- | --- |
| Theme color variables | `--avl-color-primary`, `--avl-color-on-primary`, `--avl-color-surface`, `--avl-color-divider` | One per theme role (see [theming.md](theming.md)). Defined inside `AnvilRoot`. |
| Token variables | `--avl-spacing-x1` … `x20`, `--avl-radius-*`, `--avl-font-*`, `--avl-font-size-*`, `--avl-shadow-*`, `--avl-ease-*`, `--avl-outline-size`, `--avl-disabled-opacity` | One per key in `DesignTokens`. |
| Each component's root class | `.avl-button`, `.avl-card`, `.avl-menu-item`, `.avl-search-item` | `avl-` plus the component's name in kebab-case, on the element that gets `className`. `AnvilRoot` uses `.avl-root`. Components that render no element of their own (`Dialog`, `Menu`, `Popover`, `BottomSheet`, ...) have none: style their parts (`.avl-dialog-popup` is `DialogPopup`'s root class). |
| State attributes | `[data-checked]`, `[data-pressed]`, `[data-disabled]`, `[data-popup-open]` | Set by Base UI. Each part's attributes are in its Base UI docs (`node_modules/@base-ui/react/docs/react/components/`). |

A public variable or class that gets renamed keeps working under its old name for at least one minor version before it's removed.

## Internal: can change in any release

- Classes for parts and variants: `.avl-switch-thumb`, `.avl-button-size-big`, `.avl-color-tonal`, `.avl-fill-outlined`. Use the props instead (`size`, `color`, `fillType`).
- Component variables: `--avl-button-height`, `--avl-nested-color-main`, `--avl-sticker-tilt`, ...
- The elements inside a component: wrappers, their order, which tag they are.
- Visual details. Spacing, motion and shades are tuned in normal releases.

## Example

```css
/* Your own class next to the root class, so it wins without !important */
.promo.avl-card {
    background: var(--avl-color-primary-container);
    border-radius: var(--avl-radius-large);
}

/* State from Base UI */
.avl-switch[data-disabled] {
    opacity: 0.3;
}
```

AnvilUI's rules are one or two classes. If yours loses, add the root class to it as above, or load your CSS after `anvilui/styles.css`.
