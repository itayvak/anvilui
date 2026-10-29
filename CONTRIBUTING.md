# Building components for AnvilUI

How to add a component to `core/` so it fits the rest of the library. Read [Button](core/src/components/Button/Button.tsx) and [IconButton](core/src/components/IconButton/IconButton.tsx) alongside this. They're short and follow every rule below.

## Repo layout

```
core/src/
  components/<Name>/<Name>.tsx    component + its props type
  components/<Name>/<name>.css    its styles (kebab-case file name)
  colors/                         color + fillType system
  tokens/  themes/                design tokens and color themes → CSS variables
  utils.ts                        cx, withClass, mergeRefs
  index.ts                        public exports
playground/src/
  playgrounds/<Name>Playground.tsx   interactive page for each component
```

The playground imports `anvilui` straight from `core/src`, so changes show up instantly. Run it with `npm run dev` in `playground/`.

## Checklist for a new component

1. Create `core/src/components/<Name>/<Name>.tsx` and `<name>.css`.
2. Export the component **and** its `<Name>Props` type from [index.ts](core/src/index.ts).
3. Add `<Name>Playground.tsx` and register it in [playgrounds/index.ts](playground/src/playgrounds/index.ts).
4. Check it in light **and** dark mode, by keyboard only, and with reduced motion on.
5. `npm run build` in `core/` passes, and `npm run format` from the repo root.

## Rules

### 1. Build on Base UI

If [Base UI](https://base-ui.com) has the component (button, checkbox, menu, dialog, tabs, ...), wrap it. Don't hand-roll keyboard handling, focus management or ARIA. Import from the subpath: `@base-ui/react/checkbox`, not `@base-ui/react`.

Only use plain HTML when there's no behavior to get right (`Card` without `clickable`, `ButtonGroup`, `Typography`). For a custom element that needs Base UI's `render` prop, use `useRender` + `mergeProps` ([NavigationBarItem](core/src/components/NavigationBar/NavigationBar.tsx) does this).

### 2. Props

- **Extend the underlying props** and add yours on top:
    ```ts
    export type SwitchProps = BaseSwitch.Root.Props
    export type ButtonProps = BaseButtonProps & ColorProps & { size?: ... }
    export type ButtonGroupProps = React.ComponentProps<'div'>
    ```
    Everything you don't handle gets passed through with `{...props}`.
- **Reuse the shared prop names.** Don't invent synonyms:

    | Prop                             | Type                           | Meaning                                            |
    | -------------------------------- | ------------------------------ | -------------------------------------------------- |
    | `color`                          | `ComponentColor`               | theme color role, default `'primary'`              |
    | `fillType`                       | `ComponentFillType`            | `filled` / `outlined` / `text`, default `'filled'` |
    | `size`                           | `'small' \| 'normal' \| 'big'` | default `'normal'`                                 |
    | `startIcon` / `endIcon` / `icon` | `MaterialSymbol`               | icon names, typed                                  |
    | `disabled`                       | `boolean`                      | from Base UI / native                              |

    For `color` + `fillType` use the shared `ColorProps` type from [colors.ts](core/src/colors/colors.ts).

- **State props come in the React trio:** `value` / `defaultValue` / `onValueChange` (or `open` / `defaultOpen` / `onOpenChange`). The component must work with none of them passed. Never take a `setX` setter as a prop. See `AnvilRoot`'s `colorMode` for the pattern.
- **Don't reuse native attribute names for something else** (e.g. `title` as a label). Use `label`.
- **Write a JSDoc comment on each prop you add.** It's what developers see on hover. Include the default: `/** How the color is applied. @default 'filled' */`.
- **Make required a11y props required in the type.** If there's no visible text, require `'aria-label': string` (like `IconButton`).

### 3. Always pass `className` and `ref` through

A consumer's `className` must be kept, never overwritten. Destructure it, combine it with yours, and pass it **after** `{...props}`:

```tsx
// Base UI part: className may be a function of state, so use withClass
<BaseSwitch.Root {...props} className={withClass('avl-switch', className)} />

// plain element: use cx
<div {...props} className={cx('avl-card-content', className)} />
```

`ref` comes through `{...props}` automatically (React 19). If you need your own ref too, merge them: `ref={mergeRefs(localRef, ref)}`.

The helpers live in [utils.ts](core/src/utils.ts). Don't concatenate class strings by hand.

### 4. Compound components

When a component has parts, export each part as its own component (`Card`, `CardTitle`, `CardContent`, `CardActions`; `Menu`, `MenuTrigger`, `MenuPopup`, `MenuItem`), each with its own `Props` type. Name them `<Component><Part>`. Share state between parts with a small React context in the same file, like `SubmenuContext` in [Menu.tsx](core/src/components/Menu/Menu.tsx).

### 5. Popups and portals

Anything that portals (menus, dialogs, tooltips, popovers) must render into the AnvilRoot, not `body`, or it loses the theme:

```tsx
const avl = useContext(AnvilContext)
<BaseX.Portal container={avl?.rootRef}>...</BaseX.Portal>
```

## Styling

### Class names

- Prefix everything with `avl-`. Root class: `avl-<component-kebab>` (`avl-radio-button-group`).
- Parts: `avl-<component>-<part>` (`avl-switch-thumb`, `avl-navigation-bar-item-indicator`).
- Variants: `avl-<component>-size-<size>`. Colors come from `colorClass(color, fillType)`.
- Use plain single classes. No IDs, no element selectors, no `!important` (the only exception is the reduced-motion override in `global.css`).

### Style state with attributes, not extra classes

Base UI sets `data-*` attributes for state. Style those, so the visuals always match what screen readers hear:

```css
.avl-checkbox[data-checked] { ... }
.avl-checkbox[data-disabled] { ... }
.avl-button:disabled { ... }            /* native buttons */
.avl-tabs-tab[data-active] { ... }
```

### Never hardcode values. Use the CSS variables

| Need            | Use                                                                                                                                                                                                        |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| spacing / sizes | `var(--avl-spacing-x1)` … `x20` (multiples of the spacing unit; for more, use `calc(var(--avl-spacing-x1) * n)`)                                                                                           |
| radius          | `var(--avl-radius-small \| medium \| large \| button \| full)`                                                                                                                                             |
| font size       | `var(--avl-font-size-body \| caption \| label \| label-small \| label-large \| h1…h6)`                                                                                                                     |
| font            | `var(--avl-font-main \| title \| mono)`                                                                                                                                                                    |
| motion          | `var(--avl-ease-length-short \| normal \| slow)` + `var(--avl-ease-out \| in \| smooth)`. `out` is springy (buttons, popups); `smooth` has no overshoot (anything sliding across or in from a screen edge) |
| border          | `var(--avl-outline-size) solid var(--avl-color-outline)`                                                                                                                                                   |
| theme colors    | `var(--avl-color-<role>)`, e.g. `--avl-color-surface-variant`, `--avl-color-on-primary`                                                                                                                    |

Small optical tweaks (1–3px offsets, a 10ms press transition) are fine as raw values. Anything a theme might want to change is not.

If you need a value that doesn't exist, add a token: add it to the type in [tokens/types.ts](core/src/tokens/types.ts), give it a value in [baseTokens.ts](core/src/tokens/baseTokens.ts), and it becomes `--avl-<category>-<key-in-kebab-case>` automatically.

### Colored components

If the component supports `color` / `fillType`, add `colorClass(color, fillType)` to its class and style it **only** with the nested variables. [colors.css](core/src/colors/colors.css) fills them in for every combination:

- `--avl-nested-color-main`: background (`transparent` for outlined/text)
- `--avl-nested-color-on-main`: content on that background
- `--avl-nested-color-text`: body text color

For the `outlined` border, add `.avl-<name>.avl-fill-outlined { border: var(--avl-outline-size) solid var(--avl-color-outline); }`.

Hover and press states mix the two colors rather than introducing new ones:

```css
.avl-x:hover:not(:disabled) {
    background-color: color-mix(
        in srgb,
        var(--avl-nested-color-main) 90%,
        var(--avl-nested-color-on-main) 10%
    );
}
```

### Shared visual conventions

- **Disabled:** reduced opacity plus `cursor: default`. No separate disabled colors.
- **Press feedback:** a slight `scale()` on `:active` (0.95–0.99), with `transition: 10ms`. Add the class to the reduced-motion list in [global.css](core/src/components/AnvilRoot/global.css).
- **Focus:** the global `:focus-visible` ring applies automatically. Don't remove `outline` without replacing it with something equally visible.
- **Small controls** (checkbox, radio) get an invisible `::after` hit area of at least 40px (`--avl-spacing-x10`).
- **Transitions** use the ease tokens, so reduced motion turns them off for free.

## Accessibility (required, not optional)

- Real elements: `<button>` for actions, `<a href>` for navigation (let consumers pass a router `Link` via `render`), headings only when they really are headings.
- Everything works by keyboard: Tab to reach, Enter/Space to activate, arrow keys inside groups, Escape to close popups. Base UI handles this when you use it.
- Every interactive element has an accessible name: visible text, `aria-label`, or a wrapping `<label>`.
- Decorative icons are hidden from screen readers (`Icon` does this unless you give it an `aria-label`).
- Don't hard-code heading levels. Give text components an `as` prop (see [Typography](core/src/components/Typography/Typography.tsx) and `CardTitle`).
- Text contrast comes from the theme's `on-*` pairs. Always put `on-x` text on an `x` background.

## Code style

- Prettier handles formatting (4 spaces, no semicolons, single quotes). Run `npm run format`.
- Named exports only, as function components: `export function Switch(...)`.
- No new runtime dependencies without a strong reason. React and Base UI are the base.
- Comments explain **why**, not what. A non-obvious workaround gets a one-line comment (see the `:has(~ input:active)` note in [checkbox.css](core/src/components/Checkbox/checkbox.css)).
- Keep it simple: no prop for a case nobody has asked for yet, and no wrapper or abstraction used only once.

## Playground

`<Name>Playground.tsx` shows every variant and state side by side, with controls (`SelectControl`, `RangeControl`, a disabled toggle) from [ui.tsx](playground/src/ui.tsx). This is where you check your work. It should cover:

- every `color` × `fillType` and every `size` the component supports
- disabled, plus controlled and uncontrolled state
- long text and icons, if the component takes them

## Breaking changes

Renaming or removing a prop, changing a default, or changing a CSS variable name all break consumers. Avoid them when you can. When you can't, note the change with a before/after snippet in the changelog.
