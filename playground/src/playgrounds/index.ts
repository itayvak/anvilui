import type { ComponentType } from 'react'
import { AccordionPlayground } from './AccordionPlayground'
import { AppBarPlayground } from './AppBarPlayground'
import { AvatarPlayground } from './AvatarPlayground'
import { BadgePlayground } from './BadgePlayground'
import { BottomSheetPlayground } from './BottomSheetPlayground'
import { ButtonPlayground } from './ButtonPlayground'
import { ButtonGroupPlayground } from './ButtonGroupPlayground'
import { CalendarPlayground } from './CalendarPlayground'
import { CardPlayground } from './CardPlayground'
import { ChipPlayground } from './ChipPlayground'
import { ComboboxPlayground } from './ComboboxPlayground'
import { ContextMenuPlayground } from './ContextMenuPlayground'
import { CheckboxPlayground } from './CheckboxPlayground'
import { DateInputPlayground } from './DateInputPlayground'
import { DialogPlayground } from './DialogPlayground'
import { DividerPlayground } from './DividerPlayground'
import { FABPlayground } from './FABPlayground'
import { FieldPlayground } from './FieldPlayground'
import { IconPlayground } from './IconPlayground'
import { IconButtonPlayground } from './IconButtonPlayground'
import { InputPlayground } from './InputPlayground'
import { ListPlayground } from './ListPlayground'
import { MenuPlayground } from './MenuPlayground'
import { MenubarPlayground } from './MenubarPlayground'
import { PinInputPlayground } from './PinInputPlayground'
import { PopoverPlayground } from './PopoverPlayground'
import { PreviewCardPlayground } from './PreviewCardPlayground'
import { ProgressPlayground } from './ProgressPlayground'
import { RadioButtonGroupPlayground } from './RadioButtonGroupPlayground'
import { RadioGroupPlayground } from './RadioGroupPlayground'
import { SearchPlayground } from './SearchPlayground'
import { SelectPlayground } from './SelectPlayground'
import { SkeletonPlayground } from './SkeletonPlayground'
import { SliderPlayground } from './SliderPlayground'
import { SnackbarPlayground } from './SnackbarPlayground'
import { SwitchPlayground } from './SwitchPlayground'
import { TablePlayground } from './TablePlayground'
import { TabsPlayground } from './TabsPlayground'
import { TextareaPlayground } from './TextareaPlayground'
import { TimePickerPlayground } from './TimePickerPlayground'
import { TogglePlayground } from './TogglePlayground'
import { ToolbarPlayground } from './ToolbarPlayground'
import { TooltipPlayground } from './TooltipPlayground'
import { TypographyPlayground } from './TypographyPlayground'
import { NavigationBarPlayground } from './NavigationBarPlayground'
import { NavigationDrawerPlayground } from './NavigationDrawerPlayground'
import { NavigationRailPlayground } from './NavigationRailPlayground'
import { NavigationListPlayground } from './NavigationListPlayground'

// One entry per AnvilUI component. The key is what shows up in the select.
export const playgrounds: Record<string, ComponentType> = {
    Accordion: AccordionPlayground,
    AppBar: AppBarPlayground,
    Avatar: AvatarPlayground,
    Badge: BadgePlayground,
    BottomSheet: BottomSheetPlayground,
    Button: ButtonPlayground,
    ButtonGroup: ButtonGroupPlayground,
    Calendar: CalendarPlayground,
    Card: CardPlayground,
    Checkbox: CheckboxPlayground,
    Chip: ChipPlayground,
    Combobox: ComboboxPlayground,
    ContextMenu: ContextMenuPlayground,
    DateInput: DateInputPlayground,
    Dialog: DialogPlayground,
    Divider: DividerPlayground,
    FAB: FABPlayground,
    Field: FieldPlayground,
    Icon: IconPlayground,
    IconButton: IconButtonPlayground,
    Input: InputPlayground,
    List: ListPlayground,
    Menu: MenuPlayground,
    Menubar: MenubarPlayground,
    PinInput: PinInputPlayground,
    Popover: PopoverPlayground,
    PreviewCard: PreviewCardPlayground,
    Progress: ProgressPlayground,
    RadioButtonGroup: RadioButtonGroupPlayground,
    RadioGroup: RadioGroupPlayground,
    Search: SearchPlayground,
    Select: SelectPlayground,
    Skeleton: SkeletonPlayground,
    Slider: SliderPlayground,
    Snackbar: SnackbarPlayground,
    Switch: SwitchPlayground,
    Table: TablePlayground,
    Tabs: TabsPlayground,
    Textarea: TextareaPlayground,
    TimePicker: TimePickerPlayground,
    Toggle: TogglePlayground,
    Toolbar: ToolbarPlayground,
    Tooltip: TooltipPlayground,
    Typography: TypographyPlayground,
    NavigationBar: NavigationBarPlayground,
    NavigationDrawer: NavigationDrawerPlayground,
    NavigationRail: NavigationRailPlayground,
    NavigationList: NavigationListPlayground,
}
