import { Accordion as BaseAccordion } from '@base-ui/react/accordion'
import { Icon } from '../Icon/Icon'
import { withClass } from '../../utils'
import './accordion.css'

/**
 * A stack of sections that each expand to show their content. Fill it with
 * `AccordionItem`s. Holds which are open (`value` / `defaultValue` /
 * `onValueChange`); pass `multiple` to allow more than one at a time.
 */
export type AccordionProps = BaseAccordion.Root.Props

/**
 * A stack of expandable sections. `value` is an array of open item values
 * (even when only one can be open). Pass `multiple` to allow several.
 *
 * @example
 * <Accordion defaultValue={['shipping']}>
 *     <AccordionItem value="shipping">
 *         <AccordionTrigger>Shipping</AccordionTrigger>
 *         <AccordionPanel>Ships in 2 days.</AccordionPanel>
 *     </AccordionItem>
 * </Accordion>
 */
export function Accordion({ className, ...props }: AccordionProps) {
    return (
        <BaseAccordion.Root
            {...props}
            className={withClass('avl-accordion', className)}
        />
    )
}

export type AccordionItemProps = BaseAccordion.Item.Props

/**
 * One section: an `AccordionTrigger`, then an `AccordionPanel`. Give it a
 * `value` to control it from the Accordion.
 */
export function AccordionItem({ className, ...props }: AccordionItemProps) {
    return (
        <BaseAccordion.Item
            {...props}
            className={withClass('avl-accordion-item', className)}
        />
    )
}

export type AccordionTriggerProps = BaseAccordion.Trigger.Props & {
    /** The heading level that wraps the button, to fit the page's outline. @default 'h3' */
    as?: 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

/** The section's title row. Renders a button inside an `<h3>` (change with `as`). */
export function AccordionTrigger({
    as: Heading = 'h3',
    className,
    children,
    ...props
}: AccordionTriggerProps) {
    return (
        <BaseAccordion.Header
            className="avl-accordion-header"
            render={<Heading />}
        >
            <BaseAccordion.Trigger
                {...props}
                className={withClass('avl-accordion-trigger', className)}
            >
                <span className="avl-accordion-trigger-label">{children}</span>
                <Icon name="keyboard_arrow_down" />
            </BaseAccordion.Trigger>
        </BaseAccordion.Header>
    )
}

export type AccordionPanelProps = BaseAccordion.Panel.Props

/** The section's content, shown while it's open. */
export function AccordionPanel({
    className,
    children,
    ...props
}: AccordionPanelProps) {
    return (
        <BaseAccordion.Panel
            {...props}
            className={withClass('avl-accordion-panel', className)}
        >
            {/* Padding lives inside, so the panel can shrink to 0 height */}
            <div className="avl-accordion-panel-content">{children}</div>
        </BaseAccordion.Panel>
    )
}
