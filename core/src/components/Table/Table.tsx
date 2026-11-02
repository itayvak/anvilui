import { cx } from '../../utils'
import './table.css'

export type TableProps = React.ComponentProps<'table'>

export function Table({ className, ...props }: TableProps) {
    return <table {...props} className={cx('avl-table', className)} />
}

export type TableCaptionProps = React.ComponentProps<'caption'>

/** The table's accessible name. Without one, give `Table` an `aria-label`. */
export function TableCaption({ className, ...props }: TableCaptionProps) {
    return <caption {...props} className={cx('avl-table-caption', className)} />
}

export type TableHeadProps = React.ComponentProps<'thead'>

export function TableHead({ className, ...props }: TableHeadProps) {
    return <thead {...props} className={cx('avl-table-head', className)} />
}

export type TableBodyProps = React.ComponentProps<'tbody'>

export function TableBody({ className, ...props }: TableBodyProps) {
    return <tbody {...props} className={cx('avl-table-body', className)} />
}

export type TableRowProps = React.ComponentProps<'tr'>

export function TableRow({ className, ...props }: TableRowProps) {
    return <tr {...props} className={cx('avl-table-row', className)} />
}

export type TableHeaderCellProps = React.ComponentProps<'th'>

// scope="col" by default; pass scope="row" for a header at the start of a row.
export function TableHeaderCell({
    scope = 'col',
    className,
    ...props
}: TableHeaderCellProps) {
    return (
        <th
            {...props}
            scope={scope}
            className={cx('avl-table-header-cell', className)}
        />
    )
}

export type TableCellProps = React.ComponentProps<'td'>

export function TableCell({ className, ...props }: TableCellProps) {
    return <td {...props} className={cx('avl-table-cell', className)} />
}
