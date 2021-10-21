import React from 'react'
import { Alert } from 'react-bootstrap'

const ErrMessage = ({variant, children}) => {
    return (
        <Alert variant={variant}>
            {children}
        </Alert>
    )
}


export default ErrMessage
