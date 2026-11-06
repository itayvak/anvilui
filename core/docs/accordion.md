# Accordion

Expandable sections.

```ts
import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionPanel,
} from 'anvilui'
```

| Part | Renders | Props |
| --- | --- | --- |
| `Accordion` | `<div>` | `value` / `defaultValue` (**always an array** of open item values), `onValueChange(value[], details)`, `multiple` (default `false`) |
| `AccordionItem` | `<div>` | `value` (any; auto-generated if omitted), `disabled` |
| `AccordionTrigger` | `<button>` inside a heading | `as`: `'h2' … 'h6'`, default `'h3'` |
| `AccordionPanel` | `<div>` | `keepMounted` |

Without `defaultValue`, every item starts closed. There is no `type="single" \| "multiple"` or `collapsible`: use `multiple`. Items can always be closed.

```tsx
import {
    Accordion,
    AccordionItem,
    AccordionPanel,
    AccordionTrigger,
} from 'anvilui'

export function Faq() {
    return (
        <Accordion defaultValue={['shipping']}>
            <AccordionItem value="shipping">
                <AccordionTrigger>
                    How long does shipping take?
                </AccordionTrigger>
                <AccordionPanel>2–4 business days.</AccordionPanel>
            </AccordionItem>
            <AccordionItem value="returns">
                <AccordionTrigger>Can I return an item?</AccordionTrigger>
                <AccordionPanel>Yes, within 30 days.</AccordionPanel>
            </AccordionItem>
        </Accordion>
    )
}
```
