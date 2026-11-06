import { cx } from '../../utils'
import './table.css'

export type TableProps = React.ComponentProps<'table'>

/**
 * A styled HTML table. Each part renders its native element (`TableHead` is
 * `<thead>`, `TableHeaderCell` is `<th>`), so it has no sorting or paging.
 *
 * @example
 * <Table>
 *     <TableCaption>Invoices</TableCaption>
 *     <TableHead>
 *         <TableRow><TableHeaderCell>Number</TableHeaderCell><TableHeaderCell>Total</TableHeaderCell></TableRow>
 *     </TableHead>
 *     <TableBody>
 *         <TableRow><TableCell>#1001</TableCell><TableCell>$40</TableCell></TableRow>
 *     </TableBody>
 * </Table>
 */
export function Table({ className, ...props }: TableProps) {
    return <table {...props} className={cx('avl-table', className)} />
}

export type TableCaptionProps = React.ComponentProps<'caption'>

/** The table's accessible name. Without one, give `Table` an `aria-label`. */
export function TableCaption({ className, ...props }: TableCaptionProps) {
    return <caption {...props} className={cx('avl-table-caption', className)} />
}

export type TableHeadProps = React.ComponentProps<'thead'>

/** `<thead>`: the header rows. */
export function TableHead({ className, ...props }: TableHeadProps) {
    return <thead {...props} className={cx('avl-table-head', className)} />
}

export type TableBodyProps = React.ComponentProps<'tbody'>

/** `<tbody>`: the data rows. */
export function TableBody({ className, ...props }: TableBodyProps) {
    return <tbody {...props} className={cx('avl-table-body', className)} />
}

export type TableRowProps = React.ComponentProps<'tr'>

/** `<tr>`. */
export function TableRow({ className, ...props }: TableRowProps) {
    return <tr {...props} className={cx('avl-table-row', className)} />
}

export type TableHeaderCellProps = React.ComponentProps<'th'>

/** `<th>`, with `scope="col"` by default; pass `scope="row"` for a header at the start of a row. */
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

/** `<td>`. */
export function TableCell({ className, ...props }: TableCellProps) {
    return <td {...props} className={cx('avl-table-cell', className)} />
}
