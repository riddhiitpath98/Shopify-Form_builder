import React, { useEffect, useState } from 'react'
import { useAppQuery } from '../../hooks'
import { addShopData, getAllSubscription } from '../../redux/actions/allActions';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Loading } from '@shopify/app-bridge-react';
import { Spinner } from '@shopify/polaris';
import PlanModal from '../Pricingplans/PlanModal';



const Auth = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', margin: '100px auto', height: '200px', width: '200px' }}>
            <Spinner accessibilityLabel="Spinner example" size="large" />
        </div>
    )
}

export default Auth;