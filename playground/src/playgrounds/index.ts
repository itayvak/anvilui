import type { ComponentType } from 'react'
import { ButtonPlayground } from './ButtonPlayground'
import { ButtonGroupPlayground } from './ButtonGroupPlayground'
import { CardPlayground } from './CardPlayground'
import { CheckboxPlayground } from './CheckboxPlayground'
import { IconPlayground } from './IconPlayground'
import { IconButtonPlayground } from './IconButtonPlayground'
import { MenuPlayground } from './MenuPlayground'
import { RadioButtonGroupPlayground } from './RadioButtonGroupPlayground'
import { RadioGroupPlayground } from './RadioGroupPlayground'
import { SwitchPlayground } from './SwitchPlayground'
import { TypographyPlayground } from './TypographyPlayground'
import { NavigationRailPlayground } from './NavigationRailPlayground'

// One entry per AnvilUI component. The key is what shows up in the select.
export const playgrounds: Record<string, ComponentType> = {
    Button: ButtonPlayground,
    ButtonGroup: ButtonGroupPlayground,
    Card: CardPlayground,
    Checkbox: CheckboxPlayground,
    Icon: IconPlayground,
    IconButton: IconButtonPlayground,
    Menu: MenuPlayground,
    RadioButtonGroup: RadioButtonGroupPlayground,
    RadioGroup: RadioGroupPlayground,
    Switch: SwitchPlayground,
    Typography: TypographyPlayground,
    NavigationRail: NavigationRailPlayground,
}
