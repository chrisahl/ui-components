/* Copyright Contributors to the Open Cluster Management project */

import { PageSection, Toolbar, ToolbarContent, ToolbarItem } from '@patternfly/react-core'
import { Meta } from '@storybook/react'
import React, { useCallback, useContext, useEffect } from 'react'
import { AcmButton } from '../AcmButton/AcmButton'
import { AcmPage, AcmPageContent, AcmPageHeader } from '../AcmPage/AcmPage'
import { AcmAlertContext, AcmAlertGroup } from './AcmAlert'

const meta: Meta = {
    title: 'Alert Group',
    component: AcmAlertGroup,
    includeStories: ['AlertGroup'],
}
export default meta

export function AlertGroup() {
    return (
        <AcmPage header={<AcmPageHeader title="AcmAlertGroup" />}>
            <AcmPageContent id="alerts">
                <PageSection variant="light">
                    <AlertGroupStory />
                </PageSection>
            </AcmPageContent>
        </AcmPage>
    )
}

export function AlertGroupStory() {
    const alertContext = useContext(AcmAlertContext)
    const addAlert = useCallback(() => alertContext.addAlert({ title: 'Alert', message: 'Message' }), [])
    const addInfo = useCallback(
        () => alertContext.addAlert({ title: 'Info Alert', message: 'Message', type: 'info' }),
        []
    )
    const addSuccess = useCallback(
        () => alertContext.addAlert({ title: 'Success Alert', message: 'Message', type: 'success' }),
        []
    )
    const addWarning = useCallback(
        () => alertContext.addAlert({ title: 'Warning Alert', message: 'Message', type: 'warning' }),
        []
    )
    const addError = useCallback(
        () => alertContext.addAlert({ title: 'ErrorAlert', message: 'Message', type: 'danger' }),
        []
    )
    useEffect(() => {
        addAlert()
        addInfo()
        addSuccess()
        addWarning()
        addError()
    }, [])
    return (
        <Toolbar inset={{ default: 'insetNone' }} style={{ paddingTop: 0, paddingBottom: 0 }}>
            <ToolbarContent>
                <ToolbarItem>
                    <AcmButton onClick={addAlert}>Alert</AcmButton>
                </ToolbarItem>
                <ToolbarItem>
                    <AcmButton onClick={addInfo}>Info</AcmButton>
                </ToolbarItem>
                <ToolbarItem>
                    <AcmButton onClick={addSuccess}>Success</AcmButton>
                </ToolbarItem>
                <ToolbarItem>
                    <AcmButton onClick={addWarning}>Warning</AcmButton>
                </ToolbarItem>
                <ToolbarItem>
                    <AcmButton onClick={addError}>Error</AcmButton>
                </ToolbarItem>
                <ToolbarItem>
                    <AcmButton onClick={() => alertContext.clearAlerts()}>Clear</AcmButton>
                </ToolbarItem>
                <ToolbarItem>
                    <AcmButton onClick={() => alertContext.clearAlerts((a) => a.type === 'info')}>Clear Info</AcmButton>
                </ToolbarItem>
            </ToolbarContent>
        </Toolbar>
    )
}
