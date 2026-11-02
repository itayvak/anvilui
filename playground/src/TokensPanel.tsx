import { useState } from 'react'
import { Button, IconButton, Typography, baseDesignTokens } from 'anvilui'
import type { DesignTokens } from 'anvilui'

type Range = { min: number; max: number; step: number }

// Slider limits per category. The number box next to each slider takes any
// value, so a pill radius of 1000px is still possible.
const ranges: Record<string, Range> = {
    spacing: { min: 1, max: 10, step: 1 },
    fontSize: { min: 8, max: 80, step: 1 },
    radius: { min: 0, max: 48, step: 1 },
    outlineSize: { min: 0, max: 6, step: 0.5 },
    easeLength: { min: 0, max: 1000, step: 10 },
}
const fallbackRange: Range = { min: 0, max: 100, step: 1 }

const words = (key: string) =>
    key.replace(/([a-z0-9])([A-Z])/g, '$1 $2').toLowerCase()
const title = (key: string) => {
    const text = words(key)
    return text.charAt(0).toUpperCase() + text.slice(1)
}

function NumberField(props: {
    label: string
    value: number
    unit: string
    range: Range
    changed: boolean
    onChange: (value: number) => void
}) {
    const { label, value, unit, range, changed, onChange } = props
    return (
        <label className="pg-token" data-changed={changed || undefined}>
            <Typography type="caption">{label}</Typography>
            <div className="pg-token-number">
                <input
                    type="range"
                    min={range.min}
                    max={Math.max(range.max, value)}
                    step={range.step}
                    value={value}
                    onChange={(e) => onChange(Number(e.target.value))}
                />
                <input
                    type="number"
                    min={0}
                    step={range.step}
                    value={value}
                    aria-label={`${label} (${unit})`}
                    onChange={(e) => onChange(Number(e.target.value))}
                />
                <Typography type="caption">{unit}</Typography>
            </div>
        </label>
    )
}

// One control for any token value: px and ms values get a slider, anything
// else (fonts, easing curves) a text box.
function TokenField(props: {
    category: string
    name: string
    value: string | number
    base: string | number
    onChange: (value: string | number) => void
}) {
    const { category, name, value, base, onChange } = props
    const range = ranges[category] ?? fallbackRange
    const changed = value !== base

    if (typeof value === 'number') {
        return (
            <NumberField
                label={name}
                value={value}
                unit="px"
                range={range}
                changed={changed}
                onChange={onChange}
            />
        )
    }

    const match = value.match(/^(-?[\d.]+)(px|ms)$/)
    if (match) {
        return (
            <NumberField
                label={name}
                value={Number(match[1])}
                unit={match[2]}
                range={range}
                changed={changed}
                onChange={(n) => onChange(`${n}${match[2]}`)}
            />
        )
    }

    return (
        <label className="pg-token" data-changed={changed || undefined}>
            <Typography type="caption">{name}</Typography>
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </label>
    )
}

export function TokensPanel(props: {
    tokens: DesignTokens
    onTokensChange: (tokens: DesignTokens) => void
    onClose: () => void
}) {
    const { tokens, onTokensChange, onClose } = props
    const [copied, setCopied] = useState(false)
    const base = baseDesignTokens as Record<string, unknown>

    const set = (category: string, key: string | null, value: unknown) => {
        const current = (tokens as Record<string, unknown>)[category]
        onTokensChange({
            ...tokens,
            [category]:
                key === null ? value : { ...(current as object), [key]: value },
        } as DesignTokens)
    }

    const copy = async () => {
        await navigator.clipboard.writeText(JSON.stringify(tokens, null, 4))
        setCopied(true)
        setTimeout(() => setCopied(false), 1500)
    }

    return (
        <aside className="pg-tokens-panel" aria-label="Design tokens">
            <div className="pg-tokens-header">
                <Typography type="h6">Tokens</Typography>
                <IconButton
                    icon="close"
                    aria-label="Close tokens panel"
                    fillType="text"
                    onClick={onClose}
                />
            </div>
            <div className="pg-tokens-actions">
                <Button
                    fillType="outlined"
                    startIcon="restart_alt"
                    onClick={() => onTokensChange(baseDesignTokens)}
                >
                    Reset
                </Button>
                <Button
                    fillType="outlined"
                    startIcon={copied ? 'check' : 'content_copy'}
                    onClick={copy}
                >
                    {copied ? 'Copied' : 'Copy JSON'}
                </Button>
            </div>

            {Object.entries(tokens).map(([category, value]) => (
                <fieldset key={category} className="pg-tokens-group">
                    <legend>
                        <Typography as="span">{title(category)}</Typography>
                    </legend>
                    {typeof value === 'object' ? (
                        Object.entries(value).map(([key, v]) => (
                            <TokenField
                                key={key}
                                category={category}
                                name={words(key)}
                                value={v as string}
                                base={
                                    (base[category] as Record<string, string>)[
                                        key
                                    ]
                                }
                                onChange={(next) => set(category, key, next)}
                            />
                        ))
                    ) : (
                        <TokenField
                            category={category}
                            name={category === 'spacing' ? 'unit' : 'value'}
                            value={value}
                            base={base[category] as string | number}
                            onChange={(next) => set(category, null, next)}
                        />
                    )}
                </fieldset>
            ))}
        </aside>
    )
}
