import type { ComponentType } from 'react'
import { AnimatedNumberPlayground } from './AnimatedNumberPlayground'
import { AppBarPlayground } from './AppBarPlayground'
import { AvatarPlayground } from './AvatarPlayground'
import { BadgePlayground } from './BadgePlayground'
import { BottomSheetPlayground } from './BottomSheetPlayground'
import { ButtonPlayground } from './ButtonPlayground'
import { SplitButtonPlayground } from './SplitButtonPlayground'
import { CardPlayground } from './CardPlayground'
import { CarouselPlayground } from './CarouselPlayground'
import { ChipPlayground } from './ChipPlayground'
import { CheckboxPlayground } from './CheckboxPlayground'
import { ConfettiPlayground } from './ConfettiPlayground'
import { DialogPlayground } from './DialogPlayground'
import { DividerPlayground } from './DividerPlayground'
import { FABPlayground } from './FABPlayground'
import { FABMenuPlayground } from './FABMenuPlayground'
import { FieldPlayground } from './FieldPlayground'
import { HoldButtonPlayground } from './HoldButtonPlayground'
import { IconPlayground } from './IconPlayground'
import { IconButtonPlayground } from './IconButtonPlayground'
import { InputPlayground } from './InputPlayground'
import { KbdPlayground } from './KbdPlayground'
import { ListPlayground } from './ListPlayground'
import { MenuPlayground } from './MenuPlayground'
import { PopoverPlayground } from './PopoverPlayground'
import { ProgressPlayground } from './ProgressPlayground'
import { ToggleGroupPlayground } from './ToggleGroupPlayground'
import { RadioGroupPlayground } from './RadioGroupPlayground'
import { SelectPlayground } from './SelectPlayground'
import { SliderPlayground } from './SliderPlayground'
import { SnackbarPlayground } from './SnackbarPlayground'
import { StickerPlayground } from './StickerPlayground'
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
    AnimatedNumber: AnimatedNumberPlayground,
    AppBar: AppBarPlayground,
    Avatar: AvatarPlayground,
    Badge: BadgePlayground,
    BottomSheet: BottomSheetPlayground,
    Button: ButtonPlayground,
    Card: CardPlayground,
    Carousel: CarouselPlayground,
    Checkbox: CheckboxPlayground,
    Chip: ChipPlayground,
    Confetti: ConfettiPlayground,
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
    Popover: PopoverPlayground,
    Progress: ProgressPlayground,
    RadioGroup: RadioGroupPlayground,
    Select: SelectPlayground,
    Slider: SliderPlayground,
    Snackbar: SnackbarPlayground,
    SplitButton: SplitButtonPlayground,
    Sticker: StickerPlayground,
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
