import { createContext } from 'react'
import type { AvatarProps } from './Avatar'

// An AvatarGroup's size, so the avatars inside match it without each
// setting `size`. Its own file so Avatar and AvatarGroup can both use it.
export const AvatarGroupContext = createContext<AvatarProps['size'] | null>(
    null
)
