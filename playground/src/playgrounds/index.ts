import type { ComponentType } from 'react'
import { AppBarPlayground } from './AppBarPlayground'
import { AvatarPlayground } from './AvatarPlayground'
import { BadgePlayground } from './BadgePlayground'
import { BottomSheetPlayground } from './BottomSheetPlayground'
import { ButtonPlayground } from './ButtonPlayground'
import { ButtonGroupPlayground } from './ButtonGroupPlayground'
import { CardPlayground } from './CardPlayground'
import { ChipPlayground } from './ChipPlayground'
import { CheckboxPlayground } from './CheckboxPlayground'
import { DialogPlayground } from './DialogPlayground'
import { DividerPlayground } from './DividerPlayground'
import { FABPlayground } from './FABPlayground'
import { FieldPlayground } from './FieldPlayground'
import { IconPlayground } from './IconPlayground'
import { IconButtonPlayground } from './IconButtonPlayground'
import { InputPlayground } from './InputPlayground'
import { ListPlayground } from './ListPlayground'
import { MenuPlayground } from './MenuPlayground'
import { PopoverPlayground } from './PopoverPlayground'
import { ProgressPlayground } from './ProgressPlayground'
import { RadioButtonGroupPlayground } from './RadioButtonGroupPlayground'
import { RadioGroupPlayground } from './RadioGroupPlayground'
import { SelectPlayground } from './SelectPlayground'
import { SliderPlayground } from './SliderPlayground'
import { SnackbarPlayground } from './SnackbarPlayground'
import { SwitchPlayground } from './SwitchPlayground'
import { TabsPlayground } from './TabsPlayground'
import { TextareaPlayground } from './TextareaPlayground'
import { ToolbarPlayground } from './ToolbarPlayground'
import { TooltipPlayground } from './TooltipPlayground'
import { TypographyPlayground } from './TypographyPlayground'
import { NavigationBarPlayground } from './NavigationBarPlayground'
import { NavigationDrawerPlayground } from './NavigationDrawerPlayground'
import { NavigationRailPlayground } from './NavigationRailPlayground'

// One entry per AnvilUI component. The key is what shows up in the select.
export const playgrounds: Record<string, ComponentType> = {
    AppBar: AppBarPlayground,
    Avatar: AvatarPlayground,
    Badge: BadgePlayground,
    BottomSheet: BottomSheetPlayground,
    Button: ButtonPlayground,
    ButtonGroup: ButtonGroupPlayground,
    Card: CardPlayground,
    Checkbox: CheckboxPlayground,
    Chip: ChipPlayground,
    Dialog: DialogPlayground,
    Divider: DividerPlayground,
    FAB: FABPlayground,
    Field: FieldPlayground,
    Icon: IconPlayground,
    IconButton: IconButtonPlayground,
    Input: InputPlayground,
    List: ListPlayground,
    Menu: MenuPlayground,
    Popover: PopoverPlayground,
    Progress: ProgressPlayground,
    RadioButtonGroup: RadioButtonGroupPlayground,
    RadioGroup: RadioGroupPlayground,
    Select: SelectPlayground,
    Slider: SliderPlayground,
    Snackbar: SnackbarPlayground,
    Switch: SwitchPlayground,
    Tabs: TabsPlayground,
    Textarea: TextareaPlayground,
    Toolbar: ToolbarPlayground,
    Tooltip: TooltipPlayground,
    Typography: TypographyPlayground,
    NavigationBar: NavigationBarPlayground,
    NavigationDrawer: NavigationDrawerPlayground,
    NavigationRail: NavigationRailPlayground,
}
