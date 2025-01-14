/* Copyright Contributors to the Open Cluster Management project */

import React, { Fragment } from 'react'
import { Flex, FlexItem, Divider } from '@patternfly/react-core'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles({
    group: {
        '& > div > a, & .pf-c-dropdown__toggle.pf-m-plain': {
            paddingLeft: 0,
            paddingRight: 0,
        },
    },
})

export function AcmActionGroup(props: { children: React.ReactNode[] }) {
    const classes = useStyles()

    return (
        <Flex className={classes.group}>
            {props.children.map((child, i) => {
                if (i + 2 > props.children.length) {
                    return <FlexItem key={i}>{child}</FlexItem>
                } else {
                    return (
                        <Fragment key={i}>
                            <FlexItem>{child}</FlexItem>
                            <Divider isVertical />
                        </Fragment>
                    )
                }
            })}
        </Flex>
    )
}
