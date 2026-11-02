import { useContext } from 'react'
import { PreviewCard as BasePreviewCard } from '@base-ui/react/preview-card'
import { AnvilContext } from '../AnvilRoot/AnvilContext'
import { withClass } from '../../utils'
import '../Menu/menu.css'
import '../Popover/popover.css'
import './preview-card.css'

/**
 * A card that appears while hovering or focusing a link, showing a preview of
 * where it goes. Put a `PreviewCardTrigger` and a `PreviewCardPopup` inside.
 * Hover-only, so the popup must not hold anything a user needs to reach;
 * use `Popover` for that.
 */
export type PreviewCardProps = BasePreviewCard.Root.Props

export function PreviewCard(props: PreviewCardProps) {
    return <BasePreviewCard.Root {...props} />
}

// Renders an <a>, so give it `href`. Pass `render={<Link />}` for a router link.
// `delay` / `closeDelay` set how long hovering takes to open and close it.
export type PreviewCardTriggerProps = BasePreviewCard.Trigger.Props

export function PreviewCardTrigger({
    className,
    ...props
}: PreviewCardTriggerProps) {
    return (
        <BasePreviewCard.Trigger
            {...props}
            className={withClass('avl-preview-card-trigger', className)}
        />
    )
}

// Also renders the portal and positioner, so it takes their placement props.
export type PreviewCardPopupProps = BasePreviewCard.Popup.Props &
    Pick<
        BasePreviewCard.Positioner.Props,
        'side' | 'align' | 'sideOffset' | 'alignOffset'
    >

export function PreviewCardPopup({
    side,
    align,
    sideOffset,
    alignOffset,
    className,
    ...props
}: PreviewCardPopupProps) {
    const avl = useContext(AnvilContext)

    return (
        // Into the AnvilRoot, not body, so the popup sees the theme variables
        <BasePreviewCard.Portal container={avl?.rootRef}>
            <BasePreviewCard.Positioner
                className="avl-menu-positioner"
                side={side}
                align={align}
                sideOffset={sideOffset ?? 8}
                alignOffset={alignOffset}
            >
                {/* Popover's surface, padding and open/close animation */}
                <BasePreviewCard.Popup
                    {...props}
                    className={withClass(
                        'avl-menu-popup avl-popover-popup',
                        className
                    )}
                />
            </BasePreviewCard.Positioner>
        </BasePreviewCard.Portal>
    )
}
