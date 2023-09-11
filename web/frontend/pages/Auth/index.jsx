import React, { useEffect, useState } from 'react'
import { Button } from '@shopify/polaris';
import PlanModal from '../Pricingplans/PlanModal';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';


const Auth = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const shop = useAppQuery({ url: "/api/shop" });
    console.log('shop: ', shop);

    // const toggleModal = useCallback(() => setActive((active) => !active), []);
  
    // const activator = <Button onClick={toggleModal}>Open</Button>;
    useEffect(() => {
        if (shop.isSuccess) {
            const { id, shop_owner, phone, name, city, customer_email, email, myshopify_domain } = shop.data;
            const data = {
                id, shop_owner, phone, name, city, customer_email, email, myshopify_domain, isShowPlan: false, isPremium: false
            }
            dispatch(addShopData(data));
        }
        if (shop.isSuccess) {
            navigate("/dashboard", { replace: true })
        }
    })
    return (
        <>
        <div style={{ display: 'flex', justifyContent: 'space-between', margin: '100px auto', height: '200px', width: '200px' }}>
            <Spinner accessibilityLabel="Spinner example" size="large" />
        </div>
         {/* {active && <PlanModal {...{active,setActive,toggleModal}}/>} */}
        </>
    )
}

export default Auth;