import { Field } from '@base-ui/react/field'
import { Input as BaseInput } from '@base-ui/react/input'
import type { ReactNode } from 'react'
import './input.css'

export type InputProps = Omit<BaseInput.Props, 'className'> & {
    label?: ReactNode
    // Goes on the wrapper, not the <input>, so sizing the component works.
    className?: Field.Root.Props['className']
}

export function Input({ label, className, ...props }: InputProps) {
    return (
        <Field.Root
            className={(state) =>
                'avl-input-root ' +
                ((typeof className === 'function'
                    ? className(state)
                    : className) ?? '')
            }
        >
            <BaseInput {...props} className="avl-input" />
            {label && (
                <Field.Label className="avl-input-label">{label}</Field.Label>
            )}
        </Field.Root>
    )
}
