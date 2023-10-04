import React from 'react'
import { Spinner } from '@shopify/polaris';
import { useDispatch } from 'react-redux';


const Auth = () => {

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', margin: '100px auto', height: '200px', width: '200px' }}>
            <Spinner accessibilityLabel="Spinner example" size="large" />
        </div>
    )
}

export default Auth;