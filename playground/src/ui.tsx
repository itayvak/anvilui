import type { CSSProperties, ReactNode } from 'react'
import { Input, Select, SelectItem, Slider, Typography } from 'anvilui'
import type { TypographyType } from 'anvilui'

// The only raw HTML in the playground lives here: AnvilUI has no layout or
// label primitives, so pages compose these instead of plain elements.

export function Section(props: { title: string; children: ReactNode }) {
    return (
        <section className="pg-section">
            <Typography type="h6">{props.title}</Typography>
            {props.children}
        </section>
    )
}

export function Row(props: { children: ReactNode; style?: CSSProperties }) {
    return (
        <div className="pg-row" style={props.style}>
            {props.children}
        </div>
    )
}

export function Stack(props: { children: ReactNode; style?: CSSProperties }) {
    return (
        <div className="pg-stack" style={props.style}>
            {props.children}
        </div>
    )
}

export function Grid(props: { children: ReactNode }) {
    return <div className="pg-grid">{props.children}</div>
}

/** A control (Checkbox, Switch, Radio) with clickable text next to it. */
export function Labeled(props: {
    label: ReactNode
    children: ReactNode
    type?: TypographyType
}) {
    return (
        <label className="pg-labeled">
            {props.children}
            <Typography type={props.type ?? 'caption'}>
                {props.label}
            </Typography>
        </label>
    )
}

export function SelectControl<T extends string>(props: {
    label: string
    value: T
    options: readonly T[]
    onChange: (value: T) => void
}) {
    return (
        <Select
            label={props.label}
            value={props.value}
            onValueChange={(value) => value != null && props.onChange(value)}
            className="pg-select"
        >
            {props.options.map((option) => (
                <SelectItem key={option} value={option}>
                    {option}
                </SelectItem>
            ))}
        </Select>
    )
}

export function RangeControl(props: {
    label: string
    value: number
    min: number
    max: number
    onChange: (value: number) => void
}) {
    return (
        <Slider
            label={`${props.label}: ${props.value}`}
            min={props.min}
            max={props.max}
            value={props.value}
            onValueChange={props.onChange}
            className="pg-range"
        />
    )
}

export function TextControl(props: {
    label: string
    value: string
    onChange: (value: string) => void
}) {
    return (
        <Input
            label={props.label}
            value={props.value}
            onValueChange={props.onChange}
            className="pg-select"
        />
    )
}
