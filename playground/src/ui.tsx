import type { ReactNode } from 'react'
import { Typography } from 'anvilui'

export function Section(props: { title: string; children: ReactNode }) {
    return (
        <section className="pg-section">
            <Typography type="h6">{props.title}</Typography>
            {props.children}
        </section>
    )
}

export function Row(props: { children: ReactNode }) {
    return <div className="pg-row">{props.children}</div>
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
