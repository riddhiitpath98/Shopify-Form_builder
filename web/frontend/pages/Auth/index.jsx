import React, { useEffect, useState } from 'react'
import { useAppQuery } from '../../hooks'
import { addShopData, getAllSubscription } from '../../redux/actions/allActions';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Loading } from '@shopify/app-bridge-react';
import { Spinner } from '@shopify/polaris';
import PlanModal from '../Pricingplans/PlanModal';



const Auth = () => {
    const [isActive, setIsActive] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // const shop = useAppQuery({ url: "/api/shop" });
    // console.log('shop: ', shop);
    // console.log('isActive: ', isActive);

    // useEffect(() => {
    //     if (shop.isSuccess) {
    //         setIsActive(true);
    //         dispatch(getAllSubscription())
    //     }
    // })
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', margin: '100px auto', height: '200px', width: '200px' }}>
            <Spinner accessibilityLabel="Spinner example" size="large" />
            {isActive && <PlanModal active={isActive} isSuccess={shop.isSuccess} shopData={shop.data} />}
        </div>
    )
}

export default Auth;