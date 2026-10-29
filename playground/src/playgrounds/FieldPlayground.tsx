import { useState } from 'react'
import {
    Button,
    Field,
    FieldDescription,
    FieldError,
    Input,
    Select,
    SelectItem,
    Switch,
    Textarea,
    Typography,
} from 'anvilui'
import { Row, Section } from '../ui'

const plans = { free: 'Free', pro: 'Pro', team: 'Team' }

export function FieldPlayground() {
    const [disabled, setDisabled] = useState(false)
    const [submitted, setSubmitted] = useState('')

    return (
        <>
            <Section title="Helper text and errors">
                <Row>
                    <label className="pg-checkbox">
                        <Switch
                            checked={disabled}
                            onCheckedChange={setDisabled}
                        />
                        <Typography type="caption">disabled</Typography>
                    </label>
                </Row>
                <Row>
                    <Field disabled={disabled}>
                        <Input label="Username" />
                        <FieldDescription>
                            Letters and numbers only. You can change it later.
                        </FieldDescription>
                    </Field>

                    {/* Browser validation: the message comes from the browser.
                        Checked on blur; without validationMode, Field waits for
                        a form submit, and this one isn't in a form. */}
                    <Field disabled={disabled} validationMode="onBlur">
                        <Input label="Email" type="email" required />
                        <FieldDescription>
                            Required. Leave it and click away to see the error.
                        </FieldDescription>
                        <FieldError />
                    </Field>

                    {/* Custom rule, checked as you type */}
                    <Field
                        disabled={disabled}
                        validationMode="onChange"
                        validate={(value) =>
                            String(value ?? '').length < 8
                                ? 'At least 8 characters'
                                : null
                        }
                    >
                        <Input label="Password" type="password" />
                        <FieldDescription>
                            8 characters or more
                        </FieldDescription>
                        <FieldError />
                    </Field>

                    {/* Forced from outside, e.g. a server response */}
                    <Field disabled={disabled} invalid>
                        <Input label="Coupon" defaultValue="SAVE50" />
                        <FieldError match>This code has expired</FieldError>
                    </Field>
                </Row>
            </Section>
            <Section title="Other controls">
                <Row>
                    <Field disabled={disabled}>
                        <Textarea label="Bio" />
                        <FieldDescription>
                            Shown on your profile
                        </FieldDescription>
                    </Field>
                    <Field disabled={disabled} invalid>
                        <Select label="Plan" items={plans}>
                            {Object.entries(plans).map(([value, label]) => (
                                <SelectItem key={value} value={value}>
                                    {label}
                                </SelectItem>
                            ))}
                        </Select>
                        <FieldError match>Pick a plan to continue</FieldError>
                    </Field>
                    <Field disabled={disabled}>
                        <Input size="small" label="Small" />
                        <FieldDescription>
                            Helper text follows the padding
                        </FieldDescription>
                    </Field>
                </Row>
            </Section>
            <Section title="In a form">
                <form
                    onSubmit={(e) => {
                        e.preventDefault()
                        const data = new FormData(e.currentTarget)
                        setSubmitted(JSON.stringify(Object.fromEntries(data)))
                    }}
                >
                    <Row>
                        <Field name="name">
                            <Input label="Name" required />
                            <FieldError match="valueMissing">
                                Enter your name
                            </FieldError>
                        </Field>
                        <Button type="submit">Submit</Button>
                    </Row>
                </form>
                <Typography>submitted: {submitted}</Typography>
            </Section>
        </>
    )
}
