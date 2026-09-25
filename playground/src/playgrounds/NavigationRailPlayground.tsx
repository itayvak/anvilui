import { NavigationRail, NavigationRailItem } from 'anvilui'
import { Section } from '../ui'
import { useState } from 'react'

export function NavigationRailPlayground() {
    const [expanded, setExpanded] = useState(true)

    return (
        <div style={{position: "absolute", height: "100dvh", width: "fit-content", top: 0, left: 0, zIndex: 2}}>
            <NavigationRail
                hasExpandButton
                expanded={expanded}
                setExpanded={setExpanded}
                defaultValue={['profile']}
            >
                <NavigationRailItem
                    value="profile"
                    icon="person"
                    title="My Profile"
                />
                <NavigationRailItem
                    value="photos"
                    icon="photo"
                    title="Photos"
                />
                <NavigationRailItem
                    value="settings"
                    icon="settings"
                    title="Settings"
                />
                <NavigationRailItem
                    value="profile1"
                    icon="person"
                    title="My Profile"
                />
                <NavigationRailItem
                    value="photos1"
                    icon="photo"
                    title="Photos"
                />
                <NavigationRailItem
                    value="settings1"
                    icon="settings"
                    title="Settings Really Long"
                />
            </NavigationRail>
        </div>
    )
}
