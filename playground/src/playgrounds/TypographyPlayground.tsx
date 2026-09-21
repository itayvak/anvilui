import { Typography } from 'anvilui'
import { typographyTypes } from '../options'
import { Section } from '../ui'

export function TypographyPlayground() {
    return (
        <Section title="Types">
            <table className="pg-matrix">
                <tbody>
                    {typographyTypes.map((type) => (
                        <tr key={type}>
                            <th scope="row">
                                <Typography type="caption">{type}</Typography>
                            </th>
                            <td>
                                <Typography type={type}>
                                    The quick brown fox
                                </Typography>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Section>
    )
}
