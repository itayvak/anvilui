# Table

A styled HTML table, `width: 100%` by default. Each part is its native element. No sorting, paging or selection built in. The caption can hold any content, including dynamic text ("3 of 6 users"). There's no visually-hidden helper class: for an actions column, use `<TableHeaderCell><span style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0 0 0 0)' }}>Actions</span></TableHeaderCell>`.

```ts
import {
    Table,
    TableCaption,
    TableHead,
    TableBody,
    TableRow,
    TableHeaderCell,
    TableCell,
} from 'anvilui'
```

| Part | Element | Notes |
| --- | --- | --- |
| `Table` | `<table>` | Needs a `TableCaption` or `aria-label`. |
| `TableCaption` | `<caption>` | |
| `TableHead` | `<thead>` | (not `TableHeader`) |
| `TableBody` | `<tbody>` | |
| `TableRow` | `<tr>` | |
| `TableHeaderCell` | `<th scope="col">` | (not `TableHead`); `scope="row"` for row headers |
| `TableCell` | `<td>` | |

```tsx
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeaderCell,
    TableRow,
} from 'anvilui'

const invoices = [
    { id: 'INV-1', customer: 'Acme', total: '$1,200' },
    { id: 'INV-2', customer: 'Globex', total: '$860' },
]

export function Example() {
    return (
        <Table>
            <TableCaption>Recent invoices</TableCaption>
            <TableHead>
                <TableRow>
                    <TableHeaderCell>Invoice</TableHeaderCell>
                    <TableHeaderCell>Customer</TableHeaderCell>
                    <TableHeaderCell>Total</TableHeaderCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {invoices.map((inv) => (
                    <TableRow key={inv.id}>
                        <TableCell>{inv.id}</TableCell>
                        <TableCell>{inv.customer}</TableCell>
                        <TableCell>{inv.total}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
```
