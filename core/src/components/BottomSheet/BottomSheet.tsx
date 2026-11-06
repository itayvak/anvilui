import { useContext } from 'react'
import { Drawer } from '@base-ui/react/drawer'
import { AnvilContext } from '../AnvilRoot/AnvilContext'
import { withClass } from '../../utils'
import { checkAsChild, checkRoot } from '../../dev'
import './bottom-sheet.css'

/**
 * A panel that slides up from the bottom; swipe it down or tap outside to
 * close. Holds the open state (`open` / `defaultOpen` / `onOpenChange`).
 * Pass `snapPoints` (e.g. `[0.5, 1]`) for a sheet that can stop part way.
 */
export type BottomSheetProps = Omit<Drawer.Root.Props, 'swipeDirection'>

/**
 * A panel that slides up from the bottom. Parts: `BottomSheetTrigger`,
 * `BottomSheetPopup` (includes portal, backdrop and drag handle),
 * `BottomSheetTitle`, `BottomSheetDescription`, `BottomSheetClose`.
 *
 * @example
 * <BottomSheet>
 *     <BottomSheetTrigger render={<Button />}>Share</BottomSheetTrigger>
 *     <BottomSheetPopup>
 *         <BottomSheetTitle>Share</BottomSheetTitle>
 *         <List>...</List>
 *     </BottomSheetPopup>
 * </BottomSheet>
 */
export function BottomSheet(props: BottomSheetProps) {
    return <Drawer.Root {...props} swipeDirection="down" />
}

export type BottomSheetTriggerProps = Drawer.Trigger.Props

/** Opens the sheet. Renders a bare `<button>`; pass `render={<Button />}` to use the library's. */
export function BottomSheetTrigger({
    className,
    ...props
}: BottomSheetTriggerProps) {
    if (process.env.NODE_ENV !== 'production') {
        checkAsChild(props, 'BottomSheetTrigger', 'bottom-sheet.md')
    }
    return (
        <Drawer.Trigger
            {...props}
            className={withClass('avl-bottom-sheet-trigger', className)}
        />
    )
}

export type BottomSheetPopupProps = Drawer.Popup.Props

/**
 * The sheet. Also renders the portal, the dimmed backdrop and the drag
 * handle. Its children scroll when the sheet is taller than the screen allows.
 */
export function BottomSheetPopup({
    className,
    children,
    ...props
}: BottomSheetPopupProps) {
    const avl = useContext(AnvilContext)
    if (process.env.NODE_ENV !== 'production') {
        checkRoot(avl !== null, 'BottomSheetPopup')
    }

    return (
        // Into the AnvilRoot, not body, so the sheet sees the theme variables
        <Drawer.Portal container={avl?.rootRef}>
            <Drawer.Backdrop className="avl-bottom-sheet-backdrop" />
            <Drawer.Viewport className="avl-bottom-sheet-viewport">
                <Drawer.Popup
                    {...props}
                    className={withClass('avl-bottom-sheet-popup', className)}
                >
                    <div className="avl-bottom-sheet-handle" aria-hidden />
                    {/* Lets mouse users select text here without starting a swipe */}
                    <Drawer.Content className="avl-bottom-sheet-content">
                        {children}
                    </Drawer.Content>
                </Drawer.Popup>
            </Drawer.Viewport>
        </Drawer.Portal>
    )
}

export type BottomSheetTitleProps = Drawer.Title.Props

/** Names the sheet for screen readers. Renders an `<h2>`. */
export function BottomSheetTitle({
    className,
    ...props
}: BottomSheetTitleProps) {
    return (
        <Drawer.Title
            {...props}
            className={withClass('avl-bottom-sheet-title', className)}
        />
    )
}

export type BottomSheetDescriptionProps = Drawer.Description.Props

/** Supporting text under the title. */
export function BottomSheetDescription({
    className,
    ...props
}: BottomSheetDescriptionProps) {
    return (
        <Drawer.Description
            {...props}
            className={withClass('avl-bottom-sheet-description', className)}
        />
    )
}

export type BottomSheetCloseProps = Drawer.Close.Props

/** Closes the sheet. Renders a bare `<button>`; pass `render={<Button />}` to use the library's. */
export function BottomSheetClose({
    className,
    ...props
}: BottomSheetCloseProps) {
    if (process.env.NODE_ENV !== 'production') {
        checkAsChild(props, 'BottomSheetClose', 'bottom-sheet.md')
    }
    return (
        <Drawer.Close
            {...props}
            className={withClass('avl-bottom-sheet-close', className)}
        />
    )
}
