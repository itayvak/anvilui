import './button-group.css'

export type ButtonGroupProps = React.ComponentProps<'div'>

export function ButtonGroup(props: ButtonGroupProps) {
    return <div role="group" {...props} className="avl-button-group" />
}
