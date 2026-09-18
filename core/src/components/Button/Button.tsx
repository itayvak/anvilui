import {
    Button as BaseButton,
    ButtonProps as BaseButtonProps,
} from '@base-ui/react/button'
import './button.css'

export type ButtonProps = BaseButtonProps & {
    size?: 'small' | 'normal' | 'big'
    color?:
        'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'container'
}

export function Button(props: ButtonProps) {
    const className =
        'avl-button ' +
        `avl-button-color-${props.color || 'primary'} ` +
        `avl-button-size-${props.size || 'normal'} `

    return <BaseButton {...props} className={className} />
}
