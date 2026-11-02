import type { ComponentType } from 'react'
import { AccordionPlayground } from './AccordionPlayground'
import { AnimatedNumberPlayground } from './AnimatedNumberPlayground'
import { AppBarPlayground } from './AppBarPlayground'
import { AvatarGroupPlayground } from './AvatarGroupPlayground'
import { AvatarPlayground } from './AvatarPlayground'
import { BadgePlayground } from './BadgePlayground'
import { BottomSheetPlayground } from './BottomSheetPlayground'
import { ButtonPlayground } from './ButtonPlayground'
import { CalendarPlayground } from './CalendarPlayground'
import { CardPlayground } from './CardPlayground'
import { CarouselPlayground } from './CarouselPlayground'
import { CheckboxPlayground } from './CheckboxPlayground'
import { ChipPlayground } from './ChipPlayground'
import { ComboboxPlayground } from './ComboboxPlayground'
import { ConfettiPlayground } from './ConfettiPlayground'
import { ContextMenuPlayground } from './ContextMenuPlayground'
import { DateInputPlayground } from './DateInputPlayground'
import { DialogPlayground } from './DialogPlayground'
import { DividerPlayground } from './DividerPlayground'
import { FABMenuPlayground } from './FABMenuPlayground'
import { FABPlayground } from './FABPlayground'
import { FieldPlayground } from './FieldPlayground'
import { FloatingToolbarPlayground } from './FloatingToolbarPlayground'
import { HoldButtonPlayground } from './HoldButtonPlayground'
import { IconButtonPlayground } from './IconButtonPlayground'
import { IconPlayground } from './IconPlayground'
import { InputPlayground } from './InputPlayground'
import { KbdPlayground } from './KbdPlayground'
import { ListPlayground } from './ListPlayground'
import { MenubarPlayground } from './MenubarPlayground'
import { MenuPlayground } from './MenuPlayground'
import { NavigationBarPlayground } from './NavigationBarPlayground'
import { NavigationDrawerPlayground } from './NavigationDrawerPlayground'
import { NavigationListPlayground } from './NavigationListPlayground'
import { NavigationRailPlayground } from './NavigationRailPlayground'
import { PinInputPlayground } from './PinInputPlayground'
import { PopoverPlayground } from './PopoverPlayground'
import { PreviewCardPlayground } from './PreviewCardPlayground'
import { ProgressPlayground } from './ProgressPlayground'
import { RadioGroupPlayground } from './RadioGroupPlayground'
import { SearchPlayground } from './SearchPlayground'
import { SelectPlayground } from './SelectPlayground'
import { SkeletonPlayground } from './SkeletonPlayground'
import { SliderPlayground } from './SliderPlayground'
import { SnackbarPlayground } from './SnackbarPlayground'
import { SplitButtonPlayground } from './SplitButtonPlayground'
import { StickerPlayground } from './StickerPlayground'
import { SwitchPlayground } from './SwitchPlayground'
import { TablePlayground } from './TablePlayground'
import { TabsPlayground } from './TabsPlayground'
import { TextareaPlayground } from './TextareaPlayground'
import { ThemePlayground } from './ThemePlayground'
import { TimePickerPlayground } from './TimePickerPlayground'
import { ToggleGroupPlayground } from './ToggleGroupPlayground'
import { TogglePlayground } from './TogglePlayground'
import { TooltipPlayground } from './TooltipPlayground'
import { TypographyPlayground } from './TypographyPlayground'

export const playgrounds: Record<string, ComponentType> = {
    Accordion: AccordionPlayground,
    AnimatedNumber: AnimatedNumberPlayground,
    AppBar: AppBarPlayground,
    Avatar: AvatarPlayground,
    AvatarGroup: AvatarGroupPlayground,
    Badge: BadgePlayground,
    BottomSheet: BottomSheetPlayground,
    Button: ButtonPlayground,
    Calendar: CalendarPlayground,
    Card: CardPlayground,
    Carousel: CarouselPlayground,
    Checkbox: CheckboxPlayground,
    Chip: ChipPlayground,
    Combobox: ComboboxPlayground,
    Confetti: ConfettiPlayground,
    ContextMenu: ContextMenuPlayground,
    DateInput: DateInputPlayground,
    Dialog: DialogPlayground,
    Divider: DividerPlayground,
    FAB: FABPlayground,
    FABMenu: FABMenuPlayground,
    Field: FieldPlayground,
    FloatingToolbar: FloatingToolbarPlayground,
    HoldButton: HoldButtonPlayground,
    Icon: IconPlayground,
    IconButton: IconButtonPlayground,
    Input: InputPlayground,
    Kbd: KbdPlayground,
    List: ListPlayground,
    Menu: MenuPlayground,
    Menubar: MenubarPlayground,
    NavigationBar: NavigationBarPlayground,
    NavigationDrawer: NavigationDrawerPlayground,
    NavigationList: NavigationListPlayground,
    NavigationRail: NavigationRailPlayground,
    PinInput: PinInputPlayground,
    Popover: PopoverPlayground,
    PreviewCard: PreviewCardPlayground,
    Progress: ProgressPlayground,
    RadioGroup: RadioGroupPlayground,
    Search: SearchPlayground,
    Select: SelectPlayground,
    Skeleton: SkeletonPlayground,
    Slider: SliderPlayground,
    Snackbar: SnackbarPlayground,
    SplitButton: SplitButtonPlayground,
    Sticker: StickerPlayground,
    Switch: SwitchPlayground,
    Table: TablePlayground,
    Tabs: TabsPlayground,
    Textarea: TextareaPlayground,
    Theme: ThemePlayground,
    TimePicker: TimePickerPlayground,
    Toggle: TogglePlayground,
    ToggleGroup: ToggleGroupPlayground,
    Tooltip: TooltipPlayground,
    Typography: TypographyPlayground,
}
