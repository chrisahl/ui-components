/* Copyright Contributors to the Open Cluster Management project */

import { FormGroup, Popover, TextArea, TextAreaProps } from '@patternfly/react-core'
import HelpIcon from '@patternfly/react-icons/dist/js/icons/help-icon'
import React, { Fragment, ReactNode, useLayoutEffect, useState } from 'react'
import { useValidationContext } from '../AcmForm/AcmForm'

type AcmTextAreaProps = TextAreaProps & {
    id: string
    label: string
    validation?: (value: string) => string | undefined
    labelHelp?: ReactNode
    labelHelpTitle?: ReactNode
    helperText?: string
}

export function AcmTextArea(props: AcmTextAreaProps) {
    const ValidationContext = useValidationContext()
    const [validated, setValidated] = useState<'default' | 'success' | 'error' | 'warning'>('default')
    const [error, setError] = useState<string>('')
    const { validation, labelHelp, labelHelpTitle, helperText, ...textAreaProps } = props

    useLayoutEffect(() => {
        let error: string | undefined = undefined
        /* istanbul ignore else */
        if (props.hidden !== true) {
            if (props.isRequired) {
                if (!props.value || (typeof props.value === 'string' && props.value.trim() === '')) {
                    error = 'Required'
                }
            }
            if (!error && validation) {
                error = validation(props.value as string)
            }
        }
        setError(error ?? '')
        if (ValidationContext.validate) {
            setValidated(error ? 'error' : 'default')
        }
        ValidationContext.setError(props.id, error)
    }, [props.value, props.hidden])

    useLayoutEffect(() => {
        setValidated(error ? 'error' : 'default')
    }, [ValidationContext.validate])

    return (
        <FormGroup
            id={`${props.id}-label`}
            label={props.label}
            isRequired={props.isRequired}
            fieldId={props.id}
            hidden={props.hidden}
            helperTextInvalid={error}
            validated={validated}
            helperText={helperText}
            labelIcon={
                /* istanbul ignore next */
                props.labelHelp ? (
                    <Popover headerContent={labelHelpTitle} bodyContent={labelHelp}>
                        <button
                            aria-label="More info"
                            onClick={(e) => e.preventDefault()}
                            // aria-describedby="simple-form-name"
                            className="pf-c-form__group-label-help"
                        >
                            <HelpIcon noVerticalAlign />
                        </button>
                    </Popover>
                ) : (
                    <Fragment />
                )
            }
        >
            <TextArea
                {...(textAreaProps as unknown)}
                validated={validated}
                style={{ height: '88px', minHeight: '36px' }}
                resizeOrientation={
                    /* istanbul ignore next */ props.resizeOrientation ? props.resizeOrientation : 'vertical'
                }
                disabled={ValidationContext.isReadOnly}
            />
        </FormGroup>
    )
}
