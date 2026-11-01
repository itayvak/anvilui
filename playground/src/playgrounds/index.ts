import type { ComponentType } from 'react'
import { AppBarPlayground } from './AppBarPlayground'
import { AvatarPlayground } from './AvatarPlayground'
import { BadgePlayground } from './BadgePlayground'
import { BottomSheetPlayground } from './BottomSheetPlayground'
import { ButtonPlayground } from './ButtonPlayground'
import { SplitButtonPlayground } from './SplitButtonPlayground'
import { CardPlayground } from './CardPlayground'
import { ChipPlayground } from './ChipPlayground'
import { CheckboxPlayground } from './CheckboxPlayground'
import { ConfettiPlayground } from './ConfettiPlayground'
import { DialogPlayground } from './DialogPlayground'
import { DividerPlayground } from './DividerPlayground'
import { FABPlayground } from './FABPlayground'
import { FieldPlayground } from './FieldPlayground'
import { HoldButtonPlayground } from './HoldButtonPlayground'
import { IconPlayground } from './IconPlayground'
import { IconButtonPlayground } from './IconButtonPlayground'
import { InputPlayground } from './InputPlayground'
import { ListPlayground } from './ListPlayground'
import { MenuPlayground } from './MenuPlayground'
import { PopoverPlayground } from './PopoverPlayground'
import { ProgressPlayground } from './ProgressPlayground'
import { ToggleGroupPlayground } from './ToggleGroupPlayground'
import { RadioGroupPlayground } from './RadioGroupPlayground'
import { SelectPlayground } from './SelectPlayground'
import { SliderPlayground } from './SliderPlayground'
import { SnackbarPlayground } from './SnackbarPlayground'
import { SwitchPlayground } from './SwitchPlayground'
import { TabsPlayground } from './TabsPlayground'
import { TextareaPlayground } from './TextareaPlayground'
import { FloatingToolbarPlayground } from './FloatingToolbarPlayground'
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
    Card: CardPlayground,
    Checkbox: CheckboxPlayground,
    Chip: ChipPlayground,
    Confetti: ConfettiPlayground,
    Dialog: DialogPlayground,
    Divider: DividerPlayground,
    FAB: FABPlayground,
    Field: FieldPlayground,
    FloatingToolbar: FloatingToolbarPlayground,
    HoldButton: HoldButtonPlayground,
    Icon: IconPlayground,
    IconButton: IconButtonPlayground,
    Input: InputPlayground,
    List: ListPlayground,
    Menu: MenuPlayground,
    Popover: PopoverPlayground,
    Progress: ProgressPlayground,
    RadioGroup: RadioGroupPlayground,
    Select: SelectPlayground,
    Slider: SliderPlayground,
    Snackbar: SnackbarPlayground,
    SplitButton: SplitButtonPlayground,
    Switch: SwitchPlayground,
    Tabs: TabsPlayground,
    Textarea: TextareaPlayground,
    ToggleGroup: ToggleGroupPlayground,
    Tooltip: TooltipPlayground,
    Typography: TypographyPlayground,
    NavigationBar: NavigationBarPlayground,
    NavigationDrawer: NavigationDrawerPlayground,
    NavigationRail: NavigationRailPlayground,
}
