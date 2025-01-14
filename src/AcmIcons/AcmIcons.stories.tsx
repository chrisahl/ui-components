/* Copyright Contributors to the Open Cluster Management project */

import { PageSection } from '@patternfly/react-core'
import { Meta } from '@storybook/react'
import React from 'react'
import { AcmDescriptionList } from '../AcmDescriptionList/AcmDescriptionList'
import { AcmIcon, AcmIconVariant } from './AcmIcons'

const meta: Meta = {
    title: 'Icons',
    component: AcmIcon,
}
export default meta

export const Icons = () => {
    const icons = Object.values(AcmIconVariant)
        .sort()
        .map((icon) => {
            return {
                key: icon,
                value: (
                    <div style={{ width: '24px', height: '24px' }}>
                        <AcmIcon key={icon} icon={icon} />
                    </div>
                ),
            }
        })
    const midpoint = Math.ceil(icons.length / 2)
    const leftItems = icons.slice(0, midpoint)
    const rightItems = icons.slice(midpoint)
    return (
        <PageSection>
            <AcmDescriptionList title="Icons" leftItems={leftItems} rightItems={rightItems} />
        </PageSection>
    )
}
