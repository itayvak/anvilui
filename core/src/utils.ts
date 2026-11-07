import type { Ref, RefCallback } from 'react'

// Joins class names, skipping empty ones.
export function cx(...parts: (string | false | null | undefined)[]) {
    return parts.filter(Boolean).join(' ')
}

// Base UI's className is a string or a function of the state; keep both
// working and append the caller's after ours.
export function withClass<State>(
    base: string,
    className: string | ((state: State) => string | undefined) | undefined
) {
    return (state: State) =>
        cx(base, typeof className === 'function' ? className(state) : className)
}

// Field-like components put `className` and `style` on their wrapper and
// ARIA and data attributes on the control itself (the input, or the trigger
// button), never on a wrapper or a Base UI Root that renders no element
export function splitControlProps<P extends object>(props: P) {
    const control: Record<string, unknown> = {}
    const rest: Record<string, unknown> = {}
    for (const [key, value] of Object.entries(props)) {
        if (key.startsWith('aria-') || key.startsWith('data-'))
            control[key] = value
        else rest[key] = value
    }
    return { control, rest: rest as P }
}

export function mergeRefs<T>(...refs: (Ref<T> | undefined)[]): RefCallback<T> {
    return (value) => {
        for (const ref of refs) {
            if (typeof ref === 'function') ref(value)
            else if (ref) ref.current = value
        }
    }
}
