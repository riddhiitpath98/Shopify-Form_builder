import { Spinner } from '@shopify/polaris'
import React from 'react'

const CommanSpinner = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', margin: '100px auto', height: '200px', width: '200px' }}>
            <Spinner accessibilityLabel="Spinner example" size="large" />
        </div>
    )
}

export default CommanSpinner