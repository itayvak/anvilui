import { useState } from 'react'
import {
    Accordion,
    AccordionItem,
    AccordionPanel,
    AccordionTrigger,
    Typography,
} from 'anvilui'
import { Section } from '../ui'

const faqs = [
    {
        q: 'What is AnvilUI?',
        a: 'A React component library based on Material You, built on Base UI.',
    },
    {
        q: 'Does it support dark mode?',
        a: 'Yes. Every component reads its colors from the theme, so switching the color mode on AnvilRoot updates everything.',
    },
    {
        q: 'A question with a very long title that has to wrap onto a second line when the accordion is narrow',
        a: 'Long titles wrap, and the chevron stays at the end of the first line block.',
    },
    { q: 'Can I use it with a router?', a: 'Yes, links take a `render` prop.' },
]

const items = (disabledIndex?: number) =>
    faqs.map((faq, i) => (
        <AccordionItem key={faq.q} value={faq.q} disabled={i === disabledIndex}>
            <AccordionTrigger>
                {faq.q}
                {i === disabledIndex && ' (disabled)'}
            </AccordionTrigger>
            <AccordionPanel>{faq.a}</AccordionPanel>
        </AccordionItem>
    ))

const accordionWidth = { maxWidth: 560 }

export function AccordionPlayground() {
    const [open, setOpen] = useState<unknown[]>([faqs[0].q])

    return (
        <>
            <Section title="Uncontrolled, one at a time">
                <Accordion style={accordionWidth}>{items()}</Accordion>
            </Section>
            <Section title="Multiple open">
                <Accordion
                    style={accordionWidth}
                    multiple
                    defaultValue={[faqs[1].q]}
                >
                    {items()}
                </Accordion>
            </Section>
            <Section title="Controlled, one disabled">
                <Typography type="caption">
                    Open: {open.length ? open.join(', ') : 'none'}
                </Typography>
                <Accordion
                    style={accordionWidth}
                    value={open}
                    onValueChange={setOpen}
                >
                    {items(3)}
                </Accordion>
            </Section>
        </>
    )
}
