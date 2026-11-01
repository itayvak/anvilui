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

export function mergeRefs<T>(...refs: (Ref<T> | undefined)[]): RefCallback<T> {
    return (value) => {
        for (const ref of refs) {
            if (typeof ref === 'function') ref(value)
            else if (ref) ref.current = value
        }
    }
}
