import type { CSSProperties, ReactNode } from 'react'
import { Typography } from 'anvilui'

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

export function Grid(props: { children: ReactNode }) {
    return <div className="pg-grid">{props.children}</div>
}

export function SelectControl<T extends string>(props: {
    label: string
    value: T
    options: readonly T[]
    onChange: (value: T) => void
}) {
    return (
        <label className="pg-control">
            <Typography type="caption">{props.label}</Typography>
            <select
                value={props.value}
                onChange={(e) => props.onChange(e.target.value as T)}
            >
                {props.options.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </label>
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
        <label className="pg-control">
            <Typography type="caption">
                {props.label}: {props.value}
            </Typography>
            <input
                type="range"
                min={props.min}
                max={props.max}
                value={props.value}
                onChange={(e) => props.onChange(Number(e.target.value))}
            />
        </label>
    )
}

export function TextControl(props: {
    label: string
    value: string
    onChange: (value: string) => void
}) {
    return (
        <label className="pg-control">
            <Typography type="caption">{props.label}</Typography>
            <input
                type="text"
                value={props.value}
                onChange={(e) => props.onChange(e.target.value)}
            />
        </label>
    )
}
